var SmartBrain = function (agent, vertLikelihood, horizLikelihood, distance) {
  this.vertSpeed = .5;
  this.agent = agent;
  this.otherBrain = new RandomBrain(agent, vertLikelihood, horizLikelihood);
  this.debounce = 200;
  this.nextBounce = 0;
  this.acting = false;
  this.distance = distance || 100;
};

SmartBrain.prototype.update = function(event) {
  var kraken = Game.seaManager.kraken;
  var krakenDist = this.agent.distanceFrom(kraken);
  var wasActing = this.acting;
  this.acting = false;
  if (krakenDist.distance <= this.distance) {
    if (this.agent.size > kraken.size) {
      this.chase(krakenDist);
    } else if (this.agent.size <= .8 * kraken.size) {
      this.runAway(krakenDist);
    }
  }
  if (!this.acting) {
    this.otherBrain.update(event);
  }
  if (wasActing && !this.acting) {
    this.makeDecision();
  }
}

SmartBrain.prototype.chase = function(krakenDist, flip) {
  this.acting = true;
  var time = createjs.Ticker.getTime();
  if (this.nextDecision >= time) {
    return;
  }
  this.nextDecision = time + this.debounce;
  var flipDir = flip ? -1 : 1;
  if (krakenDist.x > -20 && krakenDist.x < 20) {
    this.agent.velX = 0;
  } else if (krakenDist.x < 0) {
    this.agent.velX = -this.agent.speed * flipDir;
  } else {
    this.agent.velX = this.agent.speed * flipDir;
  }
  if (krakenDist.y > -10 && krakenDist.y < 10) {
    this.agent.velY = 0;
  } else if (krakenDist.y < 0) {
    this.agent.velY = -this.agent.speed * this.vertSpeed * flipDir;
  } else {
    this.agent.velY = this.agent.speed * this.vertSpeed * flipDir;
  }
  if (this.agent.velX <= 0) {
    this.agent.shape.scaleX = -1 * Math.abs(this.agent.shape.scaleX);
  }
  else {
    this.agent.shape.scaleX = Math.abs(this.agent.shape.scaleX);
  }
}

SmartBrain.prototype.runAway = function(krakenDist) {
  this.chase(krakenDist, true);
}

SmartBrain.prototype.makeDecision = function(event) {
  this.otherBrain.makeDecision();
}
