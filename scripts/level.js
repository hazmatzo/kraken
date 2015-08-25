var Level = function() {
}

Level.prototype.init = function() {
  this.setup();
  this.draw();
  this.currentStage.update();
  createjs.Ticker.addEventListener("tick", this.tick);
};

Level.prototype.setup = function(toDoNext) {
  this.currentStage = new createjs.Stage('mainCanvas');
  createjs.Ticker.framerate = 60;
  $(window).resize(this.resize);
  this.resize();
};

Level.prototype.draw = function() {
  this.createBackground();
  this.createCover();
};

Level.prototype.tick = function(event) {
  this.currentStage.update();
};

Level.prototype.getWidth = function() {
  return this.currentStage.canvas.width;
};

Level.prototype.getHeight = function() {
  return this.currentStage.canvas.height;
};

/**
 * When the window is resized, resize the canvas.
 */
Level.prototype.resize = function() {
  this.currentStage.canvas.width = window.innerWidth;
  this.currentStage.canvas.height = window.innerHeight;
  if (this.background) {
    this.background.graphics.drawRect(0, 0, this.getWidth(), this.getHeight());
    this.currentStage.removeChild(this.cover);
    this.createCover();
  }
};

Level.prototype.createBackground = function() {
  var rectangle = new createjs.Shape();
  rectangle.graphics.beginFill('LightBlue').drawRect(0, 0, this.getWidth(), this.getHeight());
  rectangle.x = 0;
  rectangle.y = 0;
  this.background = rectangle;
  this.currentStage.addChild(rectangle);
};

var COVER_SPRITE_DATA = {
    images: ['images/cover.png'],
    frames: {width:1706, height:1354},
    animations: {
        show:0
    }
  };

var COVER_SPRITE_SHEET = new createjs.SpriteSheet(COVER_SPRITE_DATA);

Level.prototype.createCover = function() {
  var sprite = new createjs.Sprite(COVER_SPRITE_SHEET, 'show');
  var width = COVER_SPRITE_DATA.frames.width;
  var height = COVER_SPRITE_DATA.frames.height;
  sprite.setBounds(0, 0, width, height);
  sprite.regX = width/2;
  sprite.regY = height/2;
  sprite.x = this.getWidth()/2;
  sprite.y = this.getHeight()/2;
  sprite.scaleX = Math.min(this.getWidth() / 1706, this.getHeight() / 1354);
  sprite.scaleY = sprite.scaleX;
  this.cover = sprite;
  this.currentStage.addChild(sprite);
  var that = this;
  sprite.addEventListener('click', function(event) {
    that.currentStage.removeAllChildren();
    Game.init();
  })
};


