var Agent = function () {
  this.x = 0;
  this.y = 0;
  this.velX = 0;
  this.velY = 0;
  this.speed = 1.0;
  this.scale = 1.0;
  this.visible = true;
  this.disappearance = { nextReappearance: 0 };
};

Agent.prototype.preUpdate = function(event) {
};

Agent.prototype.postUpdate = function(event) {
};

Agent.prototype.getId = function () {
  return this.shape.id;
};

Agent.prototype.update = function(event) {
  this.preUpdate(event);

  this.updateMovement(event);
  this.updateVisibility(event);

  this.postUpdate(event);
};

Agent.prototype.updateMovement = function(event) {
  var newX = this.x + Game.timeToDist(this.velX, event.delta);
  var newY = this.y + Game.timeToDist(this.velY, event.delta);
  if (!this.willBeOutOfBounds(newX, newY)) {
    this.x = newX; 
    this.y = newY; 
    this.shape.x = this.x;
    this.shape.y = this.y;
    this.shape.scaleX = this.scale;
    this.shape.scaleY = this.scale;
  }
};

Agent.prototype.willBeOutOfBounds = function(newX, newY) {
  var currentBounds = this.shape.getTransformedBounds();
  var newLeft = newX - (currentBounds.width / 2);
  var newUp = newY - (currentBounds.height / 2);
  var newRight = newX + (currentBounds.width / 2);
  var newDown = newY + (currentBounds.height / 2);
  return newLeft < 0 || newUp < 0 || newRight > Game.getWidth() || newDown > Game.getHeight();
};

Agent.updateVisibility(event) {
  if (!this.visible && this.disappearance &&
      this.disappearance.nextReappearance < currentjs.Ticker.getTime()) {
    this.visible = true;
  }
  this.shape.visible = this.visible;
};

Agent.prototype.disappearForNSeconds(n) {
  this.visible = false;
  if (!this.disappearance) {
    this.disappearance = {};
  }
  this.disappearance.nextAppearance = createjs.Ticker.getTime() +
      Math.max(n,0) * 1000;
};

Agent.prototype.getCollision(agent) {
  if (agent.getId() == this.getId()) {
    return false;
  }
  return ndmgr.checkPixelCollision(this.shape, agent.shape);
}
