function Minion(game, x){
  this.game = game;
  //starting position, depending on object's index in the array of minions
  this.x = 1200 + x;
  this.h = 150;
  this.w = 150;
  this.y = 60;
  this.velocity = 0;
  this.frameIndex = Math.floor(Math.random()*5)+1
  
  this.health = 3;

  this.img = new Image();
  this.img.src = "./images/dragonling.png";
  this.img.frames = 5;

  this.fireballs = []
  
}
Minion.prototype.animate = function () {
  if ( this.game.framesCounter % 15 === 0 ) {
    this.frameIndex += 1;
    if (this.frameIndex > 2) {
      this.frameIndex = 0;
    }
  }
};
Minion.prototype.draw = function (amount){
  for(i = 0; i <= amount; i++){
    this.game.ctx.drawImage(
      this.img,
      0,
      this.frameIndex * (this.img.height / this.img.frames),
      this.img.width,
      this.img.height / this.img.frames ,
      this.x,
      this.y,
      this.w,
      this.h
    )
  } 
  if (this.game.framesCounter % 70 === 0){
    this.shoot();
  }
}

Minion.prototype.move = function () {
  // When the last minion's right edge leaves the screen we reset their position
  var leftEdge = this.game.minions[this.game.minions.length-1].x
  var rightEdge = this.game.minions[this.game.minions.length-1].w
  
  this.velocity = 5;

  this.x -= this.velocity
  if(leftEdge+rightEdge<0)
  { this.game.minions.forEach(function(minion, index){
    minion.x = 1200+200*index
  }) }    
};

Minion.prototype.shoot = function(){
  this.fireballs.push(new Fireball(this.game, this))
}

// Check for collisions between balls and monsters
Minion.prototype.collider = function(){  
  var ballz = this.game.plane.cannonballs
  var meanies = this.game.minions

  ballz.forEach(function(ball){
    if(       
      // Same as with the plane case we reduce collision box
      // to make dragons harder to hit                                                        
       ball.x < this.w + this.x -25 &&
       this.x < ball.x + ball.r -25 &&
       ball.y < this.h + this.y -25 &&                    
       this.y < ball.y + ball.r -25
      )     
      { this.health -=1
        this.game.points += 10   
        // remove ball after it hits a target
        ballz.splice(ballz.indexOf(ball),1)
        // despawn dragons if they run out of health
        this.despawn();
      }
  }.bind(this));
}
// The function that will be used to free memory from killed minions
Minion.prototype.despawn = function(){
    var meanies = this.game.minions;
  if(this.health === 0){
    meanies.splice(meanies.indexOf(this), 1)
    this.game.points += 100
  }
}