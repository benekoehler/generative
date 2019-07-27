    
const canvasSketch = require('canvas-sketch');
const { renderPolylines } = require('canvas-sketch-util/penplot');
const { clipPolylinesToBox } = require('canvas-sketch-util/geometry');
const random = require('canvas-sketch-util/random');


const settings = {
  dimensions: 'A3',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm',
};

function Circle(x,y,r) {
  this.steps = 32;
  this.data = [];
  this.x = x;
  this.y = y;

  this.calculate = function() {
    for (let i = 0; i < this.steps; i++) {
      const t = i / Math.max(1, this.steps - 1);
      const angle = Math.PI * 2 * t;

      this.data.push([
        this.x + Math.cos(angle) * r,
        this.y + Math.sin(angle) * r
      ])
    }
  }

  this.update = function() {
    this.data = [];
    this.y+= 1;
    this.x = this.x + random.noise1D(this.y, 0.1, 0.6);
    this.calculate();
  }


  this.getData = function() {
    return this.data;
  }
}
const rows = 5;
const radius = 2

const sketch = ({ context, width, height }) => {
  // List of polylines for our pen plot
  let lines = [];


  const offset = (width-rows*(radius*2))/2;

  for(let i = 0; i < rows; i++) {
    let circle = new Circle(offset+radius+(radius*2)*i, height/2-10, radius);
    circle.calculate();
    lines.push(circle.getData());
    for(let j = 0; j < 20; j++) {
      circle.update();
      lines.push(circle.getData());
    }
  }
  
  context.fillRect(100,100,100,100);


  // Clip all the lines to a margin
  const margin = 1.0;
  const box = [ margin, margin, width - margin, height - margin ];
  lines = clipPolylinesToBox(lines, box);

  // The 'penplot' util includes a utility to render
  // and export both PNG and SVG files
  return props => renderPolylines(lines, props);
};

canvasSketch(sketch, settings);