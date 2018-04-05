function Fireball(game, minion){
  this.game = game;
  this.minion = minion;
  this.x = this.minion.x + this.minion.w /2
  this.y = this.minion.y + this.minion.h /4
  this.r = 10;
  // Constant velocity for balls
  this.ballVelocityY = 20;
}

Fireball.prototype.draw = function () {
  // Drawing balls
  this.game.ctx.beginPath();
  // In case it comes after some other drawer function, we set its color
  this.game.ctx.fillStyle="red";
  this.game.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
  this.game.ctx.fill();
  this.game.ctx.closePath();
};

Fireball.prototype.move = function () {
  this.y += this.ballVelocityY
};