"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var test = function () {
  function test(x, y, rotation, scale) {
    _classCallCheck(this, test);

    this.pos = createVector(x, y);
    this.rotation = rotation || random(0, 360);
    this.scale = scale || random(0.5, 1);

    // this.draw = this.draw.bind(this);
  }

  _createClass(test, [{
    key: "draw",
    value: function draw() {
      push();
      translate(this.pos.x, this.pos.y, 0);
      scale(this.scale);
      rotateX(90);
      cone(50, 300);
      pop();
    }
  }, {
    key: "move",
    value: function move() {
      this.pos.add(0, 2);
      if (this.pos.y >= height / 2) {
        this.pos.y = -height / 2;
        this.pos.x = random(-width / 2, width / 2);
      }
    }
  }]);

  return test;
}();