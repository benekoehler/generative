import com.cage.colorharmony.*;

// CREATE A COLORHARMONY INSTANCE (DEFAULT CONSTRUCTOR)
ColorHarmony colorHarmony = new ColorHarmony(this);

// THE HARMONIZED PALETTE
color[] colors = new color[8];


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

int samplesPerFrame = 5;
int numFrames = 60;        
float shutterAngle = 0.5;

boolean recording = true;

float r = 100;
Thing[] things = new Thing[100];

void setup() {
  size(1000, 1000, P3D);
  // pixelDensity(2);
  result = new int[width*height][3];
  colors = colorHarmony.Monochromatic();
  for (int i = 0; i < things.length; i++) {
    things[i] = new Thing(new PVector(5, 5));
  }
  for (int i = 0; i < 10; i++) {
    for(int j = 0; j < 10; j++){
        things[10*i+j].pos = new PVector(width/10*i, height/10*j);
    }
  }
  //directionalLight(255, 255, 255, 0, 0, -1);
  //ambientLight(102, 102, 102);
}

void fade(int c, int a) {
  if (frameCount == 0) {
    background(c);
  }
  push();
  fill(c, c, c, a);
  noStroke();
  rect(0, 0, width, height);
  pop();
}

void draw_() {
  lights();
  push();
  rotateX(PI/4);
  background(50);
  //fade(0, 20);
  stroke(255);
  strokeWeight(10);
  for(int i = 0; i < things.length; i++) {
    things[i].show();
  }
  //noFill();
  ////beginShape();
  //for (float i = 0; i < 1; i+= 0.01) {
  //  //push();
  //  //translate(width, height);
  //  //rotate(i*2);
  //  //pop();
  //}
  //    point(width/2+r*cos((TWO_PI*3)*t), height/2+r*sin((TWO_PI*4)*t));

  ////endShape();
  pop();
}
