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

    saveFrame("fr###.png");
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
int numFrames = 200;        
float shutterAngle = 0.5;

boolean recording = false;

// CREATE A COLORHARMONY INSTANCE (DEFAULT CONSTRUCTOR)
ColorHarmony colorHarmony = new ColorHarmony(this);

// THE HARMONIZED PALETTE
color[] colors = new color[8];

PeasyCam cam;

NoiseLoop xNoise;
NoiseLoop yNoise;
NoiseLoop zNoise;

int m = 1000;
float delay_factor = 2.0;


void setup() {
  size(1000, 1000, P3D);
  // pixelDensity(2);
  result = new int[width*height][3];
  colors = colorHarmony.Monochromatic();
  //cam = new PeasyCam(this, 600);
  xNoise = new NoiseLoop(.5, 0, 100);
  yNoise = new NoiseLoop(.5, 0, 100);
  
}

void draw_() {
  //noLoop();
  background(50);
  fill(255);
  ellipse(x1(t), y1(t), 6, 6);
  ellipse(x2(t), y2(t), 6, 6);
  push();
  strokeWeight(2);
  stroke(255, 100);
  for (int i=0; i<=m; i++) {
    float tt = 1.0*i/m;

    float x = lerp(x1(t - delay_factor*tt), x2(t - delay_factor*(1-tt)), tt);
    float y = lerp(y1(t - delay_factor*tt), y2(t - delay_factor*(1-tt)), tt);

    point(x, y);
  }
  pop();
}
  
float motion_radius = 0.5;
float x1(float t){
  return 0.25*width + xNoise.value(t);
}
float y1(float t){
  return 0.5*height + yNoise.value(t);
}

float x2(float t) {
  return 0.75*width + 50*cos(2*TWO_PI*t);
}
float y2(float t) {
  return 0.5*height + 50*sin(2*TWO_PI*t);
}
