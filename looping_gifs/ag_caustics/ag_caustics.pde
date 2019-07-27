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

NoiseLoop noise;

float increment = 0.01;
void setup() {
  size(500, 500, P3D);
  result = new int[width*height][3];
  colors = colorHarmony.Monochromatic();

  noise = new NoiseLoop(1, 0, 1);


  //noLoop();
}

void draw_() {
  //background(0);
  loadPixels();
  float xoff = 0.0;

  for (int x = 0; x < width; x++) {
    xoff += increment;
    float yoff = 0.0;
    for (int y = 0; y < height; y++) {
      yoff += increment;
      //float yValue = xnoise.value(t);
      int index = width * x + y;
      //println(index);

      float value = noise.value4D(xoff,yoff,t);
      value = value % 0.55;
      color c = value >= 0.5 ? color(0) : color(255);
      //println(value);
      pixels[index] = c;
    }
  }
  updatePixels();
}
