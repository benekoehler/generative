class Plug {
  constructor(model) {
    this.pos = createVector(200,0);
    this.z = 0;
    this.r = 200;
    this.hover = false;
    this.rotationZ = 90;
    this.rotationX = 0;
    this.distFromOutlet = 1000;
    this.plugged = false;
    this.model = model;
  }

  show() {
    push();
    //noStroke();
    stroke(255);
    strokeWeight(5);
    translate(this.pos.x,this.pos.y, this.z);
    rotateZ(radians(90));
    rotateZ(this.rotationZ);
    rotateX(radians(this.rotationX));
    rotateX(radians(180));

    model(this.model);
    this.cable()

 
    //ellipse(0,0,this.r,this.r);
    pop();
  }

  update(outletPos) {
    this.hover = this.checkClick();
    this.rotationZ = Math.atan2(this.pos.y - outletPos.y, this.pos.x - outletPos.x);

    this.distFromOutlet = dist(this.pos.x, this.pos.y, outletPos.x, outletPos.y);
    this.rotationX = map(this.distFromOutlet, 0, width+100, -80, 0, true);

    if(this.distFromOutlet<50){
      this.plugged = true;
    }
    if(this.plugged) {
      this.pos = outletPos;
      this.z = lerp(this.z, -100, 0.1);

    }
  }

  updatePos() {

    if(this.checkClick() && !this.plugged) {
      this.pos.x = mouseX-width/2;
      this.pos.y = mouseY-height/2;
    }
  }

  checkClick(){
    return dist(mouseX-width/2, mouseY-height/2, this.pos.x, this.pos.y) < this.r;
  }

  getPos() {
    return this.pos;
  }
 
  cable() {
    push();
    line(this.pos.x-width/2, this.pos.y-height/2, width, this.pos.y);
    pop();
  }

}