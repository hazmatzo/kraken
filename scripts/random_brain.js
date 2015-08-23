var RandomBrain = function (agent) {
  this.agent = agent;
  this.possibleDecisions = [50, 120, 150, 200];
  this.horizLikelihood = 1.0;
  this.vertLikelihood = 0.2;
  this.nextDecision = 0;
};

RandomBrain.prototype.update = function(event) {
  var ticks = createjs.Ticker.getTicks();
  if (this.nextDecision < ticks) {
    this.nextDecision = ticks +
      _.sample(this.possibleDecisions);
    this.makeDecision();
  }
};

RandomBrain.prototype.makeDecision = function() {
  this.agent.velX = 0.0;
  this.agent.velY = 0.0;
  if (this.horizLikelihood >= Math.random()) {
    this.agent.velX = this.agent.speed * _.sample([1, -1]);
  }
  if (this.vertLikelihood >= Math.random()) {
    this.agent.velY = this.agent.speed * _.random(-1,1);
  }
  if (this.agent.velX <= 0) {
    this.agent.shape.scaleX = -1 * Math.abs(this.agent.shape.scaleX);
  }
  else {
    this.agent.shape.scaleX = Math.abs(this.agent.shape.scaleX);
  }
};
