var Water = function() {
  this.waterLine = 200;
  this.shape = this.createShape();
};

Water.prototype.createShape = function() {
  var rectangle = new createjs.Shape();
  rectangle.graphics.beginFill('LightBlue').drawRect(0, this.waterLine, Game.getWidth(), Game.getHeight());
  rectangle.regX = 0;
  rectangle.regY = this.waterLine;
  rectangle.x = 0;
  rectangle.y = this.waterline;
  return rectangle;
};

Water.prototype.setSize = function() {
  this.shape.graphics.drawRect(0, this.waterLine, Game.getWidth(), Game.getHeight());
};
