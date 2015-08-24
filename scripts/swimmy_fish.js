var SWIMMY_FISH_SPRITE_DATA = {
  images: ['images/silver-fish.png'],
  frames: {width:728, height:177},
  animations: {
      swim:0
  }
};

var CLOWNFISH_SPRITE_DATA = {
  images: ['images/clownfish.png'],
  frames: {width:495, height:230},
  animations: {
      swim:0
  }
};

var SWIMMY_FISH_SPRITE_SHEET = new createjs.SpriteSheet(SWIMMY_FISH_SPRITE_DATA);
var CLOWNFISH_SPRITE_SHEET = new createjs.SpriteSheet(CLOWNFISH_SPRITE_DATA);

var FISHIES = {
  CLOWNFISH: {
    data: CLOWNFISH_SPRITE_DATA,
    sheet: CLOWNFISH_SPRITE_SHEET
  },
  SWIMMY_FISH: {
    data: SWIMMY_FISH_SPRITE_DATA,
    sheet: SWIMMY_FISH_SPRITE_SHEET   
  }
};

var SwimmyFish = function (x, y, relSize) {
  this.x = x;
  this.y = y;
  this.shape = this.createShape(this.x, this.y);
  this.brain = new RandomBrain(this);
  this.setAgentSize(1);
  this.setRelativeSize(relSize);
};

SwimmyFish.prototype = new Agent();

SwimmyFish.prototype.preUpdate = function(event) {
  this.brain.update(event);
};

SwimmyFish.prototype.onOutOfBounds = function(newX, newY) {
  this.brain.makeDecision();
};

SwimmyFish.prototype.createShape = function(x, y) {
  var fishType = FISHIES[_.sample(_.keys(FISHIES), 1)];
  var sprite = new createjs.Sprite(fishType.sheet, 'swim');
  var width = fishType.data.frames.width;
  var height = fishType.data.frames.height;
  sprite.setBounds(0, 0, width, height);
  sprite.regX = width/2;
  sprite.regY = height/2;
  sprite.x = x;
  sprite.y = y;
  sprite.scaleX = 80 / width;
  sprite.scaleY = sprite.scaleX;
  return sprite;
};
