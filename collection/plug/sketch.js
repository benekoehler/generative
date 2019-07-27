'use strict';

var plug = void 0;
var outlet = void 0;

var plug_model = void 0;
var outlet_model = void 0;

function preload() {
	plug_model = loadModel('assets/plug_obj.obj', true);
	outlet_model = loadModel('assets/outlet_obj.obj', true);
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	plug = new Plug(plug_model);
	outlet = new Outlet(outlet_model);
}

function draw() {
	clear();
	ambientMaterial(255);

	if (!plug.plugged) {
		//background(0);
		ambientLight(20, 20, 20);
		push();
		translate(0, 0, -300);
		plane(width * 2, height * 2);
		pop();
	} else {
		background(255);

		ambientLight(150, 150, 150);
	}

	var dirX = 100 * 2;
	var dirY = 100 * 2;
	directionalLight(250, 250, 250, -300, 200, -100);
	directionalLight(120, 120, 120, 300, 200, 100);
	plug.show();
	plug.update(outlet.getPos());

	outlet.show();
	fill(255);

	ellipse(mouseX - width / 2, mouseY - height / 2, 50, 50);
}

function mouseDragged() {
	plug.updatePos();
}