function Background (game) {
  this.x = 0;
  this.y = 0;
  this.game = game;
  // A constant that moves the background 
  this.deltaY = 3;

  this.img = new Image();
  this.img.src = "./images/sea5.jpg";
}

Background.prototype.draw = function() {
  // Drawing 2 images (image object, its position XY, its width, its height)
  // One atop of another so that they can go alternating
this.game.ctx.drawImage(this.img, this.x,this.y, this.game.canvas.width, this.game.canvas.height)
this.game.ctx.drawImage(this.img, this.x,this.y - this.game.canvas.height, this.game.canvas.width, this.game.canvas.height);
};

Background.prototype.move = function() {
  // We're altering the position of background  by constant
   this.y += this.deltaY;
  // When our first image's initial point reaches bottom (maxY) 
  // we reset position for both by assigning / resetting initial point value
   if (this.y > this.game.canvas.height) 
    { this.y = 0; }
 };