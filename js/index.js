window.onload = function() {
  var game = new Game("my-canvas");

  window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(f){return setTimeout(f, 1000/60)}
  window.cancelAnimationFrame = window.cancelAnimationFrame
    || window.mozCancelAnimationFrame
    || function(requestID){clearTimeout(requestID)}
  
  game.startScreen();
}