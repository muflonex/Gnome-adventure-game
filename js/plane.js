//Keys that are currently active according to Listener
var keys = []

function Plane (game) {
  this.game = game;
  this.x = this.game.canvas.width/2;
  this.y0 = (this.game.canvas.height-150);
  this.y = this.y0;
  this.w = 80;
  this.h = 120;
  this.velocityX = 0;
  this.velocityY = 0;
  this.maxVelocity = 12;
  this.inertia = .97;
  this.img = new Image();
  this.img.src = "./images/balloon.png";
  this.cannonballs = [];
}

Plane.prototype.draw = function(){
  this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
  if (this.game.framesCounter % 60 === 0){
    this.shoot();
  }
  this.cannonballs.forEach(function(ball){
    ball.draw()
  })
}

Plane.prototype.setListeners = function () {
  document.onkeydown = function (event) {
    keys[event.keyCode] = true;
  }.bind(this)
  document.onkeyup = function (event) {
    keys[event.keyCode] = false;
  }.bind(this)
}

Plane.prototype.move = function(){

  // We use IF here even though it looks like a good place for a switch 
  // because it's easier to cover conjunctions of two keys 
  
  if(keys[37]){
    if( this.velocityX > -this.maxVelocity)
    { this.velocityX-- }
  }
  if(keys[39]){
    if( this.velocityX < this.maxVelocity)
    { this.velocityX++ }
  }
  if(keys[38]){
    if( this.velocityY > -this.maxVelocity)
    { this.velocityY-- }
  }
  if(keys[40]){
    if( this.velocityY < this.maxVelocity)
    { this.velocityY++ }
  }
  //applying inertia effect
  //changing position according to velocity
  this.velocityY *= this.inertia;
  this.y += this.velocityY
  this.velocityX *= this.inertia;
  this.x += this.velocityX

  //Checking for canvas borders
  if( this.x <= 0 ){
    this.x = 0
  }
  if( this.x >= this.game.canvas.width - this.w ){
    this.x = this.game.canvas.width - this.w
  }
  if( this.y <= 0 ){
    this.y = 0
  }
  if( this.y >= this.game.canvas.height - this.h ){
    this.y = this.game.canvas.height - this.h
  }
}
Plane.prototype.shoot = function(){
  this.cannonballs.push(new Cannonball(this.game, this))
}
//We clear all balls that left canvas out of the cannonballs array
Plane.prototype.eliminateBalls = function(){
  this.cannonballs.filter(function(ball){
    return ball.y > 0
  })
}