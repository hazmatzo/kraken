var BOAT_SPRITE_DATA = {
    images: ['images/boat.png'],
    frames: {width:821, height:499},
    animations: {
        sail:0
    }
  };

var BOAT_SPRITE_SHEET = new createjs.SpriteSheet(BOAT_SPRITE_DATA);

Boat = function(x) {
  this.x = x;
  this.y = Game.water.waterLine - (0.25 * Game.water.waterLine);
  this.shape = this.createBoatShape(this.x, this.y);
  this.brain = new RandomBrain(this, 0);
};

Boat.prototype = new Agent();

Boat.prototype.getBounds = function () {
  return {left: 0, top: 0, right: Game.getWidth(), bottom: Game.getHeight()};
}

Boat.prototype.onOutOfBounds = function() {
  this.brain.makeDecision();
}

Boat.prototype.preUpdate = function(event) {
  this.brain.update(event);
};

Boat.prototype.createBoatShape = function(x, y) {
  var sprite = new createjs.Sprite(BOAT_SPRITE_SHEET, 'sail');
  var width = BOAT_SPRITE_DATA.frames.width;
  var height = BOAT_SPRITE_DATA.frames.height;
  sprite.setBounds(0, 0, width, height);
  sprite.regX = width/2;
  sprite.regY = height/2;
  sprite.x = x;
  sprite.y = y;
  sprite.scaleX = 200 / width;
  sprite.scaleY = sprite.scaleX;
  return sprite;
};
