function Clouds (game) {
  this.game = game;
  this.x = Math.floor(Math.random()*1200);
  this.w = Math.floor(Math.random()*50)+350;
  this.h = Math.floor(Math.random()*100)+550;
  this.y = -this.h
  this.deltaY = Math.floor(Math.random()*3)+1;

  this.img = new Image();
  this.img.src = "./images/clouds.gif";
  
}

Clouds.prototype.draw = function() {
this.game.ctx.drawImage(this.img, this.x,this.y, this.w, this.h);
};

Clouds.prototype.move = function() {
   this.y += this.deltaY;

   if (this.y > this.game.canvas.height) this.y = 0;
 };

