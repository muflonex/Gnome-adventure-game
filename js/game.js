function Game(canvas){
  this.canvas = document.getElementById(canvas);
  this.ctx = this.canvas.getContext("2d");
  this.background = new Background(this);
}

Game.prototype.start = function() {

  //if (this.started) {
    //return;
  //}

  this.interval = setInterval(function() {
    this.clear();
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
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.move = function() {

   this.background.move();
 };