class Particle {
  PVector pos = new PVector(0, 0, 0);
  float lat, lon;
  float r;

  NoiseLoop lonNoise, latNoise;

  ArrayList<PVector> history = new ArrayList<PVector>();

  Particle() {
    lonNoise = new NoiseLoop(0.1, -PI, PI);
    latNoise = new NoiseLoop(0.1, -PI, PI);
    r = 200;
    history.add(new PVector(0,0,0));
  }

  void update() {
    lat = lonNoise.value(t);
    lon = latNoise.value(t);
    pos.x = r * sin(lat) * cos(lon) ;
    pos.y = r * sin(lat) * sin(lon);
    pos.z = r * cos(lat);
         history.add(pos);
    
 
    if (history.size() > 100) {
      history.remove(0);
    }
  
  }

  void show() {
    push();
    stroke(255);
    strokeWeight(2);
    for (PVector p : history) {
      point(p.x, p.y, p.z);
    } 
    
    stroke(255);
    strokeWeight(4);
    //point(pos.x, pos.y, pos.z);
    pop();
  }
}
