'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Box = function () {
  function Box(x, y, w, h) {
    var letter = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var isComposite = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

    _classCallCheck(this, Box);

    this.pos = {
      x: x,
      y: y
    };
    this.w = w;
    this.h = h;
    this.scale = 1;
    this.angle;
    this.chamfer = 2;
    //this.body = Bodies.rectangle(this.pos.x,this.pos.y, this.w, this.h, { chamfer: {radius: this.chamfer}});

    this.body = Bodies.circle(this.pos.x, this.pos.y, this.w / 2);
    //console.log(this.body);
    this.body.frictionAir = random(0, 1);
    if (!isComposite) {
      World.add(world, this.body);
    }
    this.letters = 'abcdefghijklmnopqrstuvwxyz';
    if (letter === null) {
      this.letter = this.letters.charAt(random(this.letters.length));
    } else {
      this.letter = letter;
    }
  }

  _createClass(Box, [{
    key: 'update',
    value: function update() {

      this.angle = this.body.angle;
      this.pos = this.body.position;
    }
  }, {
    key: 'show',
    value: function show() {
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.angle);
      rectMode(CENTER);
      //ellipse(0, 0, this.w, this.h);
      //textSize(40)
      textFont(akkuratFont, 40);
      text(this.letter, -this.w / 3, this.h / 3);
      pop();
    }
  }]);

  return Box;
}();