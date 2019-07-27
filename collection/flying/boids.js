"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Boid = function () {
  function Boid() {
    _classCallCheck(this, Boid);

    this.position = createVector(random(-width / 3, width / 3), random(-height / 3, height / 3));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
    this.rotation = 0;
    this.maxForce = 0.5;
    this.maxSpeed = 12;
    this.noiseOff = random(200);
    this.upPos = createVector(random(-width / 3, width / 3), -height / 2);

    this.alignMultiplyer = 1;
    this.cohesionMultiplyer = 1;
    this.separationMultiplyer = 1;

    this.upMultiplyer = 1;

    this.color = color(255, 255, 255);
    this.collisionAmount;
  }

  _createClass(Boid, [{
    key: "edges",
    value: function edges() {
      if (this.position.x > width / 4) {
        this.position.x = -width / 4;
      } else if (this.position.x < -width / 4) {
        this.position.x = random(-width / 4, width / 4);
      }
      if (this.position.y > height / 4) {
        this.position.y = -height / 4;
      } else if (this.position.y < -height / 4) {
        this.position.y = height / 4;
      }
    }
  }, {
    key: "align",
    value: function align(boids) {
      var _this = this;

      var steering = createVector();
      var percRadius = 25;
      var total = 0;
      steering = boids.reduce(function (acc, cur) {
        if (cur != _this && dist(cur.position.x, cur.position.y, _this.position.x, _this.position.y) < percRadius) {
          total++;
          acc.add(cur.velocity);
        }
        return acc;
      }, steering);

      if (total > 0) {
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
      return steering;
    }
  }, {
    key: "cohesion",
    value: function cohesion(boids) {
      var _this2 = this;

      var steering = createVector();
      var percRadius = 70;
      var total = 0;
      steering = boids.reduce(function (acc, cur) {
        if (cur != _this2 && dist(cur.position.x, cur.position.y, _this2.position.x, _this2.position.y) < percRadius) {
          total++;
          acc.add(cur.position);
        }
        return acc;
      }, steering);

      if (total > 0) {
        steering.div(total);
        steering.sub(this.position);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
      return steering;
    }
  }, {
    key: "separate",
    value: function separate(boids) {
      var _this3 = this;

      var steering = createVector();
      var percRadius = 50;
      var total = 0;
      steering = boids.reduce(function (acc, cur) {
        var d = dist(cur.position.x, cur.position.y, _this3.position.x, _this3.position.y);
        if (cur != _this3 && d < percRadius) {
          var diff = p5.Vector.sub(_this3.position, cur.position);
          diff.div(d * d);
          steering.add(diff);
          total++;
        }
        return acc;
      }, steering);

      if (total > 0) {
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
      return steering;
    }
  }, {
    key: "goUp",
    value: function goUp() {
      var steering = createVector(this.upPos.x, this.upPos.y);

      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);

      return steering;
    }
  }, {
    key: "collision",
    value: function collision(objs) {
      var _this4 = this;

      var steering = createVector();
      var percRadius = 80;
      var total = 0;
      steering = objs.reduce(function (acc, cur) {
        var d = dist(cur.position.x, cur.position.y, _this4.position.x, _this4.position.y);
        if (cur != _this4 && d < percRadius && d > 40) {
          var diff = p5.Vector.sub(_this4.position, cur.position);
          diff.div(d * d);
          steering.add(diff);
          total++;
        } else {
          steering.set(0, 0);
        }
        return acc;
      }, steering);

      if (total > 0) {
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
      return steering;
    }
  }, {
    key: "draw",
    value: function draw() {

      push();
      translate(this.position.x, this.position.y, noise(this.noiseOff) * 50);

      push();
      ambientMaterial(this.color);
      rotateZ(this.rotation);
      push();
      // fill(80, 0.5);
      // noFill();
      // stroke(0);
      // strokeWeight(1);
      // ellipse(0, 0, 80, 80);

      pop();
      // ellipsoid(5, 10, 5);
      cone(10, 30);
      pop();
      pop();
    }
  }, {
    key: "calcRotation",
    value: function calcRotation() {
      var rotation = 0;
      var vel = this.velocity;
      vel.normalize();
      rotation = atan2(0, 1) - atan2(vel.x, vel.y);

      return rotation;
    }
  }, {
    key: "flock",
    value: function flock(boids) {
      var alignment = this.align(boids);
      this.acceleration.add(alignment.mult(this.alignMultiplyer));

      var separation = this.separate(boids);
      //separation *= 2.5;
      this.acceleration.add(separation.mult(this.separationMultiplyer));

      var cohesion = this.cohesion(boids);
      this.acceleration.add(cohesion.mult(this.cohesionMultiply));
    }
  }, {
    key: "update",
    value: function update(trees) {
      this.noiseOff += 0.01;
      this.collisionAmount = this.collision(trees);
      this.acceleration.add(this.collisionAmount);

      var up = this.goUp();
      this.acceleration.add(up.mult(map(this.upMultiplyer, upMin, upMax, 0, 1)));

      this.position.add(this.velocity);
      this.velocity.add(this.acceleration);
      this.edges();

      // this.velocity.limit(this.maxSpeed);
      this.acceleration.set(0);
      this.rotation = this.calcRotation();

      // this.goUp();
    }
  }]);

  return Boid;
}();