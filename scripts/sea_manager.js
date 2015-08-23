var MAX_FISH = 20;

var SeaManager = function() {
  this.agents = [];
  this.addKraken();
  this.fishes = [];
  this.nextFishAdded = 0;
  this.boats = [];
  var that = this;
  _(5).times(function(n) {
    that.addFish(50 + 50 * n, 50 + 50 * n);
  });
  _(2).times(function(n) {
    that.addBoat(50 + 100 * n)
  });
};

SeaManager.prototype.randomlyAddFish = function() {
  var time = createjs.Ticker.getTime(); 
  if (this.nextFishAdded < time && this.fishes.length < MAX_FISH) {
    this.nextFishAdded = time + 
      _.sample([500, 2000, 5000]);
    this.addFish(100, 100);
  }
};

SeaManager.prototype.addKraken = function() {
  this.kraken = new Kraken();
  this.agents.push(this.kraken);
  Game.currentStage.addChild(this.kraken.shape);
};

SeaManager.prototype.addFish = function(x, y) {
  var fish = new SwimmyFish(x, y);
  this.fishes.push(fish);
  this.agents.push(fish);
  Game.currentStage.addChild(fish.shape);
};

SeaManager.prototype.addBoat = function(x) {
  var boat = new Boat(x);
  this.boats.push(boat);
  this.agents.push(boat);
  Game.currentStage.addChild(boat.shape);
};