import peasy.*;
import processing.svg.*;
import com.cage.colorharmony.*;


int[][] result;
float t, c;
OpenSimplexNoise OpenNoise;

void setupNoise() {
  OpenNoise = new OpenSimplexNoise();
}

float getNoiseValue(float x, float y, float diameter) {
  float seed = random(1000);
  float noiseVal = (float)OpenNoise.eval(seed + diameter*x, seed+ diameter*y);
  // println(noiseVal);
  return map(noiseVal, -1, 1, 0, 1);
}

String timestamp() {
  int s = second();  // Values from 0 - 59
  int m = minute();  // Values from 0 - 59
  int h = hour();    // Values from 0 - 23

  return  "" + h + '_' + m + '_' + s;
}


void keyPressed() {
  if (key == 'r') {
    println("" + timestamp() + ".svg saved");
    createSVG = true;
  }
}

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
  if (createSVG) {
    // Note that #### will be replaced with the frame number. Fancy!
    beginRecord(SVG, "svg/" + timestamp() + ".svg");
  }
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

  if (createSVG) {
    endRecord();
    createSVG = false;
  }
}

//////////////////////////////////////////////////////////////////////
// use ffmpeg to generate gif from frames
// ffmpeg -f image2 -framerate 30 -i fr%3d.png name-of-gif.gif
int samplesPerFrame = 5;
int numFrames = 120;        
float shutterAngle = 0.5;

boolean recording = false;
boolean createSVG = false;

// CREATE A COLORHARMONY INSTANCE (DEFAULT CONSTRUCTOR)
ColorHarmony colorHarmony = new ColorHarmony(this);

// THE HARMONIZED PALETTE
color[] colors = new color[8];

int count = 10;
Form[] forms = new Form[count*count];

void setup() {
  if (!recording) {
    pixelDensity(displayDensity());
  }
  size(1000, 1000, P3D);
  result = new int[width*height][3];
  colors = colorHarmony.Monochromatic();

  for (int x = 0; x < count; x++) {
    for (int y = 0; y < count; y++) {
      forms[x+y*count] = new Form(new PVector(width/count*x, height/count*y), 50);
    }
  }
}

void draw_() {
  background(colors[0]);
  for (Form f : forms) {
    f.show();
  }
}
