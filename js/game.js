function Game(canvas){
  this.canvas = document.getElementById(canvas);
  this.ctx = this.canvas.getContext("2d");
  this.background = new Background(this);
  this.plane = new Plane(this);
  this.clouds = [ new Clouds(this), new Clouds(this), new Clouds(this) ];
  this.framesCounter = 0;
  this.waveSize = 3;
  this.minions = []
  //Serves as stop flag for frame request
  this.pause = false;
}

Game.prototype.start = function() {
  //we initiate key listeners for the airship movement
  this.plane.setListeners();
  // We count frames for events that occur with
  // different frequency than our interval
  this.framesCounter++;

  // We reset counter to facilitate event repetition
  if (this.framesCounter > 1000) this.framesCounter = 0;
  
  this.clear();
  this.eliminateClouds();
  this.generateClouds();
  this.plane.eliminateBalls();
  this.spawn(this.waveSize);
  this.move();
  this.draw();
  this.minions.forEach(function(minion){ minion.animate()})
  // We check for collisions
  this.collider();
  // It's simpler way of stopping frame request without encapsulating it
  if (this.pause) return
  // fun part - using requestAnimationFrame instead of
  // setInterval for resources savings and less GPU throtling
  requestAnimationFrame(this.start.bind(this));
};

Game.prototype.draw = function() {
  // Canvas painter functions invocation in Z order from bottom to top
  this.background.draw();
  this.clouds.forEach(function(nimbus) { nimbus.draw(); })
  this.plane.draw();
  this.minions.forEach(function(minion){ minion.draw(this.waveSize) }.bind(this))
};

Game.prototype.clear = function() {
  // Frame clearing
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.move = function() {
  // Call for movement resolution functions
  this.background.move();
  this.clouds.forEach(function(o) { o.move(); })
  this.plane.cannonballs.forEach(function(ball) { ball.move() })
  this.plane.move();
  this.minions.forEach(function(minion){ minion.move() })
  
};

Game.prototype.generateClouds = function(){
  // Generate a cloud every 40 ticks 
  if (this.framesCounter % 40 === 0) {
    // An argument for frame of the sprite to generate look
    var randomFrame = Math.floor(Math.random()*3)
    // An argument for random cloud opacity
    var randomOpacity = Math.random()*0.5+0.2
    this.clouds.push(new Clouds(this, randomFrame, randomOpacity ))
  }
}
// When our clouds leave canvas, we remove them from a memory slot taken by the array
Game.prototype.eliminateClouds = function(){
  this.clouds = this.clouds.filter(function(o) {
    return o.y < 650;
  })
}
// Evil meanies spawning mechanism
Game.prototype.spawn = function(amount){
  // We perform a check every 70 ticks
  if (this.framesCounter % 70 === 0) {
    // If there are no minions left on board
    if( this.minions.length === 0){
      // Push new minions into the array
      for(i = 0 ; i <= amount ; i++){
        // Amplify size of the wave
        // Position argument we pass to constructor so that 
        // each minion has unique X position for a particular meanie
        var position = i*this.canvas.width/this.waveSize
        this.minions.push(new Minion( this , position ))
      }
      this.waveSize++
    }
  }
}


// Colission checking function - will call respective functions later on
Game.prototype.collider = function() {
  this.plane.collider();
  this.minions.forEach(function(minion){ minion.collider()})
  
};
