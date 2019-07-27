const canvasSketch = require('canvas-sketch');
const { renderPolylines } = require('canvas-sketch-util/penplot');
const { clipPolylinesToBox } = require('canvas-sketch-util/geometry');
const random = require('canvas-sketch-util/random');

const settings = {
  name: 'blob',
  suffix: new Date().getTime(),
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm',
};

const sketch = ({ width, height, context }) => {
  // List of polylines for our pen plot
  let lines = [];

  // Draw some circles expanding outward
  const steps = 64;
  const count = 4;
  const spacing = Math.min(width, height) * 0.05;
  const radius = Math.min(width, height) * 0.25;
  let circles = [];
  for (let j = 0; j < count; j++) {
    const r = radius + j * spacing;
    const circle = [];
    for (let i = 0; i < steps; i++) {
      const t = i / Math.max(1, steps - 1);
      const angle = Math.PI * 2 * t;
      let x = width / 2 + Math.cos(angle) * r;
      let y = height / 2 + Math.sin(angle) * r;
      x = x+random.noise2D(x, y, 0.02, 10);
      y = y+random.noise2D(x, y, 0.02, 10);

      circle.push([
        x,
        y
      ]);
      

    }
    if(j === 0) {
      circle.forEach(point => {

        lines.push([[width/2, height/2],[point[0],point[1]]])
      })
    } else {
      circles.forEach(point => {
        console.log(point)
      })
    }
    
    lines.push(circle);
    circles.push(circle)
  }
  // Clip all the lines to a margin
  const margin = 1.0;
  const box = [ margin, margin, width - margin, height - margin ];
  lines = clipPolylinesToBox(lines, box);


  context.fillRect(width/2, height/2, 10, 10);
  // The 'penplot' util includes a utility to render
  // and export both PNG and SVG files
  return props => renderPolylines(lines, props);
};

canvasSketch(sketch, settings);
