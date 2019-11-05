const canvasSketch = require('canvas-sketch');
const SimplexNoise = require('simplex-noise');

const settings = {
  animate: true,
  // Set loop duration to 3
  duration: 3,
  // Use a small size for better GIF file size
  dimensions: [ 512, 512 ],
  // Optionally specify a frame rate, defaults to 30
  fps: 30,
};

class Cursor {
  constructor() {
    this.pos = {x: settings.dimensions[0]/2, y: settings.dimensions[1]/2};
    this.startPos = Object.assign({}, this.pos);
    this.xNoise = new SimplexNoise(Math.random()*100);
    this.yNoise = new SimplexNoise(Math.random()*100);
    this.noiseRes = 0.01
    this.endPoints = [];

    for(let i = 0; i <= 20; i++) {
      this.endPoints.push({
        x: settings.dimensions[0]/20 * i,
        y: 0,
      })
    }
  }

  show = (ctx) => {
    ctx.fillStyle = "white";
    ctx.fillRect(this.pos.x, this.pos.y, -200, -200);
    ctx.fillStyle = "black";

    for(const point of this.endPoints) {
      ctx.moveTo(this.pos.x, this.pos.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
    }
    ctx.fillStyle = "white";
    ctx.fillRect(this.pos.x, this.pos.y, -200, -200);
  }
  move = (t) => {
    this.pos.x = this.startPos.x + this.xNoise.noise2D( Math.cos((Math.PI * 2 *t)*0.3), Math.sin((Math.PI * 2 *t)*0.3))*40; // this.pos.x * this.noiseRes, this.pos.y * this.noiseRes,
    this.pos.y = this.startPos.y + this.yNoise.noise2D( Math.cos((Math.PI * 2 *t)*0.3), Math.sin((Math.PI * 2 *t)*0.3))*40; //this.pos.x * this.noiseRes, this.pos.y * this.noiseRes,
  }
}

const sketch = () => {
  const cursor = new Cursor();

  return ({ context: ctx, width, height, playhead: t }) => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = 'black';
    cursor.move(t);
    cursor.show(ctx);
  };
};

canvasSketch(sketch, settings);
