var AgentManager = function() {
  this.agents = [];
  this.addKraken();
  this.fishes = [];
  var that = this;
  _(5).times(function(n) {
    that.addFish(50 + 50 * n, 50, 50 * n);
  });
};

AgentManager.prototype.addKraken = function() {
  this.kraken = new Kraken();
  this.agents.push(this.kraken);
  Game.currentStage.addChild(this.kraken.shape);
};

AgentManager.prototype.addFish = function(x, y) {
  var fish = new SwimmyFish(x, y);
  this.fishes.push(fish);
  this.agents.push(fish);
  Game.currentStage.addChild(fish.shape);
};
