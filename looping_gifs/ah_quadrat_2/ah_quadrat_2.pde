import peasy.*;

import com.cage.colorharmony.*;


int[][] result;
float t, c;

float ease(float p) {
  return 3*p*p - 2*p*p*p;
}

float ease(float p, float g) {
  if (p < 0.5) 
    return 0.5 * pow(2*p, g);
  else
    return 1 - 0.5 * pow(2*(1 - p), g);
}

float mn = .5*sqrt(3), ia = atan(sqrt(.5));

void push() {
  pushMatrix();
  pushStyle();
}

void pop() {
  popStyle();
  popMatrix();
}

void draw() {

  if (!recording) {
    t = mouseX*1.0/width;
    c = mouseY*1.0/height;
    if (mousePressed)
      println(c);
    draw_();
  } else {
    for (int i=0; i<width*height; i++) {
      for (int a=0; a<3; a++) {
        result[i][a] = 0;
      }
    }

    c = 0;
    for (int sa=0; sa<samplesPerFrame; sa++) {
      t = map(frameCount-1 + sa*shutterAngle/samplesPerFrame, 0, numFrames, 0, 1);
      draw_();
      loadPixels();
      for (int i=0; i<pixels.length; i++) {
        result[i][0] += pixels[i] >> 16 & 0xff;
        result[i][1] += pixels[i] >> 8 & 0xff;
        result[i][2] += pixels[i] & 0xff;
      }
    }

    loadPixels();
    for (int i=0; i<pixels.length; i++) {
      pixels[i] = 0xff << 24 | 
        int(result[i][0]*1.0/samplesPerFrame) << 16 | 
        int(result[i][1]*1.0/samplesPerFrame) << 8 | 
        int(result[i][2]*1.0/samplesPerFrame);
    }
    updatePixels();

    saveFrame("frames/fr###.png");
    println(frameCount, "/", numFrames);
    if (frameCount==numFrames) {
      exit();
    }
  }
}

//////////////////////////////////////////////////////////////////////
// use ffmpeg to generate gif from frames
// ffmpeg -f image2 -framerate 30 -i fr%3d.png name-of-gif.gif
int samplesPerFrame = 5;
int numFrames = 120;        
float shutterAngle = 0.5;

boolean recording = false;

// CREATE A COLORHARMONY INSTANCE (DEFAULT CONSTRUCTOR)
ColorHarmony colorHarmony = new ColorHarmony(this);

// THE HARMONIZED PALETTE
color[] colors = new color[8];

PeasyCam cam;

float margin = 100;
int count = 10;
float size;
float offsetX;
float offsetY;
NoiseLoop scaleNoise;
NoiseLoop xNoise;
NoiseLoop yNoise;

int circleIndex;
PVector anchor;

boolean[] white = new boolean[count*count];

void setup() {
  size(1000, 1000, P3D);
  result = new int[width*height][3];
  colors = colorHarmony.Monochromatic();
  rectMode(CENTER);
  noStroke();
  size = (width-margin)/count - 50;
  offsetX= (width-margin) / count;
  offsetY = (height-margin) / count;
  scaleNoise = new NoiseLoop(1, 0.01, 1.1);
  xNoise = new NoiseLoop(0.5, 0.01, 0.9); 
  yNoise = new NoiseLoop(0.5, 0.01, 0.9);
  circleIndex = (int)random(count*count);

  for (int x = 0; x < count; x++) {
    for (int y = 0; y < count; y++) {
      if (count * x+y == circleIndex) {
        anchor = new PVector(margin+(offsetX*x), margin+(offsetY*y));
      }
      white[count*x+y] = random(1) < 0.5 ? true : false;
    }
  }
}

void draw_() {
  push();
  background(colors[1]);
  //strokeWeight(4);
  //stroke(50, 120);
  translate(anchor.x, anchor.y);
  rotate(sin(TWO_PI * t));
  for (int x = 0; x < count; x++) {
    for (int y = 0; y < count; y++) {
      //point(margin+(offsetX*x),margin+(offsetY*y));
      push();
      translate(-anchor.x, -anchor.y);
      translate(margin+(offsetX*x), margin+(offsetY*y));
      scale(xNoise.value(sin(TWO_PI * t+x))+xNoise.value(sin(TWO_PI * t+y)));
      //rotate(-sin(TWO_PI * t));
      if (count * x + y == circleIndex) {
        push();
        noFill();
        stroke(255);
        strokeWeight(size/2);
        ellipse(0, 0, size, size);
        pop();
      } else {
        push();
        if (white[count*x+y]) {
          fill(colors[4]);
        } else {
          fill(255);
        }
        rect(0, 0, size, size);
        pop();
      }

      pop();
    }
  }
  pop();
  //margin = 100 + 100 * cos(TWO_PI*t);
}
