var SEAWEED_SPRITE_DATA = {
  images: ['images/seaweed.png'],
  frames: {width:1718, height:1701}
};

var SEAWEED_SPRITE_SHEET = new createjs.SpriteSheet(SEAWEED_SPRITE_DATA);

var Seaweed = function() {
  var random_x_position_divisor = _.random(1, 10);
  this.mid_x_point = (Game.getWidth() / random_x_position_divisor);
  this.mid_y_point = (Game.getHeight());
  this.shape = this.createShape();
};

Seaweed.prototype = new Agent();

Seaweed.prototype.createShape = function() {
  var sprite = new createjs.Sprite(SEAWEED_SPRITE_SHEET);
  var width = SEAWEED_SPRITE_DATA.frames.width;
  var height = SEAWEED_SPRITE_DATA.frames.height;

  sprite.setBounds(0, 0, width, height);
  sprite.regX = width/2;
  sprite.regY = height/2;
  sprite.x = this.mid_x_point;
  sprite.y = this.mid_y_point;
  sprite.scaleX = 150 / width;
  sprite.scaleY = sprite.scaleX;
  sprite.scaleX = sprite.scaleX;
  return sprite;
}