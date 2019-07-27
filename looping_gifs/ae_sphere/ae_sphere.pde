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

int total = 100;
int r = 200;
PVector[] sphere = new PVector[total*total];

PeasyCam cam;

NoiseLoop xNoise;
NoiseLoop yNoise;
NoiseLoop zNoise;

void setup() {
  size(1000, 1000, P3D);
  // pixelDensity(2);
  result = new int[width*height][3];
  colors = colorHarmony.Monochromatic();
  cam = new PeasyCam(this, 600);
 // cam.rotateX(45);
 // cam.rotateY(45);
  //cam.rotateZ(80);

  for (int i = 0; i < total; i++) {
    float lon = map(i, 0, total, -PI, PI);
    for (int j = 0; j < total; j++) {
      float lat = map(j, 0, total, -PI, PI);
      float x = r * sin(lat) * cos(lon);
      float y = r * sin(lat) * sin(lon);
      float z = r * cos(lat);
      sphere[total + i * j] = new PVector(x, y, z);
    }
  }

  xNoise = new NoiseLoop(.1, 0, 500);
  yNoise = new NoiseLoop(.1, 0, 500);
  zNoise = new NoiseLoop(.1, 0, 500);
}

void draw_() {
  background(50);
  stroke(255);
  strokeWeight(4);
  // float n = xNoise.value(t);
  for (int i = 0; i < total; i++) {
    float lon = map(i, 0, total, -PI, PI);
    for (int j = 0; j < total; j++) {

      //float r = 200 + n;
      float lat = map(j, 0, total, -PI, PI);
      float x = r * sin(lat) * cos(lon) ;
      float y = r * sin(lat) * sin(lon);
      float z = r * cos(lat);
      x = x + xNoise.value(t+i);
      //y = y + yNoise.value(t);
      //z = z + zNoise.value(t);

      point(x, y, z-20);
    }
  }
}
