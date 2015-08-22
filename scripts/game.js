var Game = {};

Game.init = function() {
  Game.currentstage = new createjs.Stage('mainCanvas');
  Game.kraken = new Kraken();
  Game.keyboard = new Keyboard();
  Game.currentstage.addChild(Game.kraken.shape);
  Game.currentstage.update();
  createjs.Ticker.addEventListener("tick", Game.tick);
  $(window).keydown(Game.onKeydown);
};

Game.tick = function(event) {
  Game.kraken.update();
  Game.currentstage.update();
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

