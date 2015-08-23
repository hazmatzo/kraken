Boat = function(x) {
  this.x = x;
  this.y = Game.water.waterLine;
  this.shape = this.createBoatShape(this.x, this.y);
};

Boat.prototype = new Agent();

Boat.prototype.createBoatShape = function(x, y) {
  console.log("x", x);
  console.log("y", y);
  var boat = new createjs.Shape();
  boat.x = x;
  boat.y = y;
  boat.graphics.beginFill("BurlyWood").drawCircle(x, y, 50);
  boat.regX = 50;
  boat.regY = 50;
  boat.setBounds(0, 0, 100, 100);
  return boat;
}