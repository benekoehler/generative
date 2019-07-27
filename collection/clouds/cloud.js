"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cloud = function () {
  function Cloud(x, y, radius) {
    var isComposite = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _classCallCheck(this, Cloud);

    this.pos = {
      x: x,
      y: y
    };
    this.r = radius;
    this.angle = 0;
    this.body = Bodies.circle(this.pos.x, this.pos.y, this.r);
    //console.log(this.body);
    this.body.frictionAir = random(0, 0.5);
    if (!isComposite) {
      World.add(world, this.body);
    }

    this.imgIndex = Math.floor(random(imgs.length));
    console.log(this.imgIndex);
  }

  _createClass(Cloud, [{
    key: "update",
    value: function update() {

      this.angle = this.body.angle;
      this.pos = this.body.position;
    }
  }, {
    key: "show",
    value: function show() {
      push();
      noStroke();
      fill(120);
      translate(this.pos.x, this.pos.y);
      rotate(this.angle);
      rectMode(CENTER);

      push();
      scale(this.r / 100);
      translate(-imgs[this.imgIndex].width / 2, -imgs[this.imgIndex].height / 2);
      image(imgs[this.imgIndex], 0, 0);
      pop();
      //ellipse(0,0, this.r*2, this.r*2);
      pop();
    }
  }]);

  return Cloud;
}();