function Cannonball(game, plane) {
  this.game = game;
  this.plane = plane;
  this.x = this.plane.x + this.plane.w /2
  this.y = this.plane.y - this.plane.h /4
  this.r = 10;
  // Constant velocity for balls
  this.ballVelocityY = 20;
}

Cannonball.prototype.draw = function () {
  // Drawing balls
  this.game.ctx.beginPath();
  // In case it comes after some other drawer function, we set its color
  this.game.ctx.fillStyle="black";
  this.game.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
  this.game.ctx.fill();
  this.game.ctx.closePath();
};

Cannonball.prototype.move = function () {
  this.y -= this.ballVelocityY
  //Gnomes are not so smart as dragons so they don't make adjustment for their velocity
};