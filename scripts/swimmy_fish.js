var SWIMMY_FISH_SPRITE_DATA = {
    images: ['images/silver-fish.png'],
    frames: {width:728, height:177},
    animations: {
        swim:0
    }
  };

var SWIMMY_FISH_SPRITE_SHEET = new createjs.SpriteSheet(SWIMMY_FISH_SPRITE_DATA);

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

SwimmyFish.prototype.onOutOfBounds = function(newX, newY) {
  this.brain.makeDecision();
};

SwimmyFish.prototype.createShape = function(x, y) {
  var sprite = new createjs.Sprite(SWIMMY_FISH_SPRITE_SHEET, 'swim');
  var width = SWIMMY_FISH_SPRITE_DATA.frames.width;
  var height = SWIMMY_FISH_SPRITE_DATA.frames.height;
  sprite.setBounds(0, 0, width, height);
  sprite.regX = width/2;
  sprite.regY = height/2;
  sprite.x = x;
  sprite.y = y;
  sprite.scaleX = 80 / width;
  sprite.scaleY = sprite.scaleX;
  return sprite;
};
