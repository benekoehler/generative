class Cloud {
  constructor(x, y, radius, isComposite = false) {
    this.pos = {
      x,
      y
    };
    this.r = radius;
    this.angle = 0;
    this.body = Bodies.circle(this.pos.x, this.pos.y, this.r);
    //console.log(this.body);
    this.body.frictionAir = random(0, 0.5);
    if (!isComposite) {
      World.add(world, this.body);
    }

    this.imgIndex = Math.floor(random(imgs.length));
    console.log(this.imgIndex)

  }

  update() {

    this.angle = this.body.angle;
    this.pos = this.body.position;

  }

  show() {
    push();
    noStroke();
    fill(120);
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    rectMode(CENTER);

    push();
    scale(this.r / 100);
    translate(-imgs[this.imgIndex].width / 2, -imgs[this.imgIndex].height / 2)
    image(imgs[this.imgIndex], 0, 0);
    pop();
    //ellipse(0,0, this.r*2, this.r*2);
    pop();
  }


}