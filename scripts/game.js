var Game = {};

Game.init = function() {
  var stage = new createjs.Stage('mainCanvas');
  var kraken = new Kraken();
  stage.addChild(kraken.shape);
  stage.update();
  var test_array = [1,2,3];
  console.log(_.map(test_array, function (x) { return x*2; }));
};

