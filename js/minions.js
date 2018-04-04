function Minion(game, x){
  this.game = game;
  //starting position, depending on object's index in the array of minions
  this.x = 1200 + x;
  this.h = 200;
  this.w = 200;
  this.y = 20;
  this.velocity = 0;
  this.frameIndex = Math.floor(Math.random()*5)+1
  
  this.health = 3;

  this.img = new Image();
  this.img.src = "./images/dragonling.png";
  this.img.frames = 5;
  
}

Minion.prototype.dragonlings = function(amount, frame){
  for(i = 0; i < amount; i++){
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
  this.dragonlings(amount);
}

Minion.prototype.move = function () {
    this.velocity = 5;
    this.x -= this.velocity
    this.velocity = 0;
};

Minion.prototype.collider = function(){  
  var ballz = this.game.plane.cannonballs
  var meanies = this.game.minions

  ballz.forEach(function(ball){
    if(                                                               
       ball.x < this.w + this.x  &&
       ball.x + ball.r > this.x  &&
       ball.y < this.h + this.y  &&                    
       ball.y + ball.r > this.y 
      )     
      { this.health -=1   
        ballz.splice(ballz.indexOf(ball),1)
        if(this.health === 0){
          meanies.splice(meanies.indexOf(this), 1)
        }
      }
  }.bind(this));
}