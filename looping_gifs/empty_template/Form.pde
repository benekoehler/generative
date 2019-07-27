class Form {
  PVector pos;
  int r;
  Form(PVector pos, int r){
    this.pos = pos;
    this.r = r;
  }
  
  void show() {
    ellipse(pos.x, pos.y, r, r);
  }
}
