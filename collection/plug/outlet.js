"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Outlet = function () {
  function Outlet(model) {
    _classCallCheck(this, Outlet);

    this.pos = createVector(-400, 300);
    this.r = 200;
    this.model = model;
  }

  _createClass(Outlet, [{
    key: "show",
    value: function show() {
      push();
      ambientMaterial(255, 0, 120);
      noStroke();
      translate(this.pos.x, this.pos.y, -200);

      //ellipse(0,0,this.r, this.r);
      scale(1.3);
      rotateX(radians(90));
      rotateY(radians(90));
      model(this.model);
      pop();
    }
  }, {
    key: "getPos",
    value: function getPos() {
      return this.pos;
    }
  }]);

  return Outlet;
}();