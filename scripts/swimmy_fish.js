var SwimmyFish = function (x, y) {
  this.x = x;
  this.y = y;
  this.velX = 0;
  this.velY = 0;
  this.speed = 5.0;
  this.scale = 1.0;
  this.shape = this.createShape(this.x, this.y);
  this.brain = new RandomBrain(this);
};

SwimmyFish.prototype.update = function(event) {
  this.brain.update(event);
  this.x += Game.timeToDist(this.velX, event.delta);
  this.y += Game.timeToDist(this.velY, event.delta);
  this.x = Math.min(Game.getWidth(), Math.max(0, this.x));
  this.y = Math.min(Game.getHeight(), Math.max(0, this.y));
  this.shape.x = this.x;
  this.shape.y = this.y;
  this.shape.scaleX = this.scale;
  this.shape.scaleY = this.scale;
};

SwimmyFish.prototype.createShape = function(x, y) {
  var circle = new createjs.Shape();
  circle.graphics.beginFill('Green').drawCircle(15, 15, 30);
  circle.regX = 15;
  circle.regY = 15;
  circle.x = x;
  circle.y = y;
  return circle;
};
