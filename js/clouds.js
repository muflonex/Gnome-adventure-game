function Clouds (game, frame, opacity) {
  this.game = game;
  this.x = Math.floor(Math.random()*1200);
  this.w = Math.floor(Math.random()*450)+650;
  this.h = Math.floor(Math.random()*200)+350;
  this.y = -this.h;
  this.deltaY = (Math.random()*3)+1;
  this.img = new Image();
  this.img.src = "./images/cloud2.png";
  this.img.frames = 3;
  this.frameIndex = frame;
  this.opacity = opacity
}

Clouds.prototype.draw = function() {
// setting canvas opacity  
this.game.ctx.globalAlpha = this.opacity;  
// drawing image (img object, Xframe pos, Yframe pos, width, height, Xpos, Ypos, width, height)
this.game.ctx.drawImage(
  this.img,
  this.frameIndex*this.img.width / this.img.frames,
  0,
  this.img.width / this.img.frames,
  this.img.height,
  this.x,
  this.y,
  this.w / this.img.frames,
  this.h);
  // restoring opacity to canvas
  this.game.ctx.globalAlpha = 1.0;
};

Clouds.prototype.move = function() {
   this.y += this.deltaY;

   if (this.y > this.game.canvas.height) this.y = 0;
 };

