'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SvgCloud = function () {
  function SvgCloud() {
    _classCallCheck(this, SvgCloud);

    this.path = 'M147,74 C147,33.6832133 179.683213,1 220,1 C260.316787,1 293,33.6832133 293,74 C293,78.8197772 292.532903,83.5304581 291.641508,88.0892446 C330.266552,89.9867482 361,121.904283 361,161 C361,201.316787 328.316787,234 288,234 C265.225816,234 244.887433,223.571098 231.5,207.228445 C218.112567,223.571098 197.774184,234 175,234 C155.404715,234 137.612694,226.27931 124.5,213.713995 C111.387303,226.279312 93.595283,234 74,234 C33.6832133,234 1,201.316787 1,161 C1,120.683213 33.6832133,88 74,88 C93.595283,88 111.387303,95.720688 124.499996,108.286001 C131.583893,101.497823 140.033448,96.1235473 149.395207,92.6166362 C147.832337,86.6733626 147,80.4338827 147,74 Z';
    this.vertexSets = [];
    this.vertexSets.push(Svg.pathToVertices(this.path, 30));

    World.add(world, Bodies.fromVertices(400, 80, this.vertexSets));
    console.log(this.vertexSets);
  }

  _createClass(SvgCloud, [{
    key: 'show',
    value: function show() {}
  }]);

  return SvgCloud;
}();