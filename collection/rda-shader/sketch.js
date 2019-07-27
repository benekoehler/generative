'use strict';

var simpleshader = void 0;

function preload() {
	console.log('preload');
	simpleshader = loadShader('data/shader.vert', 'data/shader.frag');
}

function setup() {
	console.log('setup');

	createCanvas(400, 400, WEBGL);
	noStroke();
}

function draw() {
	// console.log(map(mouseX, 0, width, -1 , 1))
	shader(simpleshader);

	simpleshader.setUniform('time', frameCount);

	rect(0, 0, 0.5, 0.5);
}