import peasy.*;

import com.cage.colorharmony.*;

String timestamp() {
  int s = second();  // Values from 0 - 59
  int m = minute();  // Values from 0 - 59
  int h = hour();    // Values from 0 - 23

  return  "" + h + '_' + m + '_' + s;
}
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
    if (createSVG) {
      // Note that #### will be replaced with the frame number. Fancy!
      beginRecord(SVG, "svg/" + timestamp() + ".svg");
    }
    t = mouseX*1.0/width;
    c = mouseY*1.0/height;
    if (mousePressed)
      println(c, mouseX, mouseY);
    draw_();
    if (createSVG) {
      endRecord();
      createSVG = false;
    }
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

//public void settings() {
//  if (!recording) {
//    pixelDensity(displayDensity());
//  } else {
//    pixelDensity(1);
//  }
//}

//////////////////////////////////////////////////////////////////////
// use ffmpeg to generate gif from frames
// ffmpeg -f image2 -framerate 30 -i fr%3d.png name-of-gif.gif
int samplesPerFrame = 5;
int numFrames = 220;        
float shutterAngle = 0.5;

boolean recording = false;
boolean createSVG = false;

// CREATE A COLORHARMONY INSTANCE (DEFAULT CONSTRUCTOR)
ColorHarmony colorHarmony = new ColorHarmony(this);

// THE HARMONIZED PALETTE
color[] colors = new color[8];

Dots dots;
Dots secondDots;

int count = 11;
int margin = 0;
PVector[] positions = new PVector[count];


void setup() {

  size(1000, 1000);
  result = new int[width*height][3];
  colors = colorHarmony.Monochromatic();
  //for (int i = 0; i < count; i++) {
  //  positions[i] = new PVector(random(margin, width-margin), random(margin, height-margin));
  //}

  //dots = new Dots(positions, count);
  //secondDots = new Dots(positions, count);
  dots = new Dots(count);
  secondDots = new Dots(count);
  background(255);
}

void draw_() {
  background(255);

  //strokeWeight(6);
  noStroke();
  fill(0);
  dots.show();

  secondDots.rotation = t*TWO_PI;// map(sin(t*PI), -1, 1, 0, PI) ;
  //secondDots.rotation = t;

  //secondDots.translation.x = map(sin(t*TWO_PI), -1, 1, -30, 30);
  secondDots.show();
  
  ellipse(width/2, height/2, 10,10);

  //for (int i = 0; i < count; i++) {
  //  for (int j = 0; j < count; j++) {
  //   point(width/count *i, height/count *j);

  //  }
  //}
}
