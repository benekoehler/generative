const canvasSketch = require('canvas-sketch');
const { renderPolylines } = require('canvas-sketch-util/penplot');
const { clipPolylinesToBox } = require('canvas-sketch-util/geometry');
import {Circle, Arc } from './utils/Circle';

const settings = {
  name: 'Circle',
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm',
};

const sketch = ({ width, height }) => {
  // List of polylines for our pen plot
  let lines = [];

  // Draw some circles expanding outward
  const count = 1;
  const spacing = Math.min(width, height) * 0.01;
  const radius = Math.min(width, height) * 0.25;
  for (let j = 0; j < count; j++) {
    const r = radius + j * spacing;
    let c = new Arc(width/2, height/2, r);
    
    lines.push(c.points);
  }

  // Clip all the lines to a margin
  const margin = 1.0;
  const box = [ margin, margin, width - margin, height - margin ];
  lines = clipPolylinesToBox(lines, box);

  // The 'penplot' util includes a utility to render
  // and export both PNG and SVG files
  return props => renderPolylines(lines, props);
};

canvasSketch(sketch, settings);
