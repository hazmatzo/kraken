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
  var kraken = new createjs.Shape();
  kraken.x = x;
  kraken.y = y;
  kraken.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
  kraken.regX = 0;
  kraken.regY = 0;
  kraken.setBounds(-50, -50, 50, 50);
  return kraken;
};
