//Keys that are currently active according to Listener
var keys = []

function Plane (game) {
  this.game = game;
  // put the airship in the middle of canvas' width
  this.x = this.game.canvas.width/2;
  //
  this.y = (this.game.canvas.height-150);
  this.w = 80;
  this.h = 120;
  this.velocityX = 0;
  this.velocityY = 0;
  this.maxVelocity = 12;
  //Rate per frame at which lingering effect of velocity dissipates
  this.inertia = .97;
  this.img = new Image();
  this.img.src = "./images/balloon.svg";
  this.cannonballs = [];
  this.health = 3;
}

Plane.prototype.draw = function(){
  this.game.ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
  // Shoot every 60 clicks. No point making our player keep pressing, 
  // unless we apply cannon refresh method 
  if (this.game.framesCounter % 60 === 0){
    this.shoot();
  }
  this.cannonballs.forEach(function(ball){
    ball.draw()
  })
}

Plane.prototype.setListeners = function () {
  // The movement event will fire as long as
  // as the button remains pressed
  // It means that effects of two buttons can apply
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
  //Applying inertia effect
  //Changing position according to velocity
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

// Check for plane collisions
Plane.prototype.collider = function(){
  var planeCollision = false;
  this.game.minions.forEach(function(minion){
    // We reduce collision box of the minion because
    // it's a sprite that has larger frames than it's visible size
    if (                                                                       
       minion.x + minion.w - 50 > this.x &&
       minion.x -50 < this.x             &&
       minion.y + minion.h -50 > this.y  &&                    
       minion.y -50 < this.y      
    )
      { this.game.clear()
        this.game.pause = true;
        this.game.gameOverScreen()
      }
  }.bind(this));
}