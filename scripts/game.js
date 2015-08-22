var Game = {};

Game.init = function() {
  Game.currentstage = new createjs.Stage('mainCanvas');
  Game.kraken = new Kraken();
  Game.currentstage.addChild(Game.kraken.shape);
  Game.currentstage.update();
  createjs.Ticker.addEventListener("tick", Game.tick);
  $("#mainCanvas").keydown();
};

Game.tick = function(event) {
  Game.kraken.update();
  Game.currentstage.update();
}


