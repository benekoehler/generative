"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Plug = function () {
  function Plug(model) {
    _classCallCheck(this, Plug);

    this.pos = createVector(200, 0);
    this.z = 0;
    this.r = 200;
    this.hover = false;
    this.rotationZ = 90;
    this.rotationX = 0;
    this.distFromOutlet = 1000;
    this.plugged = false;
    this.model = model;
  }

  _createClass(Plug, [{
    key: "show",
    value: function show() {
      push();
      //noStroke();
      stroke(255);
      strokeWeight(5);
      translate(this.pos.x, this.pos.y, this.z);
      rotateZ(radians(90));
      rotateZ(this.rotationZ);
      rotateX(radians(this.rotationX));
      rotateX(radians(180));

      model(this.model);
      this.cable();

      //ellipse(0,0,this.r,this.r);
      pop();
    }
  }, {
    key: "update",
    value: function update(outletPos) {
      this.hover = this.checkClick();
      this.rotationZ = Math.atan2(this.pos.y - outletPos.y, this.pos.x - outletPos.x);

      this.distFromOutlet = dist(this.pos.x, this.pos.y, outletPos.x, outletPos.y);
      this.rotationX = map(this.distFromOutlet, 0, width + 100, -80, 0, true);

      if (this.distFromOutlet < 50) {
        this.plugged = true;
      }
      if (this.plugged) {
        this.pos = outletPos;
        this.z = lerp(this.z, -100, 0.1);
      }
    }
  }, {
    key: "updatePos",
    value: function updatePos() {

      if (this.checkClick() && !this.plugged) {
        this.pos.x = mouseX - width / 2;
        this.pos.y = mouseY - height / 2;
      }
    }
  }, {
    key: "checkClick",
    value: function checkClick() {
      return dist(mouseX - width / 2, mouseY - height / 2, this.pos.x, this.pos.y) < this.r;
    }
  }, {
    key: "getPos",
    value: function getPos() {
      return this.pos;
    }
  }, {
    key: "cable",
    value: function cable() {
      push();
      line(this.pos.x - width / 2, this.pos.y - height / 2, width, this.pos.y);
      pop();
    }
  }]);

  return Plug;
}();