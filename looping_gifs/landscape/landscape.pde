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


int m = 2000;
float delay_factor = 2.0;
float d = 0.006;
NoiseLoop zNoise;

int n = 0;
int ca = 8;

void setup() {
  size(1000, 1000, P3D);
  result = new int[width*height][3];
  colors = colorHarmony.Monochromatic();
  cam = new PeasyCam(this, 700);
  //cam.rotateZ(45);
  cam.rotateX(-45);
  
  zNoise= new NoiseLoop(0.5, 0, 150); 

}

void draw_() {
  background(colors[4]);
  //lights();
  push();
 // translate(-width/2, -height);
  stroke(colors[0], 200);
  noFill();
  //fill(colors[1]);
  strokeWeight(5);
  for(int x = 0; x < m; x++) {
    for(int y = 0; y < m; y++) {
      float xpos = x*(width/m);
      float ypos = y*(width/m);
      //float z = (float)noise.eval(seed + d*x, d*y) * 100;
      float z = 1;//zNoise.value4D(d*x,d*y,t);
      //z = z * constrain(map(dist(x,y,m/2, m/2), 0, m/2, 1, 0), 0, 1);
      push();
      translate(xpos, ypos, z);
      //scale(constrain(map(dist(x,y,m/2, m/2), 0, m/2, 2, 0), 0, 2));
      point(0,0,0);
      pop();
    }  
  }
  //noFill();

  //beginShape();
  //for(int i = 0; i < m; i++){
  //  float a = i * 137.5 ;
  //  float r = ca * sqrt(i);
    
  //  float x = r * sin(a);
  //  float y = r * cos(a);
  //  float z = zNoise.value4D(d*x,d*y,t);

  //  //vertex(x,y,z);
  //  push();
  //  translate(x,y,z);
  //  scale(map(r, 0, sqrt(m)*ca, 2, 0.5));
  //  point(0,0,0);
    
  //  pop();
  //}
  //endShape();
  pop();
}
