class Particle {
  PVector pos;
  NoiseLoop xNoise;
  NoiseLoop yNoise;
  int margin;
  
  NoiseLoop externNoise;

  Particle() {
    margin = 0;
    xNoise = new NoiseLoop(0.1, margin, width-margin);
    yNoise = new NoiseLoop(0.1, margin, height-margin);

    pos = new PVector(xNoise.value(0), yNoise.value(0));
  }

  Particle(float r, float sx, float sy) {
    xNoise = new NoiseLoop(r, sx, sy);
    yNoise = new NoiseLoop(r, sx, sy);
    pos = new PVector(xNoise.value(0), yNoise.value(0));
  }

  void update() {
    pos.x = xNoise.value(t);
    pos.y = yNoise.value(t);
  }

  void show() {
    point(pos.x, pos.y);
  }
}
