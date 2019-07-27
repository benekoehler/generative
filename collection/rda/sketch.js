"use strict";

var grid = void 0;
var next = void 0;
var dA = 1.0;
var dB = 0.2;
var feed = 0.065;
var k = 0.062;

function setup() {
	createCanvas(200, 200);
	pixelDensity(1);
	setupGUI();
	grid = [];
	next = [];
	for (var x = 0; x < width; x++) {
		grid[x] = [];
		next[x] = [];
		for (var y = 0; y < height; y++) {
			grid[x][y] = { a: 1, b: 0 };
			next[x][y] = { a: 1, b: 0 };
		}
	}

	for (var i = 100; i < 110; i++) {
		for (var j = 100; j < 110; j++) {
			grid[i][j].b = 1;
		}
	}

	for (var _i = 80; _i < 90; _i++) {
		for (var _j = 70; _j < 90; _j++) {
			grid[_i][_j].b = 1;
		}
	}
}

function draw() {
	// background(50);

	for (var x = 1; x < width - 1; x++) {
		for (var y = 1; y < height - 1; y++) {
			var a = grid[x][y].a;
			var b = grid[x][y].b;
			next[x][y].a = a + dA * laplaceA(x, y) - a * b * b + feed * (1 - a);
			next[x][y].b = b + dB * laplaceB(x, y) + a * b * b - (k + feed) * b;

			next[x][y].a = constrain(next[x][y].a, 0, 1);
			next[x][y].b = constrain(next[x][y].b, 0, 1);
		}
	}

	// loadPixels();
	// for (let x = 0; x < width; x++) {
	//   for (let y = 0; y < height; y++) {
	//     let pix = (x + y * width) * 4;
	//     let a = next[x][y].a;
	//     let b = next[x][y].b;
	//     let c = floor((a - b) * 255);
	//     c = constrain(c, 0, 255);
	//     pixels[pix + 0] = c;
	//     pixels[pix + 1] = c;
	//     pixels[pix + 2] = c;
	//     pixels[pix + 3] = 255;
	//   }
	// }
	// updatePixels();

	swap();
	showFramerate();
}

var swap = function swap() {
	var temp = grid;
	grid = next;
	next = temp;
};

var laplaceA = function laplaceA(x, y) {
	var sum = 0;
	sum += grid[x][y].a * -1;
	sum += grid[x - 1][y].a * 0.2;
	sum += grid[x + 1][y].a * 0.2;
	sum += grid[x][y + 1].a * 0.2;
	sum += grid[x][y - 1].a * 0.2;
	sum += grid[x + 1][y + 1].a * 0.05;
	sum += grid[x - 1][y - 1].a * 0.05;
	sum += grid[x + 1][y - 1].a * 0.05;
	sum += grid[x - 1][y + 1].a * 0.05;
	return sum;
};

var laplaceB = function laplaceB(x, y) {
	var sum = 0;
	sum += grid[x][y].b * -1;
	sum += grid[x - 1][y].b * 0.2;
	sum += grid[x + 1][y].b * 0.2;
	sum += grid[x][y + 1].b * 0.2;
	sum += grid[x][y - 1].b * 0.2;
	sum += grid[x + 1][y + 1].b * 0.05;
	sum += grid[x - 1][y - 1].b * 0.05;
	sum += grid[x + 1][y - 1].b * 0.05;
	sum += grid[x - 1][y + 1].b * 0.05;
	return sum;
};