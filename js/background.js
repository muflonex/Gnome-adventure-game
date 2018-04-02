function Background (game) {
  this.x = 0;
  this.y = 0;
  this.game = game;
  this.deltaY = 3;

  this.img = new Image();
  this.img.src = "./images/sea.jpg";
}

Background.prototype.draw = function() {
this.game.ctx.drawImage(this.img, this.x,this.y, this.game.canvas.width, this.game.canvas.height)
this.game.ctx.drawImage(this.img, this.x,this.y - this.game.canvas.height, this.game.canvas.width, this.game.canvas.height);
};

Background.prototype.move = function() {
   this.y += this.deltaY;

   if (this.y > this.game.canvas.height) this.y = 0;
 };