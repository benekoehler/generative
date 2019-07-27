class Particle {
  PVector pos;
  PVector speed;
  PVector acc;
  PVector origin;

  Particle() {
    pos = new PVector(random(width), random(height));
    speed = PVector.random2D();
    acc = new PVector(0, 0);
  }

  Particle(float x, float y) {
    pos = new PVector(x, y);
    speed = PVector.random2D();
    acc = new PVector(0, 0);
    origin = pos;
  }

  void show() {
    push();
    strokeWeight(3);
    point(pos.x, pos.y);
    pop();
  }

  void addForce(PVector force) {
    acc.setMag(0);
    acc = force;
  }
  
  void calcOffset(NoiseLoop noise) {
    
  }

  void update(Particle[] particles) {
    speed.add(acc);
    pos.add(speed);
    checkBorders();
    speed.limit(2);
    
    PVector force = PVector.sub(origin, pos);
    force.limit(1);
    addForce(force.mult(-1));
  }

  void checkBorders() {
    if (pos.x >= width) {
      pos.x = 0;
    } else if (pos.x <= 0) {
      pos.x = width;
    }

    if (pos.y >= height) {
      pos.y = 0;
    } else if (pos.y <= 0) {
      pos.y = height;
    }
  }
}
