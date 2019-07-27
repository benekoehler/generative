class Cloud {
  constructor() {
    this.pos ={x: 250, y: 100 };
    this.columns = 10;
    this.rows = 10;

    this.particleSize = 5;
    this.particleOptions = { 
      friction: 0.05,
      frictionStatic: 0.1
    };
    this.composite = Composites.softBody(this.pos.x, this.pos.y, this.columns, this.rows, 0, 0, true, this.particleSize, this.particleOptions),
    console.log(this.composite)
    World.add(world, this.composite);
    this.id = this.composite.id;

    this.offset =[]
    for(let i = 0; i < this.composite.bodies.length; i++) {
      //this.offset.push({x: random(10), y: random(10)})
      this.particlesSize *= random(0.5, 2);
      this.composite.bodies[i].circleRadius = this.particleSize;
    }
  }

  update() {
    const { bodies } = this.composite; 
    // for(let i = 0; i < bodies.length; i++) {
    //   bodies[i].position.x += this.offset[i].x
    // }

  }

  show() {
    push();
    const { bodies } = this.composite; 
    noStroke();
    fill(255, 0,0);
    beginShape(TRIANGLE_STRIP);
    for(let i = 0; i < this.columns-1; i++){
      for(let j = 0; j < this.rows; j++){
        let index = this.columns * i + j;
        vertex(bodies[index].position.x,bodies[index].position.y);
        let secindex = this.columns * (i+1) + j;
        vertex(bodies[secindex].position.x,bodies[secindex].position.y);
      }
    }
    endShape();

    // for(let i = 0; i < bodies.length; i++) {
    //   ellipse(bodies[i].position.x,bodies[i].position.y, this.particleSize *2, this.particleSize *2);

    // }
    pop();
  }


}