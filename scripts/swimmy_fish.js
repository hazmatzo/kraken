var SwimmyFish = function (x, y) {
  this.x = x;
  this.y = y;
  this.shape = this.createShape(this.x, this.y);
  this.brain = new RandomBrain(this);
};

SwimmyFish.prototype = new Agent();

SwimmyFish.prototype.preUpdate = function(event) {
  this.brain.update(event);
};

SwimmyFish.prototype.createShape = function(x, y) {
  var circle = new createjs.Shape();
  circle.graphics.beginFill('Green').drawCircle(30, 30, 30);
  circle.regX = 30;
  circle.regY = 30;
  circle.x = x;
  circle.y = y;
  circle.setBounds(0, 0, 60, 60);
  return circle;
};
