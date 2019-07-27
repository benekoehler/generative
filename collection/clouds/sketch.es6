
const Engine = Matter.Engine,
	World = Matter.World,
	Bodies = Matter.Bodies,
	Body = Matter.Body,
	Composites = Matter.Composites,
	Vertices = Matter.Vertices,
	Svg = Matter.Svg;

let engine;
let world;
let clouds = [];

let ground, celing;
let cloud;
let imgs = [];

function preload() {
	imgs.push(loadImage('assets/cloud1.png'));
	imgs.push(loadImage('assets/cloud2.png'));
	imgs.push(loadImage('assets/cloud3.png'));

}


function setup() {
	createCanvas(windowWidth, windowHeight);
	engine = Engine.create();
	world = engine.world;
	world.gravity.y = -1;

	let options = {
		isStatic: true
	}
	ground = Bodies.rectangle(width / 2, height, width, 10, options);
	celing = Bodies.rectangle(width / 2, 0, width, 10, options);
	World.add(world, [ground, celing]);

	cloud = new Cloud(random(width), random(height), 20);

}

function draw() {
	//background(255)
	clear();
	Engine.update(engine);
	cloud.show();
	cloud.update();
	clouds.forEach((c) => {
		c.show();
		c.update()
	})
}


function mousePressed() {
	clouds.push(new Cloud(random(width), random(height / 2, height), random(20, 50)));
}
