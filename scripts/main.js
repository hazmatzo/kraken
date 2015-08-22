var init = function() {
  var stage = new createjs.Stage('mainCanvas');
  var circle = new createjs.Shape();
  circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
  circle.x = 100;
  circle.y = 100;
  stage.addChild(circle);
  stage.update();
  var test_array = [1,2,3];
  console.log(_.map(test_array, function (x) { return x*2; }));
};
