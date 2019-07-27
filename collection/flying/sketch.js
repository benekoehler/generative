'use strict';

var cohesion = 1;
var alignment = 1;
var separation = 1;
var up = 4;

var fovSlider = 1;

var cohesionMin = 0;
var cohesionMax = 10;
var alignmentMin = 0;
var alignmentMax = 10;
var separationMin = 0;
var separationMax = 10;
var upMin = 0;
var upMax = 10;

var fovSliderMin = 0;
var fovSliderMax = 10;

var gui = void 0;

var trees = [];
var boids = [];
var fov = void 0;
var cameraZ = void 0;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	setAttributes('antialias', true);
	setAttributes('perPixelLighting', true);
	noStroke();
	init();
	for (var i = 0; i <= 20; i++) {
		trees.push(new Tree(random(-width, width), random(-height / 4, height / 4)));
	}
	for (var _i = 0; _i <= 50; _i++) {
		boids.push(new Boid());
	}
	// smooth();
	// ortho();

	gui = createGui('flying shit');
	gui.addGlobals('cohesion', 'alignment', 'separation', 'up', 'fovSlider');

	fov = 60 / 180 * PI;
	cameraZ = height / 2.0 / tan(fov / 2.0);
}

function draw() {

	// perspective(fov, width / height, cameraZ * 0.1);
	background(255);
	pointLight(120, 120, 120, map(mouseX, 0, width, -width / 2, width / 2), map(mouseY, 0, height, -height / 2, height / 2), 150);

	// plane(width, height);
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = trees[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var tree = _step.value;

			tree.draw();
			tree.move();
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	boids[0].color = color(255, 0, 0);
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = boids[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var boid = _step2.value;

			boid.flock(boids);
			boid.draw();
			boid.update(trees);

			boid.cohesionMultiplyer = cohesion;
			boid.alignMultiplyer = alignment;
			boid.separationMultiplyer = separation;
			boid.upMultiplyer = up;
		}
	} catch (err) {
		_didIteratorError2 = true;
		_iteratorError2 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion2 && _iterator2.return) {
				_iterator2.return();
			}
		} finally {
			if (_didIteratorError2) {
				throw _iteratorError2;
			}
		}
	}

	console.log(boids[0].collisionAmount);
}

var init = function init() {
	// stroke(50);
	camera(0, 0, 500, 0, 0, 0, 0, 1, 0);

	angleMode(DEGREES);
	// directionalLight(255, 255, 255, 255, 0, 0, 250);

	ambientLight(200);
};