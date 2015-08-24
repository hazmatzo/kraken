var Agent = function () {
  this.x = 0;
  this.y = 0;
  this.velX = 0;
  this.velY = 0;
  this.speed = 1.0;
  this.scale = 1.0;
  this.startSize = 1.0;
  this.shrinkFactor = .75;
  this.scaleFactorX = 1.0;
  this.size = 1.0;
  this.visible = true;
  this.maxGrowthFactor = 1.25;
  this.maxSize = 40.0;
  this.minSize = 1.0;
  this.debounces = {shrink: 0, appear: 0};
};

Agent.prototype.preUpdate = function(event) {
};

Agent.prototype.postUpdate = function(event) {
};

Agent.prototype.getDebounceValues = function() {
  return {
    shrink: 2000,
    appear: 500
  };
};

Agent.prototype.getBounds = function() {
  return {left: 0, right: Game.getWidth(),
      top: Game.water.waterLine, bottom: Game.getHeight()};
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

Agent.prototype.onOutOfBounds = function(newX, newY) {

};

Agent.prototype.updateMovement = function(event) {
  var newX = this.x + Game.timeToDist(this.velX, event.delta);
  var newY = this.y + Game.timeToDist(this.velY, event.delta);

  // Set new x and y anyway.
  if (this.willBeOutOfBounds(newX, newY)) {
    this.onOutOfBounds(newX, newY);
  } else {
    this.x = newX;
    this.y = newY;
  }
  this.updateShape();
};

Agent.prototype.updateShape = function() {
  this.shape.x = this.x;
  this.shape.y = this.y;
};

Agent.prototype.moveInBounds = function() {
  var point = this.closestPointInBounds(this.x, this.y);
  this.x = point.x;
  this.y = point.y;
};

Agent.prototype.closestPointInBounds = function(x, y) {
  var bounds = this.getBounds();
  var currentBounds = this.shape.getTransformedBounds();
  var halfWidth = currentBounds.width / 2;
  var halfHeight = currentBounds.height / 2;
  return { x:Math.min(Math.max(x, bounds.left + halfWidth), bounds.right - halfWidth),
           y:Math.min(Math.max(y, bounds.top + halfHeight), bounds.bottom - halfHeight) };
};

Agent.prototype.willBeOutOfBounds = function(newX, newY) {
  var currentBounds = this.shape.getTransformedBounds();
  var halfWidth = currentBounds.width / 2;
  var halfHeight = currentBounds.height / 2;
  var newLeft = newX - halfWidth;
  var newUp = newY - halfHeight;
  var newRight = newX + halfWidth;
  var newDown = newY + halfHeight;
  var bounds = this.getBounds();
  return newLeft < bounds.left || newRight > bounds.right ||
      newUp < bounds.top || newDown > bounds.bottom;
};

Agent.prototype.debounce = function(debounceName, length) {
  var debounceValue = this.debounces[debounceName] || 0;
  if (debounceValue < createjs.Ticker.getTime()) {
    var nextLength = length || 0;
    if (!nextLength) {
      nextLength = this.getDebounceValues()[debounceName] || 0;
    }
    this.debounces[debounceName] = createjs.Ticker.getTime() + nextLength;
    return true;
  }
  return false;
};

Agent.prototype.updateVisibility = function(event) {
  if (!this.visible && this.debounce('appear')) {
    this.visible = true;
  }
  this.shape.visible = this.visible;
};

Agent.prototype.setRelativeSize = function(sizeFactor) {
  this.resize(sizeFactor * this.size); 
};

Agent.prototype.setAgentSize = function(size) {
  this.scaleFactorX = this.shape.scaleX;
  this.scaleFactorY = this.shape.scaleY;
  this.startSize = size;
  this.size = size;
  this.scale = 1.0;
};

Agent.prototype.eat = function(agent) {
  if (agent.size <= this.size / 2) {
    this.grow(agent.size);
    return true;
  } else if (agent.size > this.size) {
    if (this.debounce("shrink")) {
      this.shrink();
    }
  }
  return false;
};

Agent.prototype.shrink = function() {
  var newSize = this.size * this.shrinkFactor;
  if (newSize < this.minSize) {
    newSize = this.minSize;
  }
  this.resize(newSize);
};

Agent.prototype.grow = function(foodSize) {
  var newSize = Math.min(this.maxGrowthFactor * this.size,
      this.size + (foodSize / 2));
  if (newSize >= this.maxSize) {
    newSize = this.maxSize;
  }
  this.resize(newSize);
};

Agent.prototype.resize = function(newSize) {
  if (newSize != this.size) {
    this.size = newSize;
    var sizeIncrease = newSize / this.startSize;
    this.scale = Math.sqrt(sizeIncrease);
    this.shape.scaleX = this.scale * this.scaleFactorX;
    this.shape.scaleY = this.scale * this.scaleFactorY;
  }
};

Agent.prototype.disappearForNSeconds = function(n) {
  this.visible = false;
  this.debounce("appear", n * 1000);
};

Agent.prototype.getCollision = function(agent) {
  if (agent.getId() == this.getId()) {
    return false;
  }
  var collides = false;
  try {
    collides = ndmgr.checkPixelCollision(this.shape, agent.shape);
  }
  finally {
    return collides;
  }
};
