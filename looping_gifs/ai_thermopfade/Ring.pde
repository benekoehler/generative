class Ring {
  PVector center;
  float res;
  float r;
  PVector offset;
  NoiseLoop noise;

  Ring(PVector c, float _r, NoiseLoop _noise) {
    center = c;
    res = 50;
    r = _r;
    noise = _noise;
    offset = new PVector(0,0);
  }

  void show() {
    push();
    noFill();
    beginShape();
    for (float i = 0; i < TWO_PI; i += TWO_PI/res) {
      
      float x = center.x + (r+offset.x)*cos(i);
      float y = center.y + (r+offset.x)*sin(i);
      //updateOffset(x,y, i);
      vertex(x, y);
      //point(x,y);
    }
    endShape(CLOSE);
    pop();
  }
  
  void updateOffset(float x, float y, float a) {
    offset.x = noise.value3D(map(a,0,TWO_PI, 0, 1.5 ),t);
  }
}
