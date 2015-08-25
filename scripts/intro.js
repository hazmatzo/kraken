var Intro = {};

Intro.init = function(screen) {
  Intro.setup();
  var screenType = screen || "intro";
  Intro.draw(screenType);
  Intro.currentStage.update();
  createjs.Ticker.addEventListener("tick", Intro.tick);
};

Intro.setup = function(toDoNext) {
  Intro.currentStage = new createjs.Stage('mainCanvas');
  createjs.Ticker.framerate = 60;
  $(window).resize(Intro.resize);
  Intro.resize();
};

Intro.draw = function(screen) {
  Intro.createBackground();
  Intro.createCover(screen);
};

Intro.tick = function(event) {
  Intro.currentStage.update();
};

Intro.getWidth = function() {
  return Intro.currentStage.canvas.width;
};

Intro.getHeight = function() {
  return Intro.currentStage.canvas.height;
};

/**
 * When the window is resized, resize the canvas.
 */
Intro.resize = function() {
  Intro.currentStage.canvas.width = window.innerWidth;
  Intro.currentStage.canvas.height = window.innerHeight;
  if (Intro.background) {
    Intro.background.graphics.drawRect(0, 0, Intro.getWidth(), Intro.getHeight());
    Intro.currentStage.removeChild(Intro.cover);
    Intro.createCover();
  }
};

Intro.createBackground = function() {
  var rectangle = new createjs.Shape();
  rectangle.graphics.beginFill('LightBlue').drawRect(0, 0, Intro.getWidth(), Intro.getHeight());
  rectangle.x = 0;
  rectangle.y = 0;
  Intro.background = rectangle;
  Intro.currentStage.addChild(rectangle);
};

var COVER_SPRITE_DATA = {
    images: ['images/cover.png'],
    frames: {width:1706, height:1354},
    animations: {
        show:0
    }
  };

var WIN_SPRITE_DATA = {
    images: ['images/win_screen.png'],
    frames: {width:1706, height:1354},
    animations: {
        show:0
    }
  };

var LOSE_SPRITE_DATA = {
    images: ['images/lose_screen.png'],
    frames: {width:1706, height:1354},
    animations: {
        show:0
    }
  };

var COVER_SPRITE_SHEET = new createjs.SpriteSheet(COVER_SPRITE_DATA);

var LOSE_SPRITE_SHEET = new createjs.SpriteSheet(LOSE_SPRITE_DATA);

var WIN_SPRITE_SHEET = new createjs.SpriteSheet(WIN_SPRITE_DATA);
Intro.createCover = function(screen) {
  var sprite = null;
  if (screen == "win") {
    sprite = new createjs.Sprite(WIN_SPRITE_SHEET, 'show');
  } else if (screen == "lose") {
    sprite = new createjs.Sprite(LOSE_SPRITE_SHEET, 'show');
  } else {
    sprite = new createjs.Sprite(COVER_SPRITE_SHEET, 'show');
  }
  var width = COVER_SPRITE_DATA.frames.width;
  var height = COVER_SPRITE_DATA.frames.height;
  sprite.setBounds(0, 0, width, height);
  sprite.regX = width/2;
  sprite.regY = height/2;
  sprite.x = Intro.getWidth()/2;
  sprite.y = Intro.getHeight()/2;
  sprite.scaleX = Math.min(Intro.getWidth() / 1706, Intro.getHeight() / 1354);
  sprite.scaleY = sprite.scaleX;
  Intro.cover = sprite;
  Intro.currentStage.addChild(sprite);
  sprite.addEventListener('click', function(event) {
    Intro.currentStage.removeAllChildren();
    createjs.Ticker.removeAllEventListeners();
    Game.init();
  })
};


