var Water = function() {
 this.shape = this.createShape();
};

Water.prototype.createShape = function() {
  var rectangle = new createjs.Shape();
  rectangle.graphics.beginFill('LightBlue').drawRect(0, 100, Game.getWidth(), Game.getHeight());
  rectangle.regX = 0;
  rectangle.regY = 100;
  rectangle.x = 0;
  rectangle.y = 100;
  return rectangle;
};

Water.prototype.setSize = function() {
  this.shape.graphics.drawRect(0, 100, Game.getWidth(), Game.getHeight());
};