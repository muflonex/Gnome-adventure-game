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
this.game.ctx.save()
 
this.game.ctx.globalAlpha = this.opacity; 
// Shadows are expensive, especially if we don't perform our animation as canvas translation
// Therefore we skip on objects that have low opacity anyway
if(this.opacity > 0.4){
  this.game.ctx.shadowColor = 'rgba(0, 0, 0  ,'+this.opacity+')';
  this.game.ctx.shadowBlur = 20;
  this.game.ctx.shadowOffsetX = 55;
  this.game.ctx.shadowOffsetY = 55; 
}
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
this.game.ctx.restore()
};

Clouds.prototype.move = function() {
   this.y += this.deltaY;

   if (this.y > this.game.canvas.height) this.y = 0;
 };

