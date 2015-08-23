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
  var img = new Image(); 
  img.src = 'images/silver-fish.png';       
  var circle = new createjs.Bitmap(img);  
  circle.image.scaleX = -1;
  circle.regX = circle.image.width / 2;
  circle.regY = circle.image.height / 2;
  circle.x = x;
  circle.y = y;
  circle.setBounds(0, 0, 80, 80);
  return circle;
};
