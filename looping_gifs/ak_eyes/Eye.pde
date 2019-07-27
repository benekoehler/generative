class Eye {
  PVector pos;
  PVector size;
  color c;

  PGraphics mask;
  PGraphics eyeBall;

  PVector eyeBallPos;

  NoiseLoop eyeNoiseX;
  NoiseLoop eyeNoiseY;

  boolean left;

  Eye(PVector _pos, boolean _left, NoiseLoop xNoise, NoiseLoop yNoise) {
    left = _left;
    pos = _pos;
    size = new PVector(300, 0);
    c = #4CB1E3;
    mask = createGraphics(width, height);
    eyeBall = createGraphics(width, height);
    eyeNoiseX = xNoise;
    eyeNoiseY = yNoise;
    eyeBallPos = new PVector(eyeNoiseX.value(0), eyeNoiseY.value(0));
  }

  void update() {
    if (t<0.25) {
      size.y = sin(t * PI)*(size.x * 0.9);
    } else if (t>0.75) {
      size.y = sin(t * PI)*(size.x * 0.9);
    }
    if (left) {
      eyeBallPos.x = eyeNoiseX.value(t);
    } else {
      eyeBallPos.x = -eyeNoiseX.value(t);
    }

    eyeBallPos.y = eyeNoiseY.value(t);
  }
  void show() {
    eyeBall.beginDraw();
    eyeBall.background(colors[7]);
    eyeBall.pushMatrix();
    eyeBall.translate(pos.x, pos.y);
    eyeBall.noStroke();
    eyeBall.fill(255);
    eyeBall.ellipse(eyeBallPos.x, eyeBallPos.y, 100, 100);
    eyeBall.fill(0);
    eyeBall.ellipse(eyeBallPos.x, eyeBallPos.y, 50, 50);
    eyeBall.popMatrix();
    eyeBall.endDraw();

    createMask();
    eyeBall.mask(mask);

    push();
    if (left) {
      image(eyeBall, 0, 0);
    } else {
      push();
      translate(width, 0);
      scale(-1, 1);

      image(eyeBall, 0, 0);
      pop();
    }


    pop();
  }

  void createMask() {
    mask.beginDraw();
    mask.background(0);
    mask.noStroke();
    mask.translate(pos.x, pos.y);
    mask.beginShape();
    mask.vertex(-size.x*0.5, 0);
    mask.bezierVertex(-size.x*0.25, size.y*0.35, size.x*0.1, size.y*0.35, size.x*0.5, 0);
    mask.bezierVertex(size.x*0.25, -size.y*0.45, -size.x*0.1, -size.y*0.45, -size.x*0.5, 0);

    mask.endShape();
    mask.endDraw();
  }
}
