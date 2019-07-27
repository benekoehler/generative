class NoiseLoop {
  float diameter;
  float min, max;
  float x,y;
  float cx, cy;
  NoiseLoop(float d, float min, float max){
    this.diameter = d;
    this.min = min;
    this.max = max;
    this.cx = random(1000);
    this.cy = random(1000);
  }
  
  float value(float a) {
    float xoff = map(cos(a*TWO_PI), 0, 1, cx, cx + diameter);
    float yoff = map(sin(a*TWO_PI), 0, 1, cy, cy + diameter);
    float r = noise(xoff, yoff);
    return map(r, 0, 1, min, max);
  }
}
