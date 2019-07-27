class Blob {
  Particle[] particles;

  Blob() {
    particles = new Particle[30];
    for (int i = 0; i < particles.length; i++) {
      particles[i] = new Particle();
    }
  }

  void show() {
    beginShape();
    for (int i = 0; i < particles.length; i++) {
      vertex(particles[i].pos.x, particles[i].pos.y);
    }
    endShape(CLOSE);
    
    
    //beginShape();
    //for (int i = 0; i < particles.length-3; i += 3) {
    //  vertex(particles[i].pos.x, particles[i].pos.y);
    //  bezierVertex(particles[i+1].pos.x, particles[i+1].pos.y, particles[i+2].pos.x, particles[i+2].pos.y, particles[i+3].pos.x, particles[i+3].pos.y);
    //}
    //endShape(CLOSE);


    //for (int i = 0; i < particles.length; i += 4) {
    //  bezier(particles[i].pos.x, particles[i].pos.y, particles[i+1].pos.x, particles[i+1].pos.y, particles[i+2].pos.x, particles[i+2].pos.y, particles[i+3].pos.x, particles[i+3].pos.y);
    //}
  }

  void update() {
    for (int i = 0; i < particles.length; i++) {
      particles[i].update();
    }
  }
}
