class Dots {
  int count = 2000;
  float rotation = 0;
  PVector translation = new PVector(0, 0);
  PVector[] positions;

  Dots() {
    positions = new PVector[count];
    for (int i = 0; i < count; i++) {
      positions[i] = new PVector(random(margin, width-margin), random(margin, height-margin));
    }
  }

  Dots(int count) {
    this.count = count*count;
    this.positions = new PVector[this.count];
    // println(floor(sqrt(count))*  floor(sqrt(count)));
    for (int i = 0; i < count; i++) {
      for (int j = 0; j < count; j++) {
        positions[i+j*count] = new PVector(margin + (width-margin)/count*(i+1), margin+(height-margin)/count*(j+1));
      }
    }
  }

  Dots(PVector[] positions, int count) {
    this.positions = positions;
    this.count = count;
  }

  void show() {
    push();
    ellipseMode(RADIUS);
    translate(width/2, height/2);
    //translate(translation.x, translation.y);
    scale(0.9, 0.9);
    rotate(rotation);
    translate(-width/2, -height/2);

    for (int i = 0; i < positions.length; i++) {
      //ellipse(positions[i].x, positions[i].y,6,6);
      strokeWeight(5);
      stroke(0);
      point(positions[i].x, positions[i].y);
      //point(random(margin, width-margin), random(margin, height-margin));
    }
    pop();
  }
}
