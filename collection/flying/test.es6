class test {
  constructor(x, y, rotation, scale) {
    this.pos = createVector(x,y);
    this.rotation = rotation || random(0, 360);
    this.scale = scale || random(0.5, 1);

    // this.draw = this.draw.bind(this);
  }

  draw () {
    push();
    translate(this.pos.x, this.pos.y, 0);
    scale(this.scale);
    rotateX(90);
    cone(50, 300);
    pop();
  };

  move () {
    this.pos.add(0, 2);
    if(this.pos.y >= height/2) {
      this.pos.y = -height/2;
      this.pos.x = random(-width/2, width/2);
    }
  }
}