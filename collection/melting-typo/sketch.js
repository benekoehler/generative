'use strict';

var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

var engine = void 0;
var world = void 0;
var boxes = [];

var ground = void 0;
var radius = void 0;

var composite = void 0;

var type = 'cooldown°earth supports ideas against the affects of climate change on people and nature — before it’s to late.';

var akkuratFont = void 0;
function preload() {
  akkuratFont = loadFont('assets/AkkuratMonoStd.otf');
}

function setup() {
  // put setup code here.
  createCanvas(900, 900);
  engine = Engine.create();
  world = engine.world;
  //world.gravity = {x: 0, y: 0.1};
  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      boxes.push(new Box(50 + i * 45, 50 + j * 45, 40, 40, type.charAt(10 * j + i)));
    }
  }
  //boxes.push(new Box(width/2, height/2, 80,80));

  //composite = new Composite({x:width/2, y:height/2}, 100);


  var options = {
    isStatic: true
  };
  ground = Bodies.rectangle(200, height, width, 10, options);
  World.add(world, ground);
  //Engine.run(engine);
}

function draw() {
  Engine.update(engine);
  //background(255,);
  //clear();
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].update();
    boxes[i].show();
    //boxes[i].scale = map(radius, 0, width, 1, 3);
  }

  // composite.update();
  // composite.show();

  // push();
  // radius = dist(width/2, height/2, mouseX, mouseY);
  // radius *= 2;
  // fill(255, 120);
  // noStroke();
  // ellipse(width/2, height/2, radius,radius);
  // pop();
}

function mousePressed() {
  boxes.push(new Box(mouseX, mouseY, 40, 40));
}