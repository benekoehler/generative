import peasy.*;

import com.cage.colorharmony.*;
import processing.svg.*;

int[][] result;
float t, c;
OpenSimplexNoise OpenNoise;
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

String timestamp() {
  int s = second();  // Values from 0 - 59
  int m = minute();  // Values from 0 - 59
  int h = hour();    // Values from 0 - 23

  return  "" + h + '_' + m + '_' + s;
}



void lineForm(float x1, float y1, float x2, float y2, float thickness) {
  float dX = x2-x1;
  float dY = y2-y1;
  float rad = atan2(dY, dX);

  beginShape();
  for (float i = rad*2+PI; i<= (rad*2+TWO_PI)+PI; i += PI/15) {
    vertex(x1 + thickness * cos(i*0.5), y1 + thickness*sin(i*0.5));
  }

  for (float i = rad*2-PI; i<= (rad*2+TWO_PI)-PI; i += PI/15) {
    vertex(x2 + thickness * cos(i*0.5), y2 + thickness*sin(i*0.5));
  }
  endShape(CLOSE);
}

void donut(float posx, float posy, float innerRadius, float outerRadius, float start, float stop, int resolution, boolean roundCaps) {
  push();
  float thickness = (outerRadius-innerRadius)/2;
  float centerX = 0, centerY = 0;
  float step = PI/resolution;
  //ellipse(posx, posy, 5,5);
  translate(posx, posy);
  beginShape();
  float x = 0, y = 0;
  // -------------START-CAPS----------------------------
  if (roundCaps) {
    centerX= (outerRadius-thickness) * cos(start);
    centerY = (outerRadius-thickness) * sin(start);
    for (float i = start*2-TWO_PI; i <= (TWO_PI+start*2)-TWO_PI; i += step*5) {
      vertex(centerX + thickness * cos(i * 0.5), centerY + thickness * sin(i * 0.5));
    }
  }
  // ---------------------------------------------------



  for (float i = start; i <= stop; i += step) {
    x = outerRadius * cos(i);
    y = outerRadius * sin(i);
    vertex(x, y);
  }


  // -------------END-CAPS----------------------------
  if (roundCaps) {
    centerX = (outerRadius-thickness) * cos(stop);
    centerY = (outerRadius-thickness) * sin(stop);

    for (float i = stop*2; i <= TWO_PI+(stop*2); i += step*5) {
      vertex(centerX + thickness * cos(i * 0.5), centerY + thickness * sin(i * 0.5));
    }
  }
  // ---------------------------------------------------


  for (float i = stop; i >= start; i -= step) {
    x = innerRadius * cos(i);
    y = innerRadius * sin(i);
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

int getRandomInt(int min, int max) {
  return floor(random(min, max));
}

void keyPressed() {
  if (key == 'r') {
    println("" + timestamp() + ".svg saved");
    createSVG = true;
  }
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
boolean createSVG = false;

// CREATE A COLORHARMONY INSTANCE (DEFAULT CONSTRUCTOR)
ColorHarmony colorHarmony = new ColorHarmony(this);

// THE HARMONIZED PALETTE
color[] colors = new color[8];

int resolution = 10;
TruchetTile[][] tiles;
float[] rotation = new float[2];
boolean[][] splitted = new boolean[resolution][resolution];

void setup() {
  if (!recording) {
    pixelDensity(displayDensity());
  }

  setupNoise();
  size(600, 600);
  result = new int[width*height][3];
  colors = colorHarmony.Monochromatic();


  tiles = new TruchetTile[resolution][resolution];
  rotation[0] = HALF_PI;
  rotation[1] = PI;
  float size = width/tiles.length;

  for (int x = 0; x < tiles.length-1; x++) {
    for (int y = 0; y < tiles[0].length-1; y++) {
      tiles[x][y] = new TruchetTile(new PVector(size+ x * size, size + y * size), size, rotation[getRandomInt(0, rotation.length)]);
      splitted[x][y] = tiles[x][y].setupTile(getNoiseValue(x, y, 0.5), rotation);
    }
  }
  //tiles[resolution/2][resolution/2].setupTile(0.5, rotation);
}

boolean debug = false;
void draw_() {
  if (createSVG) {
    // Note that #### will be replaced with the frame number. Fancy!
    beginRecord(SVG, "svg/" + timestamp() + ".svg");
  }

  background(255);
  if (!debug) {
    push();
    //translate(width/2, height/2);
    //rotate(PI/4);
    //translate(-width/2, -height/2);
    for (int x = 0; x < tiles.length-1; x++) {
      for (int y = 0; y < tiles[0].length-1; y++) {
        tiles[x][y].show();
      }
    }

    for (int x = 0; x < tiles.length-1; x++) {
      for (int y = 0; y < tiles[0].length-1; y++) {
        if (splitted[x][y]) {
          tiles[x][y].show();
        }
      }
    }
    pop();
  } else {

    tiles[resolution/2][resolution/2].show();
  }
  if (createSVG) {
    endRecord();
    createSVG = false;
  }
}
