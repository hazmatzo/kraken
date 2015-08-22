var Game = function () {};

Game.init = function() {
  Game.currentStage = new createjs.Stage('mainCanvas');
  Game.kraken = new Kraken();
  Game.keyboard = new Keyboard();
  Game.resize();
  Game.currentStage.addChild(Game.kraken.shape);
  Game.currentStage.update();
  createjs.Ticker.addEventListener("tick", Game.tick);
  $(window).keydown(Game.onKeydown);
};

Game.tick = function(event) {
  Game.kraken.update(event);
  Game.currentStage.update();
};

Game.onKeydown = function(event) {
  switch(event.which) {
  	case Game.keyboard.LEFT:
  		Game.kraken.moveLeft();
  		break;
    case Game.keyboard.RIGHT:
  		Game.kraken.moveRight();
  		break;
  	case Game.keyboard.UP:
  		Game.kraken.moveUp();
  		break;
    case Game.keyboard.DOWN:
  		Game.kraken.moveDown();
  		break;
  }
};

/**
 * When the window is resized, resize the canvas.
 */
Game.resize = function() {
	Game.currentStage.canvas.width = window.innerWidth;
	Game.currentStage.canvas.height = window.innerHeight;
};

window.addEventListener('resize', Game.resize, false);
