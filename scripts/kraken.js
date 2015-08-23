var Kraken = function() {
  this.x = 100;
  this.y = 100;
  this.shape = this.createShape(this.x, this.y);
};

Kraken.prototype = new Agent();

Kraken.prototype.startLeft = function() {
  this.velX = -this.speed * 1.0;
};

Kraken.prototype.stopLeft = function() {
  this.velX = Math.max(0.0, this.velX);
};

Kraken.prototype.startRight = function() {
  this.velX = this.speed * 1.0;
};

Kraken.prototype.stopRight = function() {
  this.velX = Math.min(0.0, this.velX);
};

Kraken.prototype.startUp = function() {
  this.velY = -this.speed * 1.0;
};

Kraken.prototype.stopUp = function() {
  this.velY = Math.max(0.0, this.velY);
};

Kraken.prototype.startDown = function() {
  this.velY = this.speed * 1.0;
};

Kraken.prototype.stopDown = function() {
  this.velY = Math.min(0.0, this.velY);
};

Kraken.prototype.createShape = function(x, y) {
  var circle = new createjs.Shape();
  circle.x = x;
  circle.y = y;
  circle.graphics.beginFill('DeepSkyBlue').drawCircle(50, 50, 50);
  circle.regX = 50;
  circle.regY = 50;
  circle.setBounds(0, 0, 100, 100);
  return circle;
};
