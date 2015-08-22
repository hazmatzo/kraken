var Game = function () {};

Game.init = function() {
  Game.currentstage = new createjs.Stage('mainCanvas');
  Game.kraken = new Kraken();
  Game.keyboard = new Keyboard();
  Game.currentstage.addChild(Game.kraken.shape);
  Game.currentstage.update();
  Game.speed = 1.0; // pixels per second
  createjs.Ticker.addEventListener("tick", Game.tick);
  $(window).keydown(Game.onKeydown);
};

Game.tick = function(event) {
  Game.kraken.update(event);
  Game.currentstage.update();
};

Game.timeToDist(vel, ms) {
  return vel * ms * Game.speed * 0.001;
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

