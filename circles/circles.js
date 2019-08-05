const canvasSketch = require('canvas-sketch');
const { renderPolylines } = require('canvas-sketch-util/penplot');
const { clipPolylinesToBox } = require('canvas-sketch-util/geometry');

import { Arc, Circle, getRandomFloat, getRandomInt, dist } from './_utils';

const settings = {
  name: 'circles',
  suffix: + new Date(),
  dimensions: 'A4',
  orientation: 'portrait',
  pixelsPerInch: 300,
  scaleToView: true,
  units: 'cm',
};

function weightedRandom(items, sumOfWeights) {
  let randomNumber = getRandomInt(1, sumOfWeights);
  for(let i = 0; i < items.length; i++) {
    randomNumber = randomNumber - items[i].weight;
    if(randomNumber <= 0) {
      return items[i];
    }
  }
}

const prepareGradient = function(reso, width, height) {
  const xpos = [];
  const xstep = width/reso;
  for(let i = 0; i < width; i += xstep) {
    xpos.push({value: i, weight: i});
  }

  const ypos = [];
  const ystep = height/reso;
  for(let i = 0; i < height; i += ystep) {
    ypos.push({value: i, weight: i});
  }

  const xSumOfWeights = xpos.reduce((prev, curr) => prev + curr.weight, 0);
  const ySumOfWeights = ypos.reduce((prev, curr) => prev + curr.weight, 0);
  return {xpos, xSumOfWeights, ypos, ySumOfWeights};
}

const {xpos, xSumOfWeights, ypos, ySumOfWeights} = prepareGradient(500, 21, 29.7);


function createCircles(amount) {
  let circles = [];
  for(let i = 0; i < amount; i++) {
    const newCircle = new Circle(weightedRandom(xpos, xSumOfWeights).value, weightedRandom(ypos, ySumOfWeights).value, getRandomFloat(0.1, 1));
    if(i === 0) {
      circles.push(newCircle);
    }
    for(let j = 0; j < circles.length; i++) {
      const {xpos, ypos, r} = circles[j];
      // if(dist({x: xpos, y: ypos}, {x:newCircle.x, y: newCircle.y}) >= r + newCircle.r) {
      //   circles.push(newCircle);
      // } 
    }
  }
  return circles;
}


const sketch = ({ width, height }) => {
  // List of polylines for our pen plot
  let lines = [];
  const count = 100;

  // Draw some circles expanding outwards
  for(let i = 0; i < count; i++) {
    const circle = new Circle(weightedRandom(xpos, xSumOfWeights).value, weightedRandom(ypos, ySumOfWeights).value, getRandomFloat(0.1, 1));
    lines.push(circle.points)
  }

  // const circles = createCircles(100);
  // for(let j = 0; j < circles.length; i++) {
  //   lines.push(circles[i].points);
  // }

  // Clip all the lines to a margin
  const margin = 1.0;
  const box = [ margin, margin, width - margin, height - margin ];
  lines = clipPolylinesToBox(lines, box);

  // The 'penplot' util includes a utility to render
  // and export both PNG and SVG files
  return props => renderPolylines(lines, props);
};

canvasSketch(sketch, settings);
