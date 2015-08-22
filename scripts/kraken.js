var Kraken = function() {
	var that = this;
	this.x = 100;
	this.y = 100;
	this.shape = this.createKrakenShape(this.x, this.y);
}

Kraken.prototype.moveLeft = function() {

}

Kraken.prototype.moveRight = function() {

}

Kraken.prototype.moveUp = function() {

}

Kraken.prototype.moveDown = function() {

}

Kraken.prototype.createKrakenShape = function(x, y) {
  var circle = new createjs.Shape();
  circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
  circle.x = x;
  circle.y = y;
  return circle;
}