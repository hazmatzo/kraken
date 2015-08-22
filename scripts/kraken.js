var Kraken = function() {
	var that = this;
	this.x = 100;
	this.y = 100;
	this.shape = this.createKrakenShape(this.x, this.y);
};

Kraken.prototype.update = function() {
	this.shape.x = this.x;
	this.shape.y = this.y;
};

Kraken.prototype.moveLeft = function() {
	this.x = this.x - 5;
};

Kraken.prototype.moveRight = function() {
	this.x = this.x + 5;
};

Kraken.prototype.moveUp = function() {
	this.y = this.y - 5;
};

Kraken.prototype.moveDown = function() {
	this.y = this.y + 5;
};

Kraken.prototype.createKrakenShape = function(x, y) {
  var circle = new createjs.Shape();
  circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
  circle.x = x;
  circle.y = y;
  return circle;
};