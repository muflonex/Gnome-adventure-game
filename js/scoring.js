function Scoring(game){
  this.game = game;
  this.x = 0;
  this.y = 0;
  this.h = 40;
  this.w = this.game.canvas.width;
  this.hearts = new Image();
  this.hearts.src = "./images/heart.png";
} 

Scoring.prototype.draw = function(score){
  var context = this.game.ctx;
  var rowCounter = 0;
  // var pattern=this.game.ctx.createPattern(this.img,"repeat");
  // context.fillStyle=pattern;
  // context.fillRect(this.x,this.y,this.w,this.h)

  context.fillStyle = 'white';
  context.font = 'small-caps bold 30pt Love Ya Like A Sister';
  context.fillText("Score: "+this.game.points,60,50)
    { context.fillText("Life: ",300,50) }
  context.fillText("Wave: "+(this.game.waveSize-3),700,50)
  for(i = 0; i < this.game.plane.health; i++){
    if(i <6)
    { context.drawImage(this.hearts, 380+50*i,20, 50, 40) }
    else if(i => 7 && i < 14){
      context.drawImage(this.hearts, 380+50*(i-6),70, 50, 40)
    }
  }
}