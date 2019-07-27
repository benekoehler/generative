class NoiseLoop {
  float diameter;
  float min, max;
  float x, y;
  float seed, seedY;
  
  OpenSimplexNoise noise;
  
  NoiseLoop(float d, float min, float max) {
    this.diameter = d;
    this.min = min;
    this.max = max;
    this.seed = random(1000);
    
    noise = new OpenSimplexNoise();

  }

  float value(float a) {
    float noiseVal = (float)noise.eval(seed + diameter*cos(TWO_PI*a), diameter*sin(TWO_PI*a));
   // println(noiseVal);
    return map(noiseVal, -1, 1, min, max);
  }
  
  float value4D(float x, float y, float a) {
    float noiseVal = (float)noise.eval(x, y, seed + diameter*cos(TWO_PI*a), diameter*sin(TWO_PI*a));
   // println(noiseVal);
    return map(noiseVal, -1, 1, min, max);
  }
}
