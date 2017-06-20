/*定义CanvasChess子类，即封装了使用canvas实现的五子棋方法*/

//创建CanvasChess类并让其继承Chess类
var CanvasChess=function(){};
CanvasChess.prototype = new Chess();


//下面重写父类方法

/*画棋盘格14*14格*/
CanvasChess.prototype.drawChessBoard=function(){
	var context=this.chess.getContext('2d');
	context.strokeStyle="#BFBFBF";
	for (var i = 0; i < 15; i++) {
		context.moveTo(15+i*30,15);
		context.lineTo(15+i*30,435);
		context.moveTo(15,15+i*30);
		context.lineTo(435,15+i*30);
		context.stroke();
	}	
};

/*在某个位置画一颗棋子
@para i 横向第i个格子线
@para j 纵向第j个格子线
*/
CanvasChess.prototype.drawChess=function(i,j){
	var context=this.chess.getContext('2d');
	context.beginPath();
	context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
	context.closePath();
	var gradient=context.createRadialGradient(15+i*30,15+j*30,13,15+i*30,15+j*30,0);
	if (currentChess) {
		gradient.addColorStop(0,"#0A0A0A");
		gradient.addColorStop(1,"#636766");
	}else{
		gradient.addColorStop(0,"#D1D1D1");
		gradient.addColorStop(1,"#F9F9F9");
	}
	
	context.fillStyle=gradient;
	context.fill();
}

//新建一个dom方法的五子棋实例
var canvasChess=new CanvasChess();
canvasChess.init('chess');