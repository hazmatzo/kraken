var RandomBrain = function (agent, vertLikelihood, horizLikelihood) {
  this.agent = agent;
  this.possibleDecisions = [1000, 2000, 2500, 3000, 5000, 8000];
  this.horizLikelihood = horizLikelihood || 1.0;
  this.vertLikelihood = (vertLikelihood == 0) ? vertLikelihood : (vertLikelihood || 0.2);
  this.nextDecision = 0;
  this.vertSpeed = .5;
  this.debounce = 100;
  this.nextBounce = 0;
};

RandomBrain.prototype.update = function(event) {
  var time = createjs.Ticker.getTime();
  if (this.nextDecision < time) {
    this.nextDecision = time +
      _.sample(this.possibleDecisions) + _.random(-300, 300);
    this.makeDecision();
  }
};

RandomBrain.prototype.makeDecision = function() {
  var time = createjs.Ticker.getTime();
  if (this.nextBounce < time) {
    this.nextBounce = time + this.debounce;
    this.agent.velX = 0.0;
    this.agent.velY = 0.0;
    if (this.horizLikelihood >= Math.random()) {
      this.agent.velX = this.agent.speed * _.sample([1, -1]);
    }
    if (this.vertLikelihood >= Math.random()) {
      this.agent.velY = this.agent.speed * _.random(-1,1) * this.vertSpeed;
    }
    if (this.agent.velX <= 0) {
      this.agent.shape.scaleX = -1 * Math.abs(this.agent.shape.scaleX);
    }
    else {
      this.agent.shape.scaleX = Math.abs(this.agent.shape.scaleX);
    }
  }
};
