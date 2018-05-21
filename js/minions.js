function Minion(game, x){
  this.game = game;
  //starting position, depending on object's index in the array of minions
  this.x = 1200 + x;
  this.h = 150;
  this.w = 150;
  this.y = 60;
  this.velocity = 5;
  this.frameIndex = Math.floor(Math.random()*5)+1
  
  this.health = 3;
  this.receivedDamage = false;
  this.img = new Image();
  this.img.src = "./images/dragonling_damage.png";
  this.img.frames = 6;
}
Minion.prototype.animate = function () {
  //Managing movement frames for dragons
  if ( this.game.framesCounter % 15 === 0 ) {
    //Every 15 ticks we change frame
    this.frameIndex += 1;
    //We use special frame for damage
    if(this.receivedDamage === true){
      this.frameIndex = 5
      //Clear special state after 60 ticks
      if(this.game.framesCounter %60 === 0)
        this.receivedDamage = false
      }
    //Rewind frames
    }else if(this.receivedDamage ===false){
      if (this.frameIndex > 3) {
      this.frameIndex = 0;
    }
  }
}

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
  var randomTime = 75+Math.floor(Math.random()*75)
  if (this.game.framesCounter % randomTime === 0){
    this.shoot();
  }
  this.game.fireballs.forEach(function(ball){
    ball.draw()
  })
}

Minion.prototype.move = function () {
  // When the last minion's right edge leaves the screen we reset their position
  var leftEdge = this.game.minions[this.game.minions.length-1].x
  var rightEdge = this.game.minions[this.game.minions.length-1].w

  this.x -= this.velocity
  if(leftEdge+rightEdge<0)
  { this.game.minions.forEach(function(minion, index){
    minion.x = 1200+200*index
  }) }    
};

Minion.prototype.shoot = function(){
  this.game.fireballs.push(new Fireball(this.game, this))
}
Minion.prototype.dropPack = function(){
  this.game.packs.push(new LifePack(this.game, this))
}
// Check for collisions between balls and monsters
Minion.prototype.collider = function(){  
  var ballz = this.game.plane.cannonballs

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
        this.receivedDamage = true;
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
    this.dropPack();
    meanies.splice(meanies.indexOf(this), 1)
    this.game.points += 100
  }
}