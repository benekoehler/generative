class Tree {
  constructor(x, y, rotation, scale) {
    this.position = createVector(x,y);
    this.rotation = rotation || random(0, 360);
    this.scale = scale || random(0.5, 1);
    // this.draw = this.draw.bind(this);
  }

  draw () {
    push();
    translate(this.position.x, this.position.y, 0);
    scale(this.scale);
    rotateX(90);
    ambientMaterial(120,200,120);
    cone(50, 300);
    pop();
  };

  move () {
    this.position.add(0, 2);
    if(this.position.y >= height/4) {
      this.position.y = -height/4;
      this.position.x = random(-width/4, width/4);
    }
  }
}