var KRAKEN_SPRITE_DATA = {
    images: ['images/kraken.png'],
    frames: {width:236, height:255},
    animations: {
        chase:0
    }
  };

var KRAKEN_SPRITE_SHEET = new createjs.SpriteSheet(KRAKEN_SPRITE_DATA);

var Kraken = function() {
  this.x = 100;
  this.y = 100;
  this.shape = this.createShape(this.x, this.y);
};

Kraken.prototype = new Agent();

Kraken.prototype.startLeft = function() {
  this.velX = -this.speed * 1.0;
};

Kraken.prototype.stopLeft = function() {
  this.velX = Math.max(0.0, this.velX);
};

Kraken.prototype.startRight = function() {
  this.velX = this.speed * 1.0;
};

Kraken.prototype.stopRight = function() {
  this.velX = Math.min(0.0, this.velX);
};

Kraken.prototype.startUp = function() {
  this.velY = -this.speed * 1.0;
};

Kraken.prototype.stopUp = function() {
  this.velY = Math.max(0.0, this.velY);
};

Kraken.prototype.startDown = function() {
  this.velY = this.speed * 1.0;
};

Kraken.prototype.stopDown = function() {
  this.velY = Math.min(0.0, this.velY);
};

Kraken.prototype.createShape = function(x, y) {
  var sprite = new createjs.Sprite(KRAKEN_SPRITE_SHEET, 'chase');
  var width = KRAKEN_SPRITE_DATA.frames.width;
  var height = KRAKEN_SPRITE_DATA.frames.height;
  sprite.setBounds(0, 0, width, height);
  sprite.regX = width/2;
  sprite.regY = height/2;
  sprite.x = x;
  sprite.y = y;
  sprite.scaleX = 150 / width;
  sprite.scaleY = sprite.scaleX;
  return sprite;
};
