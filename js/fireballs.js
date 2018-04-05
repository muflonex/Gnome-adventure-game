function Fireball(game, minion){
  this.game = game;
  this.minion = minion;
  this.x = this.minion.x + this.minion.w /2
  this.y = this.minion.y + this.minion.h
  this.r = 20;
  // Constant velocity for balls
  this.ballVelocityY = 10;
}

Fireball.prototype.draw = function () {
  // Drawing balls
  this.game.ctx.save()
  this.game.ctx.beginPath();
  // In case it comes after some other drawer function, we set its color
  var radialGradient = this.game.ctx.createRadialGradient(this.x,this.y,this.r-20,this.x,this.y,this.r);
  radialGradient.addColorStop(0, "yellow")
  radialGradient.addColorStop(1, "red")
  this.game.ctx.fillStyle = radialGradient;
  this.game.ctx.shadowBlur=50;
  this.game.ctx.shadowColor="red";
  this.game.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
  this.game.ctx.fill();
  this.game.ctx.closePath();
  this.game.ctx.restore()
};

Fireball.prototype.move = function () {
  this.y += this.ballVelocityY
  // They are smart dragons and they make adjustment for their movement
  this.x -= this.minion.velocity
};