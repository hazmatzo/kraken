//register sounds
createjs.Sound.alternateExtensions= ["m4a"];
createjs.Sound.registerSound("sounds/chomp1.m4a", "chomp1");

var MAX_FISH = 20;
var MAX_BOATS = 4;
var MAX_FISH_SIZE = 10;

var SeaManager = function() {
  this.agents = {};
  this.addKraken();
  this.fishes = {};
  this.nextFishAdded = 0;
  this.boats = {};
  this.nextBoatAdded = 0;
  var that = this;
  _(6).times(function(n) {
    var edgePoint = that.getRandomUnderwaterEdgePoint();
    that.addFish(edgePoint.x, edgePoint.y);
  });
  _(2).times(function(n) {
    that.addBoat(200 + 100 * n);
  });
  _(5).times(function(n) {
    that.addSeaweed();
  });
};

SeaManager.prototype.getRandomUnderwaterEdgePoint = function() {
  return {x:_.sample([41, Game.getWidth() - 41]),
          y:_.random(Game.water.waterLine + 20, Game.getHeight() - 20)};
};

SeaManager.prototype.randomlyAddFish = function() {
  var time = createjs.Ticker.getTime(); 
  if (this.nextFishAdded < time && _.size(this.fishes) < MAX_FISH) {
    this.nextFishAdded = time + 
      _.sample([500, 2000, 5000]);
    var point = this.getRandomUnderwaterEdgePoint();
    this.addFish(point.x, point.y);
  }
};

SeaManager.prototype.randomlyAddBoats = function() {
  var time = createjs.Ticker.getTime();
  if (this.nextBoatAdded < time && _.size(this.boats) < MAX_BOATS) {
    this.nextBoatAdded = time + 
      _.sample([2000, 5000, 10000, 20000]);
    var x_value = (Game.getWidth() - 100) ;
    this.addBoat(x_value);
  }
};

SeaManager.prototype.checkCollisions = function() {
  var that = this;
  var toRemove = [];
  _.each(that.agents, function(agent) {
    if (that.kraken && that.kraken.getCollision(agent)) {
      if (that.kraken.eat(agent)) {
        var instance = createjs.Sound.play("chomp1");
        instance.volume = 0.5;
        that.removeAgent(agent);
        toRemove.push(agent);
      }
    }
  });
  _.each(that.fishes, function(fish) {
    _.each(that.fishes, function(otherFish) {
      if (fish.getId() < otherFish.getId() && fish.getCollision(otherFish)) {
      }
    });
  });
  _.each(toRemove, function(agent) {
    that.removeAgent(agent);
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
  this.kraken = new Kraken(Game.getWidth()/2, Game.getHeight()/2);
  this.agents[this.kraken.getId()] = this.kraken;
  Game.currentStage.addChild(this.kraken.shape);
};

SeaManager.prototype.addFish = function(x, y) {
  var that = this;
  var edibleFish = _.reduce(this.fishes, function(memo, fish) {
    return memo + (fish.size <= that.kraken.size * .8 ? 1 : 0);
  }, 0);
  var randomFishSize = Math.floor(this.kraken.size);
  // Try to keep the average size of fish around the size of the kraken.
  if (edibleFish >= _.size(this.fishes) / 2) {
    var lowSize = Math.min(Math.ceil(this.kraken.size * 1.1), MAX_FISH_SIZE);
    var highSize = Math.ceil(Math.min(3 * this.kraken.size, MAX_FISH_SIZE));
    randomFishSize = _.random(lowSize, highSize);
  } else {
    // Make sure smaller fish are not too small.
    var lowSize = Math.floor(Math.max(1, (this.kraken.size / 4)));
    // Make sure smaller fish are edible!
    var highSize = Math.max(Math.floor(this.kraken.size * .8), lowSize);
    randomFishSize = _.random(lowSize, highSize);
  }
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

SeaManager.prototype.checkLoseCondition = function() {
  return this.kraken.size <= this.kraken.minSize;
}

SeaManager.prototype.checkWinCondition = function() {
  return this.kraken.size >= this.kraken.maxSize;
}

SeaManager.prototype.addSeaweed = function() {
  var seaweed = new Seaweed();
  this.agents[seaweed.getId()] = seaweed;
  console.log(seaweed);
  Game.currentStage.addChild(seaweed.shape);
};
