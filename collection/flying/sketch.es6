let cohesion = 1;
let alignment = 1;
let separation = 1;
let up = 4;

let fovSlider = 1;

let cohesionMin = 0;
let cohesionMax = 10;
let alignmentMin = 0;
let alignmentMax = 10;
let separationMin = 0;
let separationMax = 10;
let upMin = 0;
let upMax = 10;

let fovSliderMin = 0;
let fovSliderMax = 10;

let gui;

let trees = [];
let boids = [];
let fov ;
let cameraZ;

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	setAttributes('antialias', true);
	setAttributes('perPixelLighting', true);
	noStroke();
	init();
	for(let i = 0; i <=20; i++) {
		trees.push(new Tree(random(-width, width), random(-height/4, height/4)));
	}
	for(let i = 0; i <=50; i++) {
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
	pointLight(120, 120, 120, map(mouseX, 0, width, -width/2, width/2), map(mouseY, 0, height, -height/2, height/2), 150);

	// plane(width, height);
	for(let tree of trees){
		tree.draw();
		tree.move();
	}

	boids[0].color = color(255, 0 , 0);
	for(let boid of boids){
		boid.flock(boids);
		boid.draw();
		boid.update(trees);

		boid.cohesionMultiplyer = cohesion;
		boid.alignMultiplyer = alignment;
		boid.separationMultiplyer = separation;
		boid.upMultiplyer = up;
	}
	console.log(boids[0].collisionAmount);
}

var init = function () {
	// stroke(50);
	camera(0, 0, 500, 0, 0, 0, 0, 1, 0);

	angleMode(DEGREES);
	// directionalLight(255, 255, 255, 255, 0, 0, 250);

	ambientLight(200);
	
}
