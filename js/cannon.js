function Cannonball(game, plane) {
  this.game = game;
  this.plane = plane;
  this.x = this.plane.x + this.plane.w /2
  this.y = this.plane.y - this.plane.h /4
  this.r = 10;
  this.ballVelocityY = 20;
  this.inertia = 0.93
}

Cannonball.prototype.draw = function () {
  this.game.ctx.beginPath();
  this.game.ctx.fillStyle="black";
  this.game.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
  this.game.ctx.fill();
  this.game.ctx.closePath();
};

Cannonball.prototype.move = function () {
  this.y -= this.ballVelocityY
};