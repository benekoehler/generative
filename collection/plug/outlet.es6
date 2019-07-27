class Outlet {
  constructor(model) {
    this.pos = createVector(-400, 300);
    this.r = 200;
    this.model = model;
  }

  show(){
    push();
    ambientMaterial(255, 0, 120);
    noStroke();
    translate(this.pos.x, this.pos.y, -200);

    //ellipse(0,0,this.r, this.r);
    scale(1.3);
    rotateX(radians(90));
    rotateY(radians(90));
    model(this.model);
    pop();
  }  

  getPos() {
    return this.pos;
  }
 
}