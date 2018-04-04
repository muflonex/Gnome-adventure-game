function Game(canvas){
  this.canvas = document.getElementById(canvas);
  this.ctx = this.canvas.getContext("2d");
  this.background = new Background(this);
  this.plane = new Plane(this);
  this.clouds = [ new Clouds(this), new Clouds(this), new Clouds(this) ];
  this.framesCounter = 0;
  this.minions = []
}

Game.prototype.start = function() {

  //if (this.started) {
    //return;
  //}
  this.plane.setListeners();
  this.interval = setInterval(function() {
    this.framesCounter++;
    if (this.framesCounter > 1000) this.framesCounter = 0;

    this.clear();
    this.eliminateClouds();
    this.generateClouds();
    this.plane.eliminateBalls();
    this.spawn(7);
    this.despawn();
    this.move();
    this.draw();

  }.bind(this), 1000 / 60);
  
  //this.started = true;
};

//Game.prototype.stop = function() {
//  clearInterval(this.interval);
 // this.started = false;
//};

Game.prototype.draw = function() {
  this.background.draw();
  this.clouds.forEach(function(nimbus) { nimbus.draw(); })
  this.plane.draw();
  this.minions.forEach(function(minion){ minion.draw(7); })
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.move = function() {
  this.background.move();
  this.clouds.forEach(function(o) { o.move(); })
  this.plane.cannonballs.forEach(function(ball) { ball.move() })
  this.plane.move();
  if(this.framesCounter >= 70 && this.minions[0].x > 190 ){
    this.minions.forEach(function(minion){ minion.move() })
  }
};

Game.prototype.generateClouds = function(){
  if (this.framesCounter % 40 === 0) {
    var randomFrame = Math.floor(Math.random()*3)
    var randomOpacity = Math.random()*0.5+0.2
    this.clouds.push(new Clouds(this, randomFrame, randomOpacity ))
  }
}
Game.prototype.eliminateClouds = function(){
  this.clouds = this.clouds.filter(function(o) {
    return o.y < 650;
  })
}
Game.prototype.spawn = function(amount){
  if (this.framesCounter % 70 === 0) {
    if( this.minions.length === 0){
      for(i = 0 ; i < amount ; i++){
        this.minions.push(new Minion(this))
      }
    }
  }
}

Game.prototype.despawn = function(){
  this.minions = this.minions.filter(function(minion) {
    return minion.x > 0;
  })
}

Game.prototype.isCollision = function() {
  var collision = false;
  this.minions.forEach(function(minion){
    if ( ( 
      ( this.plane.x + this.plane.w ) > ( minion.x - minion.r ) ) &&
      ( this.plane.x < ( minion.x + minion.r ) )  &&
      ( this.plane.y + this.plane.h ) >= ( minion.y - minion.r ) &&
      ( this.plane.y < ( minion.y - minion.r ) )
    )
      { collision = true; }
  }.bind(this));
  return collision;
};
