/*定义一个抽象父类，实现一些公共方法以及封装子类中所有方法的执行顺序*/

var Chess=function(){};

Chess.prototype.drawChessBoard = function() {};//空方法应该由子类重写
Chess.prototype.drawChess = function() {};//空方法应该由子类重写

Chess.prototype.addEvent=function(){//公共方法,即添加点击事件
	var that=this;
	//获得棋盘到其包含元素的左边和右边距离
	var chessLeft=this.chess.offsetLeft;
	var chessTop=this.chess.offsetTop;
	this.chess.onclick=function(e){
		if (isOver()) {
			window.alert("本轮游戏已经结束了，请刷新浏览器重新开始！");
			return;
		}
		//获取点击的位置相当于棋盘左上角的位置
		var x=e.clientX-chessLeft;
		var y=e.clientY-chessTop;
		var i=Math.floor(x/30);
		var j=Math.floor(y/30);

		if(isEmpty(i,j)){//当鼠标点击处没有棋子时，画棋子并更新结果
			that.drawChess(i,j);
			updateResult(i,j);
		}		
	}
};


/*初始化
@para id 棋盘对应的dom元素id
*/
Chess.prototype.init=function(id){
	this.chess=document.getElementById(id);
	this.drawChessBoard();
	this.addEvent();
}
