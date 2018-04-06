function Game(canvas){
  this.canvas = document.getElementById(canvas);
  this.ctx = this.canvas.getContext("2d");
  this.background = new Background(this);
  this.plane = new Plane(this);
  this.clouds = [ new Clouds(this), new Clouds(this), new Clouds(this) ];
  this.minions = [];
  this.packs = [];
  this.fireballs = [];
  this.framesCounter = 0;
  this.waveSize = 3;
  this.splashActive = false;
  this.points = 0;
  this.scoring = new Scoring(this, this.points);
  //Serves as stop flag for frame request
  this.pause = true;
  this.boxBackcg = new Image();
  this.boxBackcg.src = './images/parchment.jpg'
}

Game.prototype.start = function() {
  this.pause = false;
  //we initiate key listeners for the airship movement
  this.plane.setListeners();
  // We count frames for events that occur with
  // different frequency than our interval
  this.framesCounter++;

  // We reset counter to facilitate event repetition
  if (this.framesCounter > 1000){ this.framesCounter = 0;}
  
  this.clear();
  this.eliminateClouds();
  this.eliminatePacks();
  this.eliminateBalls();
  this.eliminateFire();
  this.generateClouds();
  this.spawn(this.waveSize);
  this.move();
  this.draw();
  this.minions.forEach(function(minion){ minion.animate()})
  this.packs.forEach(function(pack){ pack.animate()})
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
  this.scoring.draw()
  this.packs.forEach(function(pack){
    pack.draw()
  })
  this.waveSplash()
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
  this.fireballs.forEach(function(ball){
      ball.move()
    })
  this.plane.move();
  this.minions.forEach(function(minion){ minion.move() })
  
};

Game.prototype.generateClouds = function(){
  // Generate a cloud every 40 ticks 
  if (this.framesCounter % 80 === 0) {
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
Game.prototype.eliminatePacks = function(){
  this.packs = this.packs.filter(function(pack) {
    return pack.y < 650;
  })
}
//We clear all balls that left canvas out of the cannonballs and fireballs array
Game.prototype.eliminateBalls = function(){
  for(i = 0; i<this.plane.cannonballs.length; i++){
    if(this.plane.cannonballs[i].y < 0){
      this.plane.cannonballs.splice(this.plane.cannonballs.indexOf(this.plane.cannonballs[i],1))
    }  
  }
}
Game.prototype.eliminateFire = function(){
  for(i = 0; i<this.fireballs.length; i++){
    if(this.fireballs[i].y > 700){
      this.fireballs.splice(this.fireballs.indexOf(this.fireballs[i],1))
    }  
  }
}
// Evil meanies spawning mechanism
Game.prototype.spawn = function(amount){
  // We perform a check every 70 ticks
  if (this.framesCounter % 70 === 0) {
    // If there are no minions left on board
    if( this.minions.length === 0){
      this.splashActive = true
      // Push new minions into the array
      for(i = 0 ; i < amount ; i++){
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
Game.prototype.waveSplash = function(){
  if (this.splashActive){
    this.ctx.font = 'small-caps bold 100pt Love Ya Like A Sister'
    this.ctx.fillStyle = "#ff3333"
    this.ctx.fillText("Wave "+(this.waveSize-3), this.canvas.width/3, this.canvas.height/2)
  }
  if(this.framesCounter % 200 === 0){
    this.splashActive = false
  }
}

// Colission checking function - will call respective functions later on
Game.prototype.collider = function() {
  this.plane.collider();
  this.minions.forEach(function(minion){ minion.collider()})
  
};
Game.prototype.restoreListener = function () {
//  A button for restoring the game
document.onkeydown = function (event) {
  if (event.keyCode === 32){
    location.reload()
    }
  }.bind(this)
}
Game.prototype.startListener = function() {
  document.onkeydown = function (event) {
    if (event.keyCode === 32){
      this.start()
    }
  }.bind(this)
}
Game.prototype.gameOverScreen = function(){
  var width = this.canvas.width
  var height = this.canvas.height
  var ctx = this.ctx
  var pattern=this.ctx.createPattern(this.boxBackcg,"repeat");
  ctx.save()
  ctx.fillStyle=pattern;
  ctx.shadowColor = 'black';
  ctx.shadowBlur = 100;
  ctx.fillRect(width/8,height/8,900, 500)
  ctx.restore();
  ctx.strokeStyle = '#ffffb3'
  ctx.lineWidth=10;
  ctx.strokeRect(width/8,height/8,900, 500)
  ctx.fillStyle = '#60401f';
  ctx.font = 'small-caps bold 70pt Love Ya Like A Sister';
  ctx.fillText("The gnome airship was destroyed!",width/4, height/3.5, width/2,300)
  ctx.font = 'small-caps bold 30pt Love Ya Like A Sister'
  ctx.fillText("Your final score: " + this.points, width/3.5+100, height/3.5+100, 400,300)
  ctx.fillStyle = '#60401f';
  ctx.fillRect(width/4, height/2, width/2, height/7)
  ctx.lineWidth=2;
  ctx.strokeStyle = "black"
  ctx.strokeRect(width/4, height/2, width/2, height/7);
  ctx.fillStyle = '#ffffb3'
  ctx.save()
  ctx.shadowColor = 'black';
  ctx.shadowBlur = 10;
  ctx.fillText("Press space to continue", width/4 + 150, height/2+height/12)
  ctx.restore();
  this.restoreListener()
}

Game.prototype.startScreen = function(){
  var width = this.canvas.width
  var height = this.canvas.height
  var ctx = this.ctx
 
  ctx.fillRect(width/8,height/8,900, 500);
  ctx.strokeStyle = '#ffffb3';
  ctx.lineWidth=10;
  ctx.strokeRect(width/8,height/8,900, 500)
  ctx.fillStyle = '#60401f';
  ctx.font = 'small-caps bold 70pt Love Ya Like A Sister';
  ctx.fillText("Gnome adventure of Dragons!",width/4, height/3.5, width/2,300)
  ctx.fillStyle = '#60401f';
  ctx.fillRect(width/4, height/2, width/2, height/7)
  ctx.lineWidth=2;
  ctx.strokeStyle = "black"
  ctx.strokeRect(width/4, height/2, width/2, height/7);
  ctx.fillStyle = '#ffffb3'
  ctx.save()
  ctx.shadowColor = 'black';
  ctx.shadowBlur = 10;
  ctx.font = 'small-caps bold 30pt Love Ya Like A Sister';
  ctx.fillText("Press space to start", width/4 + 150, height/2+height/12)
  ctx.restore();
  this.startListener() 
}