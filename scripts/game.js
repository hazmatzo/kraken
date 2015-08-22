var Game = function () {};

Game.init = function() {
  Game.currentStage = new createjs.Stage('mainCanvas');
  Game.kraken = new Kraken();
  Game.keyboard = new Keyboard();
  Game.currentstage.addChild(Game.kraken.shape);
  Game.currentstage.update();
  Game.speed = 20.0; // pixels per second
  Game.resize();
  createjs.Ticker.addEventListener("tick", Game.tick);
  $(window).keydown(Game.onKeydown);
  $(window).keyup(Game.onKeyup);
  $(window).resize(Game.resize);
};

Game.tick = function(event) {
  Game.kraken.update(event);
  Game.currentStage.update();
};

Game.timeToDist = function(vel, ms){
  return vel * ms * Game.speed * 0.001;
};

Game.onKeydown = function(event) {
  var preventDefault = true;
  switch(event.which) {
    case Game.keyboard.LEFT:
      Game.kraken.startLeft();
      break;
    case Game.keyboard.RIGHT:
      Game.kraken.startRight();
      break;
    case Game.keyboard.UP:
      Game.kraken.startUp();
      break;
    case Game.keyboard.DOWN:
      Game.kraken.startDown();
      break;
    default:
      preventDefault = false;
  }
  if (preventDefault) {
    event.preventDefault();
  }
};

Game.onKeyup = function(event) {
  var preventDefault = true;
  switch(event.which) {
    case Game.keyboard.LEFT:
      Game.kraken.stopLeft();
      break;
    case Game.keyboard.RIGHT:
      Game.kraken.stopRight();
      break;
    case Game.keyboard.UP:
      Game.kraken.stopUp();
      break;
    case Game.keyboard.DOWN:
      Game.kraken.stopDown();
      break;
    default:
      preventDefault = false;
  }
  if (preventDefault) {
    event.preventDefault();
  }
};
/**
 * When the window is resized, resize the canvas.
 */
Game.resize = function() {
	Game.currentStage.canvas.width = window.innerWidth;
	Game.currentStage.canvas.height = window.innerHeight;
};

