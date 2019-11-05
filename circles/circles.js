const canvasSketch = require('canvas-sketch');
const { renderPolylines } = require('canvas-sketch-util/penplot');
const { clipPolylinesToBox } = require('canvas-sketch-util/geometry');

import { getRandomFloat, getRandomInt, dist} from './_utils';
import {Circle} from './_utils/arc';

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


const sketch = ({ width, height }) => {
  // List of polylines for our pen plot
  let lines = [];
  const {xpos, xSumOfWeights, ypos, ySumOfWeights} = prepareGradient(500, 21, 29.7);
  const max = 4;
  let count = 0;
  const circles = [];
  while (count < max){
    let newPos = {
      x: getRandomInt(0, width),//weightedRandom(xpos, xSumOfWeights).value,
      y: getRandomInt(0, height)//weightedRandom(ypos, ySumOfWeights).value
    }
    let valid = true;
    for(let c of circles) {
      if(dist(newPos, c.pos) < c.r) {
        valid = false;
        break;
      };
    }     
    if (valid){
      circles.push(new Circle(newPos.x,newPos.y , 0, count));
      circles[count].grow(width, height, 0.1, circles);
      count++;
    } 

  }

  // Draw some circles expanding outwards
  for(let i = 0; i < count; i++) {
    lines.push(circles[i].points)
  }

  // Clip all the lines to a margin
  const margin = 0.0;
  const box = [ margin, margin, width - margin, height - margin ];
  lines = clipPolylinesToBox(lines, box);

  // The 'penplot' util includes a utility to render
  // and export both PNG and SVG files
  return props => renderPolylines(lines, props);
};

canvasSketch(sketch, settings);
