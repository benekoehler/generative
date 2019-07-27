class ParticleSystem {
  Particle[] particles = new Particle[20];

  NoiseLoop noise = new NoiseLoop(1, 0, 10);

  PVector target;


  ParticleSystem() {
    target = new PVector(width/2, height/2);
    println(target.x);
    for (int i = 0; i < particles.length; i++) {
      float x = target.x + 100*cos(map(i, 0, particles.length, 0, TWO_PI));
      float y = target.y + 100*sin(map(i, 0, particles.length, 0, TWO_PI));
      particles[i] = new Particle(x,y);
    }
  }

  void show() {
    beginShape();
    for (Particle p : particles) {
      vertex(p.pos.x, p.pos.y);
      p.show();
    }
    endShape();
  }

  void update() {
    for (Particle p : particles) {
      p.update(particles);
      float distToTarget = dist(p.pos.x, p.pos.y, target.x, target.y);
      //PVector force = PVector.sub(target, p.pos);
      ////println(target.x);
      ////line(p.pos.x, p.pos.y, target.x, target.y);
      //force.limit(map(distToTarget, 0, width/2, 0, 0.1));

      //if (distToTarget > 100){
      //  p.addForce(force);
      //} else {
      //  p.addForce(force.mult(-1));
      //}
    }
  }
}
