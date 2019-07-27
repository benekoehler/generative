
class Thing {
  PVector pos;
  float r = random(0, PI);
  PVector size = new PVector(random(5, 200), random(5, 200));
  color c = colors[(int)random(8)];
  float multiplyerX = random(0, 1);
  float multiplyerY = random(0, 1);
  float z = random(1, 60);
  float offsetX;
  float offsetY;
  
  Thing(PVector _pos) {
    pos = _pos;
  }
  
  Thing(PVector _pos, float _r) {
    pos = _pos;
    r = _r;
  }

  void show() {
    push();
      translate(50, 0);
      fill(c);
      //strokeWeight(10);
      noStroke();
      offsetX = sin(t*TWO_PI) * 100 * multiplyerX;
      offsetY = cos(t*TWO_PI) * 100 * multiplyerY;
      push();
        translate(pos.x, pos.y);
        rotate(PI/4);
        scale(map(dist(pos.x, pos.y, width/2, height/2), 0, width/2, 2, 0));
        rotate(map(dist(pos.x, pos.y, width/2 + width/2*cos((TWO_PI)*t), height/2 + height/2*sin((TWO_PI)*t)), 0, width/2, 0, PI));
        rectMode(CENTER);
        box(size.x, size.y, z);
      pop();
    pop();
  }
}
