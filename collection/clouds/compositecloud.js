"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cloud = function () {
  function Cloud() {
    _classCallCheck(this, Cloud);

    this.pos = { x: 250, y: 100 };
    this.columns = 10;
    this.rows = 10;

    this.particleSize = 5;
    this.particleOptions = {
      friction: 0.05,
      frictionStatic: 0.1
    };
    this.composite = Composites.softBody(this.pos.x, this.pos.y, this.columns, this.rows, 0, 0, true, this.particleSize, this.particleOptions), console.log(this.composite);
    World.add(world, this.composite);
    this.id = this.composite.id;

    this.offset = [];
    for (var i = 0; i < this.composite.bodies.length; i++) {
      //this.offset.push({x: random(10), y: random(10)})
      this.particlesSize *= random(0.5, 2);
      this.composite.bodies[i].circleRadius = this.particleSize;
    }
  }

  _createClass(Cloud, [{
    key: "update",
    value: function update() {
      var bodies = this.composite.bodies;
      // for(let i = 0; i < bodies.length; i++) {
      //   bodies[i].position.x += this.offset[i].x
      // }
    }
  }, {
    key: "show",
    value: function show() {
      push();
      var bodies = this.composite.bodies;

      noStroke();
      fill(255, 0, 0);
      beginShape(TRIANGLE_STRIP);
      for (var i = 0; i < this.columns - 1; i++) {
        for (var j = 0; j < this.rows; j++) {
          var index = this.columns * i + j;
          vertex(bodies[index].position.x, bodies[index].position.y);
          var secindex = this.columns * (i + 1) + j;
          vertex(bodies[secindex].position.x, bodies[secindex].position.y);
        }
      }
      endShape();

      // for(let i = 0; i < bodies.length; i++) {
      //   ellipse(bodies[i].position.x,bodies[i].position.y, this.particleSize *2, this.particleSize *2);

      // }
      pop();
    }
  }]);

  return Cloud;
}();