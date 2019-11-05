const canvasSketch = require('canvas-sketch');
// const { renderPolylines } = require('canvas-sketch-util/penplot');
const SimplexNoise = require('simplex-noise');
const tinyColor = require('tinycolor2');

const xNoise = new SimplexNoise(Math.random()*100);
const yNoise = new SimplexNoise(Math.random()*100);
const showNoise = new SimplexNoise(Math.random()*100);
    // value2d = simplex.noise2D(x, y),
    // value3d = simplex.noise3D(x, y, z),
    // [ 'a3', 297, 420 ],
    // [ 'a4', 210, 297 ],

const settings = {
  dimensions: [297, 297],
  // You can still work in your preferred units
  units: 'mm',
  pixelsPerInch: 300,
};

let grid;
const columns = 8;
const rows = 8;
const margin = 20;
const resolution = 15;
const rectSize = 5;
let colors;

const size = [200, 200];


const noiseRadius = 0.005;
const zOffset = 20;

const init = (xSize, ySize, width, height) => {
  grid = Array.from({length: columns+1}, 
    () => Array.from({length: rows}, 
      () => ({x: 0, y: 0})
    )
  );

  for (let i = 0; i <= columns; i++) {
    for(let j = 0; j <= rows; j++) {
      grid[i][j] = {
        x: (width-xSize)/2 + margin + ((xSize-margin*2)/columns)*i, 
        y: (height-ySize)/2 + margin + ((ySize-margin*2)/rows)*j
      };
    }
  }

  colors = tinyColor.random().monochromatic();
  colors.forEach(color => color.lighten().desaturate(40));
}

const generatePath = () => {
  for (let i = 0; i <= columns; i++) {
    for(let j = 0; j <= rows; j++) {
      let path = [];
      let svg = "";
      let gcode = "";
      const isShowing = true; //showNoise.noise2D(grid[i][j].x * noiseRadius, grid[i][j].y * noiseRadius) < 0;

      if(isShowing) {
        for(let k = 0; k < resolution; k ++) {
          let xOffset = xNoise.noise3D(grid[i][j].x * noiseRadius, grid[i][j].y * noiseRadius, k/zOffset) * 15;
          let yOffset = yNoise.noise3D(grid[i][j].x * noiseRadius, grid[i][j].y * noiseRadius, k/zOffset) * 15;
          path.push({x: (grid[i][j].x + xOffset).toFixed(5), y: (grid[i][j].y + yOffset).toFixed(5)})
          if(k === 0){ 
            svg += `<path stroke-width="2" stroke="${colors[4].toHex8String()}" fill="none" d="M${path[0].x} ${path[0].y} `;
            
            gcode += `G1 X${path[k].x} Y${path[k].y}\nG0 Z0\n`;
          }
          svg += `L${path[k].x} ${path[k].y} `
          gcode += `G1 X${path[k].x} Y${path[k].y}\n`;
        }
        svg += `"/>`;
        gcode += `G0 Z10\n`;
      } else {
        path.push({x: 0, y:0});
      }
      grid[i][j] = {
        path,
        svg,
        gcode,
        isShowing,
        ...grid[i][j]
      };
    }
  }
}

const drawGrid = (ctx, gridToDraw) => {
  for(let column of gridToDraw) {
    for(let row of column) {
      ctx.fillRect(row.x-rectSize/2, row.y-rectSize/2, rectSize,rectSize);
    }
  }
}

const drawLines = (ctx) => {
  for (let i = 0; i <= columns; i++) {
    for(let j = 0; j <= rows; j++) {
      const {path} = grid[i][j];
      ctx.moveTo(path[0].x, path[0].y)

      for(let k = 1; k < path.length; k ++) {
        ctx.lineTo(path[k].x, path[k].y);
      }
      ctx.stroke();
    }
  }
}
const concatSVG = () => {
  let svg = "";
  for (let i = 0; i <= columns; i++) {
    for(let j = 0; j <= rows; j++) {
      svg += grid[i][j].svg;
    }
  }
  return svg;
}
const concatGcode = () => {
  let gcode = "";
  for (let i = 0; i <= columns; i++) {
    for(let j = 0; j <= rows; j++) {
      gcode += `${grid[i][j].gcode}\n`;
    }
  }
  return gcode;
}

const copy2dArray = (outerArray) => {
  return outerArray.map(innerArray => innerArray.slice().map(coords => Object.assign({}, coords)));
}

const sketch = () => {

  return ({ canvas, context: ctx, width, height }) => {
    init(200, 200, width, height);
    generatePath();
    ctx.fillStyle = "black"; //colors[0].toHex8String();
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "white"; //colors[4].toHex8String();
    // drawGrid(ctx, grid);
    ctx.lineWidth = 0.7;
    drawLines(ctx);
  
    return [
      {
        data: `<svg 
                xmlns="http://www.w3.org/2000/svg"
                height="${height}"
                width="${width}"
                viewBox="0 0 ${width} ${height}"
                style="background-color: ${colors[0].toHex8String()}"
              >
                ${concatSVG()}
              </svg>`,
        extension: '.svg'
      },
      {
        data:   `G0 F7000\nG1 F4000\nG90 G21\n${concatGcode()}`,
        extension: '.gcode'
      },
      canvas,
      
    ];
  };
};

canvasSketch(sketch, settings);
