function Minion(game){
  this.game = game;
  this.x = 1200;
  this.r = 20;
  this.y = this.r*2;
  this.velocity = 0;

  //this.img = new Image();
  //this.img.src = "./images/minions.jpg";
  
}
//this.game.ctx.fillRect(70, 0, 100, 30);

Minion.prototype.dragonlings = function(amount){
  for(i = 0; i < amount; i++){
    this.game.ctx.beginPath();
    this.game.ctx.fillStyle="#FF0000";
    this.game.ctx.arc((this.x - this.r - 20)*(i+1), this.y, this.r, 0, Math.PI * 2);
    this.game.ctx.fill();
    this.game.ctx.closePath();
  } 
}
Minion.prototype.draw = function (amount){
  this.dragonlings(amount);
}

Minion.prototype.move = function () {
    this.velocity = 5;
    this.x -= this.velocity
};