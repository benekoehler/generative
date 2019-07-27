"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Composite = function () {
  function Composite(pos, size) {
    _classCallCheck(this, Composite);

    this.size = size;
    this.pos = pos;
    this.parts = [new Box(this.pos.x - this.size / 2, this.pos.y - this.size / 2, this.size / 2, this.size / 2, true), new Box(this.pos.x + this.size / 2, this.pos.y - this.size / 2, this.size / 2, this.size / 2, true), new Box(this.pos.x + this.size / 2, this.pos.y + this.size / 2, this.size / 2, this.size / 2, true), new Box(this.pos.x - this.size / 2, this.pos.y + this.size / 2, this.size / 2, this.size / 2, true)];

    this.compoundBody = Body.create({
      parts: [this.parts[0].body, this.parts[1].body, this.parts[2].body, this.parts[3].body]
    });

    World.add(world, this.compoundBody);
    this.compoundBody.parts[0].frictionAir = 0.1;
    console.log(this.compoundBody.parts);
  }

  _createClass(Composite, [{
    key: "update",
    value: function update() {
      for (var i = 0; i < this.parts.length; i++) {
        this.parts[i].update();
      }
    }
  }, {
    key: "show",
    value: function show() {
      for (var i = 0; i < this.parts.length; i++) {
        this.parts[i].show();
      }
    }
  }]);

  return Composite;
}();