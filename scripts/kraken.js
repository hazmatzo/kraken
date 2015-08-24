var KRAKEN_SPRITE_DATA = {
    images: ['images/the_kraken.png'],
    frames: {width:993, height:618},
    animations: {
        chase:0
    }
  };

var KRAKEN_SPRITE_SHEET = new createjs.SpriteSheet(KRAKEN_SPRITE_DATA);

var Kraken = function() {
  this.x = 100;
  this.y = 100;
  this.shape = this.createShape(this.x, this.y);
  this.speed = 5.0;
  this.minSize = 2.0;
  this.setAgentSize(2);
};

Kraken.prototype = new Agent();

Kraken.prototype.onOutOfBounds = function(newX, newY) {
  this.x = newX;
  this.y = newY;
  this.moveInBounds();
};

Kraken.prototype.startLeft = function() {
  this.velX = -this.speed * 1.0;
  this.shape.scaleX = Math.abs(this.shape.scaleX);
  this.shape.rotation = 0;
};

Kraken.prototype.stopLeft = function() {
  this.velX = Math.max(0.0, this.velX);
};

Kraken.prototype.startRight = function() {
  this.velX = this.speed * 1.0;
  this.shape.scaleX = -1 * Math.abs(this.shape.scaleX);
  this.shape.rotation = 0;
};

Kraken.prototype.stopRight = function() {
  this.velX = Math.min(0.0, this.velX);
};

Kraken.prototype.startUp = function() {
  this.velY = -this.speed * 1.0;
  this.shape.scaleX = Math.abs(this.shape.scaleX);
  this.shape.rotation = 90;
};

Kraken.prototype.stopUp = function() {
  this.velY = Math.max(0.0, this.velY);
};

Kraken.prototype.startDown = function() {
  this.velY = this.speed * 1.0;
  this.shape.scaleX = Math.abs(this.shape.scaleX);
  this.shape.rotation = -90;
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
  sprite.scaleX = sprite.scaleX * .25;
  sprite.scaleY = sprite.scaleY * .25;
  return sprite;
};
