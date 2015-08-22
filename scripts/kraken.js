var Kraken = function() {
  var that = this;
  this.x = 100.0;
  this.y = 100.0;
  this.velX = 0;
  this.velY = 0;
  this.speed = 3.0;
  this.scale = 1.0;
  this.shape = this.createKrakenShape(this.x, this.y);
};

Kraken.prototype.update = function(event) {
  this.x += Game.timeToDist(this.velX, event.delta); 
  this.y += Game.timeToDist(this.velY, event.delta); 
  this.shape.x = this.x;
  this.shape.y = this.y;
  this.shape.scaleX = this.scale;
  this.shape.scaleY = this.scale;
};

Kraken.prototype.startLeft = function() {
  this.velX = -this.speed * 1.0;
};

Kraken.prototype.stopLeft = function() {
  this.velX = 0.0;
};

Kraken.prototype.startRight = function() {
  this.velX = this.speed * 1.0;
};

Kraken.prototype.stopRight = function() {
  this.velX = 0.0;
};

Kraken.prototype.startUp = function() {
  this.velY = -this.speed * 1.0;
};

Kraken.prototype.stopUp = function() {
  this.velY = 0.0;
};

Kraken.prototype.startDown = function() {
  this.velY = this.speed * 1.0;
};

Kraken.prototype.stopDown = function() {
  this.velY = 0.0;
};

Kraken.prototype.createKrakenShape = function(x, y) {
  var circle = new createjs.Shape();
  circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
  circle.x = x;
  circle.y = y;
  return circle;
};
