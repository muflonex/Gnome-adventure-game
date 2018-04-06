function LifePack(game, minion) {
  this.game = game;
  this.minion = minion;
  this.w = 70;
  this.h = 70;
  this.x = this.minion.x + this.minion.w /2
  this.y = this.minion.y + this.minion.h
  this.velocity = 10;
  this.sprite = new Image();
  this.sprite.src = "./images/spinning_heart.png";
  this.sprite.frames = 5;
  this.sprite.frameIndex = 1;
}
//void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
LifePack.prototype.draw = function () {
  this.game.ctx.drawImage(
    this.sprite, // Image
    this.sprite.frameIndex * Math.floor(this.sprite.width / this.sprite.frames), // source x 
    0, // source y: always 0 for this image
    Math.floor(this.sprite.width / this.sprite.frames), // frame width 
    this.sprite.height, // frame heigth
    this.x, // destination x
    this.y, // destination y
    this.w, // destination frame width 
    this.h); // destination frame heigth
    
};

LifePack.prototype.animate = function () {
  if ( this.game.framesCounter % 5 === 0 ) {
    this.sprite.frameIndex += 1;
    // Here a small trick from Susana - 
    // we don't have to call move in game for that specific object
    // We can piggyback on animation
    this.y += this.velocity
    if (this.sprite.frameIndex > 4) {
      this.sprite.frameIndex = 0;
    }
  }
};