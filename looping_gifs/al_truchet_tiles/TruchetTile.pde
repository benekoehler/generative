class TruchetTile {
  PVector pos;
  float angle;
  float size;
  boolean split = false;
  boolean inverse = false;
  int level = 1;
  int maxLevel = 3;
  TruchetTile[] splitted = new TruchetTile[4];
  float[] rotation = new float[2];

  int tileNumber = 0;

  TruchetTile() {
    pos = new PVector(width/2, height/2);
    size =  width/10;
  }
  TruchetTile(PVector pos, float angle) {
    this.pos = pos;
    this.size =  width/10;
    this.angle = angle;
    rotation[0] = HALF_PI;
    rotation[1] = PI;
  }
  TruchetTile(PVector pos, float size, float angle) {
    this.pos = pos;
    this.size = size;
    this.angle = angle;
    rotation[0] = HALF_PI;
    rotation[1] = PI;
    tileNumber = getRandomInt(0, 6);
  }

  boolean setupTile(float random, float[] rotation) {
    float half = size/2;

    if (random <= 0.4 && level <= maxLevel) {
      splitted[0] = new TruchetTile(new PVector(-size/4, -size/4), half, rotation[getRandomInt(0, 2)]);
      splitted[2] = new TruchetTile(new PVector(-size/4, +size/4), half, rotation[getRandomInt(0, 2)]);
      splitted[1] = new TruchetTile(new PVector(+size/4, +size/4), half, rotation[getRandomInt(0, 2)]);
      splitted[3] = new TruchetTile(new PVector(+size/4, -size/4), half, rotation[getRandomInt(0, 2)]);

      for (int i = 0; i < splitted.length; i++) {
        //splitted[i].setupTile(random(1), rotation);

        splitted[i].inverse = level % 2 == 1;
        splitted[i].addLevel();
      }
      split = true;
    } else {
      split = false;
    }

    return split;
  }


  void addLevel() {
    if (level <= maxLevel) {
      level++;
    }
  }


  void update() {
    if (onHover()) {
      setupTile(0.4, rotation);
    } else {
      setupTile(0.6, rotation);
    }
  }


  void show() {    
    push();
    noStroke();
    translate(pos.x, pos.y);
    rotate(angle);

    if (!split) {
      switch(tileNumber) {
      case 0:
        drawSlash();
        break;
      case 1:
        drawMinus();
        break;
      case 2:
        drawPlusDot();
        break;
      case 3:
        drawPlus();
        break;
      case 4:
        drawCross();
        break;
      case 5:
        drawFne();
        break;
      case 6:
        drawFsw();
        break;
      }
    } else {
      for (int i = 0; i < splitted.length; i ++) {
        splitted[i].show();
      }
    }
    debug(false);
    pop();
  }

  void debug(Boolean debug) {
    if (debug) {
      push();
      stroke(255, 0, 0);
      noFill();
      rect(-size/2, -size/2, size, size);
      pop();
    }
  }

  void drawSlash() {
    push();      
    if (inverse) {
      fill(0);
    } else {
      fill(255);
    }
    rect(-size/2, -size/2, size, size);
    // arc(-size.x/2, -size.y/2, size.copy().mult(0.66).x, size.copy().mult(0.66).y, 0, HALF_PI );
    if (inverse) {
      fill(255);
    } else {
      fill(0);
    }
    //  arc(-size/2, -size/2, size * 1.33333, size * 1.33333, 0, HALF_PI );
    // arc(+size/2, +size/2, size * 1.33333, size * 1.33333, PI, PI + HALF_PI);

    donut(-size/2, -size/2, size/3, (size/3)*2, 0, HALF_PI, 21, true);
    donut(size/2, size/2, size/3, (size/3)*2, PI, PI+HALF_PI, 21, true);
    noStroke();



    if (inverse) {
      fill(0);
    } else {
      fill(255);
    }
    ellipse(-size/2, -size/2, size * 0.66666, size * 0.66666);
    ellipse(size/2, size/2, size * 0.66666, size * 0.66666);
    ellipse(-size/2, size/2, size * 0.66666, size * 0.66666);
    ellipse(size/2, -size/2, size * 0.66666, size * 0.66666);
    pop();
  }

  void drawMinus() {
    push();
    noStroke();
    if (inverse) {
      fill(0);
    } else {
      fill(255);
    }
    rect(-size/2, -size/2, size, size);

    ellipse(-size/2, -size/2, size * 0.66666, size * 0.66666);
    ellipse(size/2, size/2, size * 0.66666, size * 0.66666);
    ellipse(-size/2, size/2, size * 0.66666, size * 0.66666);
    ellipse(size/2, -size/2, size * 0.66666, size * 0.66666);

    if (inverse) {
      fill(255);
    } else {
      fill(0);
    }
    lineForm(-size/2, 0, size/2, 0, size/6);

    ellipse(0, -size/2, size/3, size/3);
    ellipse(0, size/2, size/3, size/3);
    pop();
  }

  void drawPlusDot() {
    push();
    noStroke();
    if (inverse) {
      fill(0);
    } else {
      fill(255);
    }
    rect(-size/2, -size/2, size, size);

    ellipse(-size/2, -size/2, size * 0.66666, size * 0.66666);
    ellipse(size/2, size/2, size * 0.66666, size * 0.66666);
    ellipse(-size/2, size/2, size * 0.66666, size * 0.66666);
    ellipse(size/2, -size/2, size * 0.66666, size * 0.66666);
    if (inverse) {
      fill(255);
    } else {
      fill(0);
    }
    ellipse(-size/2, 0, size/3, size/3);
    ellipse(size/2, 0, size/3, size/3);
    ellipse(0, -size/2, size/3, size/3);
    ellipse(0, size/2, size/3, size/3);
    pop();
  }

  void drawPlus() {
    push();
    noStroke();
    if (inverse) {
      fill(0);
    } else {
      fill(255);
    }
    rect(-size/2, -size/2, size, size);

    ellipse(-size/2, -size/2, size * 0.66666, size * 0.66666);
    ellipse(size/2, size/2, size * 0.66666, size * 0.66666);
    ellipse(-size/2, size/2, size * 0.66666, size * 0.66666);
    ellipse(size/2, -size/2, size * 0.66666, size * 0.66666);
    if (inverse) {
      fill(255);
    } else {
      fill(0);
    }
    lineForm(-size/2, 0, size/2, 0, size/6);
    lineForm(0, -size/2, 0, size/2, size/6);
    pop();
  }

  void drawCross() {
    push();
    noStroke();
    if (inverse) {
      fill(255);
    } else {
      fill(0);
    }
    rect(-size/2, -size/2, size, size);
    if (inverse) {
      fill(0);
    } else {
      fill(255);
    }
    ellipse(-size/2, -size/2, size * 0.66666, size * 0.66666);
    ellipse(size/2, size/2, size * 0.66666, size * 0.66666);
    ellipse(-size/2, size/2, size * 0.66666, size * 0.66666);
    ellipse(size/2, -size/2, size * 0.66666, size * 0.66666);
    if (inverse) {
      fill(255);
    } else {
      fill(0);
    }
    lineForm(-size/2, 0, size/2, 0, size/6);
    lineForm(0, -size/2, 0, size/2, size/6);
    pop();
  }

  void drawFne() {
    push();
    if (inverse) {
      fill(0);
    } else {
      fill(255);
    }
    rect(-size/2, -size/2, size, size);
    ellipse(-size/2, -size/2, size * 0.66666, size * 0.66666);
    ellipse(size/2, size/2, size * 0.66666, size * 0.66666);
    ellipse(-size/2, size/2, size * 0.66666, size * 0.66666);
    ellipse(size/2, -size/2, size * 0.66666, size * 0.66666);
    if (!inverse) {
      fill(0);
    } else {
      fill(255);
    }

    ellipse(-size/2, 0, size/3, size/3);
    ellipse(0, size/2, size/3, size/3);
    donut(size/2, -size/2, size/3, (size/3)*2, HALF_PI, PI, 21, true);

    pop();
  }

  void drawFsw() {
    push();
    if (inverse) {
      fill(0);
    } else {
      fill(255);
    }
    rect(-size/2, -size/2, size, size);
    ellipse(-size/2, -size/2, size * 0.66666, size * 0.66666);
    ellipse(size/2, size/2, size * 0.66666, size * 0.66666);
    ellipse(-size/2, size/2, size * 0.66666, size * 0.66666);
    ellipse(size/2, -size/2, size * 0.66666, size * 0.66666);
    if (!inverse) {
      fill(0);
    } else {
      fill(255);
    }

    ellipse(0, -size/2, size/3, size/3);
    ellipse(size/2, 0, size/3, size/3);
    donut(-size/2, size/2, size/3, (size/3)*2, PI + HALF_PI, TWO_PI, 21, true);

    pop();
  }
  boolean onHover() {
    return mouseX > pos.x -size/2 && mouseX < pos.x + size/2 && mouseY > pos.y -size/2 && mouseY < pos.y + size/2;
  }
}
