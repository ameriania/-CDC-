var chessBoard=[];//二维数组用来保存棋盘信息，0为没有走过的，1为黑棋，2为白棋
var currentChess=true;//目前正要下的棋子的颜色，初始化为true表示黑子棋子。false表示白色棋子
var over=false;//标志游戏是否结束，有一方赢了就表示结束

var count=0;//统计所有可能赢法的数量

//赢法数组，用来记录所有可能的赢法方案，
var wins=[];

//赢法的统计数组，分别统计黑棋和白棋在上面所有赢法方案中已经完成了几颗棋子了
var blackWin=[],whiteWin=[];


//初始化参数
(function(){
	//初始化棋盘信息，将二维数组所有项全部初始化为0
	for (var i = 0; i < 15; i++) {
		chessBoard[i]=[];
		for (var j = 0; j < 15; j++) {
			chessBoard[i][j]=0;
		}
	}

	//初始化枚举赢法的数组，为一个三维数组
	for (var i = 0; i < 15; i++) {
		wins[i]=[];
		for (var j = 0; j < 15; j++) {
			wins[i][j]=[];	
		}
	}

	//枚举所有可能的五个棋子竖直排列的情况
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 11; j++) {
			for (var k = 0; k < 5; k++) {
				wins[i][j+k][count]=true;
			}
			count++;
		}
	}

	//枚举所有可能的五个棋子水平排列的情况
	for (var i = 0; i < 15; i++) {
		for (var j = 0; j < 11; j++) {
			for (var k = 0; k < 5; k++) {
				wins[j+k][i][count]=true;
			}
			count++;
		}
	}


	//枚举所有可能的五个棋子反斜线排列的情况
	for (var i = 0; i < 11; i++) {
		for (var j = 0; j < 11; j++) {
			for (var k = 0; k < 5; k++) {
				wins[i+k][j+k][count]=true;
			}
			count++;
		}
	}

	//枚举所有可能的五个棋子正斜线排列的情况
	for (var i = 0; i < 11; i++) {
		for (var j = 14; j >3; j--) {
			for (var k = 0; k < 5; k++) {
				wins[i+k][j-k][count]=true;
			}
			count++;
		}
	}


	//分别初始化黑白两棋子在某种赢法的情况下已经有的棋子为0
	for (var i = 0; i < count; i++) {
		blackWin[i]=0;
		whiteWin[i]=0;
	}

})();

/*判断棋盘某处是否为空
@para i 横向第i个格子线
@para j 纵向第j个格子线
*/
var isEmpty=function (i,j) {
	return chessBoard[i][j]===0;
};


/*判断游戏是否结束*/
var isOver=function(){
	return over;
}

/*下完一步棋后更新结果*/
var updateResult=function(i,j){
	
	if (currentChess) {//如果放下的棋子为黑棋
		chessBoard[i][j]=1;
		for (var k = 0; k <count; k++) {//遍历所有赢法
			if (wins[i][j][k]) {
				blackWin[k]++;
				whiteWin[k]=undefined;	
				if (blackWin[k]===5) {//如果黑棋在第k中赢法中已经有了5颗棋子，说明黑棋赢了
					window.alert("黑棋赢了，真是走了狗屎运！");
					over=true;
				}	
			}
		}
	}else{//如果放下的棋子为白棋
		chessBoard[i][j]=2;
		for (var k = 0; k <count; k++) {
			if (wins[i][j][k]) {
				whiteWin[k]++;
				blackWin[k]=undefined;	
				if (whiteWin[k]===5) {//如果白棋在第k中赢法中已经有了5颗棋子,说明白棋赢了
					window.alert("白棋赢了，真是走了狗屎运！");
					over=true;
				}	
			}
		}
	}
	currentChess=!currentChess;//将下一步棋的颜色进行反转	
}