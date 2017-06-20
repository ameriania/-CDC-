/*DOM实现五子棋
@Author：黄俊豪
@应聘：前端开发
@经验：实习经验：1.5年；
@过往公司：广州唯品会
@电话：131-4584-2547
*/

//模拟JQ的写法，提高获取元素效率
var $ = document.querySelectorAll.bind(document);

//本人偏向于把所有变量放入config中，减少全局变量数量
var config = {
	chessBoard: [],//二维数组用来保存棋盘信息，0为没有走过的，1为黑棋，2为白棋
	currentChess: true,//目前正要下的棋子的颜色，初始化为true表示黑子棋子。false表示白色棋子
	over: false,//标志游戏是否结束，有一方赢了就表示结束
	num: 0,//已下棋子数目，设置在全局，为了悔棋功能而设;单数为黑子，偶数为白子
	count: 0,//赢棋个数统计，5
	chessX: [],//储存已下步数的横坐标，用于悔棋与撤销
	chessY: [],//储存已下步数的纵坐标，用于悔棋与撤销
	wins: [],//赢法数组，用来记录所有可能的赢法方案，
	blackWin: [],//赢法的统计数组，分别统计黑棋和白棋在上面所有赢法方案中已经完成了几颗棋子了
	whiteWin: []
}


//初始化棋盘信息，将二维数组所有项全部初始化为0
for (var i = 0; i < 15; i++) {
	config.chessBoard[i] = [];
	for (var j = 0; j < 15; j++) {
		config.chessBoard[i][j] = 0;
	}
}

//初始化枚举赢法的数组，为一个三维数组
for (var i = 0; i < 15; i++) {
	config.wins[i] = [];
	for (var j = 0; j < 15; j++) {
		config.wins[i][j] = [];
	}
}

//枚举所有可能的五个棋子竖直排列的情况
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			config.wins[i][j + k][config.count] = true;
		}
		config.count++;
	}
}

//枚举所有可能的五个棋子水平排列的情况
for (var i = 0; i < 15; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			config.wins[j + k][i][config.count] = true;
		}
		config.count++;
	}
}


//枚举所有可能的五个棋子反斜线排列的情况
for (var i = 0; i < 11; i++) {
	for (var j = 0; j < 11; j++) {
		for (var k = 0; k < 5; k++) {
			config.wins[i + k][j + k][config.count] = true;
		}
		config.count++;
	}
}

//枚举所有可能的五个棋子正斜线排列的情况
for (var i = 0; i < 11; i++) {
	for (var j = 14; j > 3; j--) {
		for (var k = 0; k < 5; k++) {
			config.wins[i + k][j - k][config.count] = true;
		}
		config.count++;
	}
}


//分别初始化黑白两棋子在某种赢法的情况下已经有的棋子为0
for (var i = 0; i < config.count; i++) {
	config.blackWin[i] = 0;
	config.whiteWin[i] = 0;
}


var chess = $('#chess')[0],//获取棋盘在dom中的元素
	chessLeft = chess.offsetLeft,
	chessTop = chess.offsetTop;//获得棋盘到其包含元素的左边和右边距离


//画棋盘格14*14=196格,由于有196个dom结构，使用fragment暂存，循环后一次性加入，提高性能
var drawChessBoard = function () {
	var fragment = document.createDocumentFragment();
	for (var i = 0; i < 196; i++) {
		var div = document.createElement('div');
		div.className = 'chessboard';
		fragment.appendChild(div);
	}
	chess.appendChild(fragment);
}


/*在某个位置画一颗棋子
@para i 横向第i个格子线
@para j 纵向第j个格子线
*/
var drawChess = function (i, j) {

	config.num++;//已下棋子数加1

	chess_piece = document.createElement('div');
	if (config.currentChess) {//设置黑棋对应的css类
		chess_piece.className = 'black_piece';//通过类直接加样式，不用过css
		chess_piece.id = 'chess' + config.num;//给每一个棋子设置唯一的id，便于悔棋和撤销悔棋操作
	} else {//设置白棋对应的CSS类
		chess_piece.className = 'white_piece';
		chess_piece.id = 'chess' + config.num;
	}

	chess.appendChild(chess_piece);
	//设置绝对定位的偏移量
	chess_piece.style.left = 15 + i * 30 + "px";
	chess_piece.style.top = 15 + j * 30 + "px";
}

/*
设置鼠标点击处理事件
*/
chess.onclick = function (e) {
	if (config.over) {
		alert("本轮游戏已经结束了，请刷新浏览器重新开始！");
		return;
	}

	//获取点击的位置相当于棋盘左上角的位置
	var x = e.clientX - chessLeft;
	var y = e.clientY - chessTop;

	var i = Math.floor(x / 30);
	var j = Math.floor(y / 30);


	if (config.chessBoard[i][j] === 0) {//在画棋子之前先判断一下棋盘上该位置是否已经有了棋子，为空时才允许放置
		drawChess(i, j);//画棋子
		if (config.currentChess) {//如果放下的棋子为黑棋
			config.chessX.push(i);//存入棋子的横纵坐标
			config.chessY.push(j);
			config.chessBoard[i][j] = 1;
			for (var k = 0; k < config.count; k++) {//遍历所有赢法
				if (config.wins[i][j][k]) {
					config.blackWin[k]++;
					config.whiteWin[k] = undefined;
					if (config.blackWin[k] === 5) {//如果黑棋在第k中赢法中已经有了5颗棋子，说明黑棋赢了
						alert('黑棋赢了！\r\n 应聘者：黄俊豪，职位：前端开发，电话：131-4584-2547');
						config.over = true;
					}
				}
			}
		} else {//如果放下的棋子为白棋
			config.chessX.push(i);//存入棋子的横纵坐标
			config.chessY.push(j);
			config.chessBoard[i][j] = 2;
			for (var k = 0; k < config.count; k++) {
				if (config.wins[i][j][k]) {
					config.whiteWin[k]++;
					config.blackWin[k] = undefined;
					if (config.whiteWin[k] === 5) {//如果白棋在第k中赢法中已经有了5颗棋子,说明白棋赢了
						alert('白棋赢了！\r\n 应聘者：黄俊豪，职位：前端开发，电话：131-4584-2547');
						config.over = true;
					}
				}
			}
		}
		config.currentChess = !config.currentChess;//将下一步棋的颜色进行反转		
	}

}


//悔棋事件
var revert = function () {
	if (config.num != 0) {
		var oldChess = $('#chess' + config.num)[0];//取得最近一步的棋子
		oldChess.parentNode.removeChild(oldChess);//把最近一步棋子的dom结构给干掉

		i = config.chessX[config.num - 1];//取得最近一步棋子的横纵坐标，不用pop，因为还有撤销功能
		j = config.chessY[config.num - 1];
		config.chessBoard[i][j] = 0;
		if (!config.currentChess) {//把胜利统计减掉
			for (var k = 0; k < config.count; k++) {
				if (config.wins[i][j][k]) {
					config.blackWin[k]--;
				}
			}
		} else {
			for (var k = 0; k < config.count; k++) {
				if (config.wins[i][j][k]) {
					config.whiteWin[k]--;
				}
			}
		}
		config.currentChess = !config.currentChess;

		config.num--;//已下棋子数要减1
	} else {
		alert('悔无可悔！\r\n 应聘者：黄俊豪，职位：前端开发，电话：131-4584-2547');
	}
}

//撤销悔棋事件
var removeRevert = function () {
	if (config.chessX[config.num] != undefined) {
		i = config.chessX[config.num];//撤销到之前那一步，不要num++，因为drawChess里面有num++这个函数，自动加1
		j = config.chessY[config.num];
		if (config.currentChess) {
			if (config.chessBoard[i][j] == 0) {
				drawChess(i, j);
				config.chessBoard[i][j] = 1;//黑子
				for (var k = 0; k < config.count; k++) {
					if (config.wins[i][j][k]) {
						config.blackWin[k]++;
					}
				}

			}
		} else {
			if (config.chessBoard[i][j] == 0) {
				drawChess(i, j);
				config.chessBoard[i][j] = 2;//白子
				for (var k = 0; k < config.count; k++) {
					if (config.wins[i][j][k]) {
						config.whiteWin[k]++;
					}
				}
			}
		}
		config.currentChess = !config.currentChess;
	}
}


//初始化棋盘
drawChessBoard();

