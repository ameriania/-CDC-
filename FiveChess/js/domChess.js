/*定义DOMChess子类，即封装了使用dom实现的五子棋方法*/

//创建DomChess类并让其继承Chess类
var DomChess=function(){};
DomChess.prototype = new Chess();


//下面重写父类方法

/*画棋盘格14*14=196格*/
DomChess.prototype.drawChessBoard=function () {
	var fragment=document.createDocumentFragment();
	for (var i = 0; i < 196; i++) {
		var div=document.createElement('div');
		div.className="chessboard";
		fragment.appendChild(div);
	}
	this.chess.appendChild(fragment);
}


/*在某个位置画一颗棋子
@para i 横向第i个格子线
@para j 纵向第j个格子线
*/
DomChess.prototype.drawChess=function(i,j){

	chess_piece=document.createElement("div");
	if (currentChess) {
		chess_piece.className="black_piece";
	}else{
		chess_piece.className="white_piece";
	}
	
	this.chess.appendChild(chess_piece);
	chess_piece.style.left=15+i*30+"px";
	chess_piece.style.top=15+j*30+"px";
	
}

//新建一个dom方法的五子棋实例
var domChess=new DomChess();
domChess.init('chess');