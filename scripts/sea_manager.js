//register sounds
createjs.Sound.alternateExtensions= ["m4a"];
createjs.Sound.registerSound("sounds/chomp1.m4a", "chomp1");

var MAX_FISH = 20;

var SeaManager = function() {
  this.agents = {};
  this.addKraken();
  this.fishes = {};
  this.nextFishAdded = 0;
  this.boats = {};
  var that = this;
  _(5).times(function(n) {
    that.addFish(50 + 100 * n, 50 + 100 * n);
  });
  _(2).times(function(n) {
    that.addBoat(200 + 100 * n);
  });
};

SeaManager.prototype.getRandomUnderwaterEdgePoint = function() {
  return {x:_.sample([41, Game.getWidth() - 41]),
          y:_.random(Game.water.waterLine + 20, Game.getHeight() - 20)};
}

SeaManager.prototype.randomlyAddFish = function() {
  var time = createjs.Ticker.getTime(); 
  if (this.nextFishAdded < time && _.size(this.fishes) < MAX_FISH) {
    this.nextFishAdded = time + 
      _.sample([500, 2000, 5000]);
    var point = this.getRandomUnderwaterEdgePoint();
    this.addFish(point.x, point.y);
  }
};

SeaManager.prototype.checkCollisions = function() {
  var that = this;
  _.each(that.agents, function(agent) {
    if (that.kraken && that.kraken.getCollision(agent)) {
      if (that.kraken.eat(agent)) {
        var instance = createjs.Sound.play("chomp1");
        instance.volume = 0.5;
        that.removeAgent(agent);
      }
    }
  });
  _.each(that.fishes, function(fish) {
    _.each(that.fishes, function(otherFish) {
      if (fish.getId() < otherFish.getId() && fish.getCollision(otherFish)) {
      }
    });
  });
};

SeaManager.prototype.removeAgent = function(agent) {
  Game.currentStage.removeChild(agent.shape);
  var agentId = agent.getId();
  delete this.agents[agentId];
  if (agent instanceof SwimmyFish) {
    delete this.fishes[agentId];
  }
  if (agent instanceof Boat) {
    delete this.boats[agentId];
  }
};


SeaManager.prototype.addKraken = function() {
  this.kraken = new Kraken();
  this.agents[this.kraken.getId()] = this.kraken;
  Game.currentStage.addChild(this.kraken.shape);
};

SeaManager.prototype.addFish = function(x, y) {
  var randomFishSize = _.random(1,5);
  var fish = new SwimmyFish(x, y, randomFishSize);
  this.fishes[fish.getId()] = fish;
  this.agents[fish.getId()] = fish;
  Game.currentStage.addChild(fish.shape);
  fish.moveInBounds();
};

SeaManager.prototype.addBoat = function(x) {
  var boat = new Boat(x);
  this.boats[boat.getId()] = boat;
  this.agents[boat.getId()] = boat;
  Game.currentStage.addChild(boat.shape);
};
