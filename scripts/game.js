var Game = function () {};

Game.init = function() {
  Game.currentstage = new createjs.Stage('mainCanvas');
  Game.kraken = new Kraken();
  Game.keyboard = new Keyboard();
  Game.currentstage.addChild(Game.kraken.shape);
  Game.currentstage.update();
  Game.speed = 20.0; // pixels per second
  createjs.Ticker.addEventListener("tick", Game.tick);
  $(window).keydown(Game.onKeydown);
  $(window).keyup(Game.onKeyup);
};

Game.tick = function(event) {
  Game.kraken.update(event);
  Game.currentstage.update();
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
