var SwimmyFish = function (x, y) {
  this.x = x;
  this.y = y;
  this.velX = 0;
  this.velY = 0;
  this.speed = 5.0;
  this.scale = 1.0;
  this.shape = this.createShape(this.x, this.y);
  this.possibleDecisions = [50, 120, 150, 200];
  this.horizLikelihood = 1.0;
  this.vertLikelihood = 0.2;
  this.nextDecision = 0;
};

SwimmyFish.prototype.update = function(event) {
  var ticks = createjs.Ticker.getTicks(); 
  if (this.nextDecision < ticks) {
    this.nextDecision = ticks + 
      _.sample(this.possibleDecisions);
    this.makeDecision();
  }
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

SwimmyFish.prototype.makeDecision = function() {
  this.velX = 0.0;
  this.velY = 0.0;
  if (this.horizLikelihood >= Math.random()) {
    this.velX = this.speed * _.sample([1, -1]);
  }
  if (this.vertLikelihood >= Math.random()) {
    this.velY = this.speed * _.random(-1,1);
  }
}
