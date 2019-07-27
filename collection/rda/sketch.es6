
let grid;
let next;
const dA = 1.0;
const dB = 0.2;
const feed = 0.065;
const k = 0.062;

function setup() {
	createCanvas(200, 200);
	pixelDensity(1);
	setupGUI();
	grid = [];
	next = [];
	for (let x = 0; x < width; x++) {
		grid[x] = [];
		next[x] = [];
		for (let y = 0; y < height; y++) {
			grid[x][y] = {a: 1, b: 0};
			next[x][y] = {a: 1, b: 0};
		}
	}

	for(let i = 100; i < 110; i++){
		for(let j = 100; j < 110; j++){
			grid[i][j].b = 1;

		}
	}

	for(let i = 80; i < 90; i++){
		for(let j = 70; j < 90; j++){
			grid[i][j].b = 1;

		}
	}
	
}

function draw() {
	// background(50);

	for (let x = 1; x < width-1; x++) {
		for (let y = 1; y < height-1; y++) {
			let a = grid[x][y].a;
			let b = grid[x][y].b;
			next[x][y].a = a + 
										(dA * laplaceA(x,y)) - 
										(a * b * b) + 
										(feed * (1 - a));
			next[x][y].b = b + 
										(dB * laplaceB(x,y)) + 
										(a * b * b) - 
										((k + feed) * b);

			next[x][y].a = constrain(next[x][y].a, 0, 1);
			next[x][y].b = constrain(next[x][y].b, 0, 1);
		}
	}

  // loadPixels();
  // for (let x = 0; x < width; x++) {
  //   for (let y = 0; y < height; y++) {
  //     let pix = (x + y * width) * 4;
  //     let a = next[x][y].a;
  //     let b = next[x][y].b;
  //     let c = floor((a - b) * 255);
  //     c = constrain(c, 0, 255);
  //     pixels[pix + 0] = c;
  //     pixels[pix + 1] = c;
  //     pixels[pix + 2] = c;
  //     pixels[pix + 3] = 255;
  //   }
  // }
	// updatePixels();

	swap();
	showFramerate();
}

const swap = () => {
	const temp = grid;
	grid = next;
	next = temp;
}

const laplaceA = (x, y) => {
	let sum = 0;
	sum += grid[x][y].a * -1;
	sum += grid[x-1][y].a * 0.2;
	sum += grid[x+1][y].a * 0.2;
	sum += grid[x][y+1].a * 0.2;
	sum += grid[x][y-1].a * 0.2;
	sum += grid[x+1][y+1].a * 0.05;
	sum += grid[x-1][y-1].a * 0.05;
	sum += grid[x+1][y-1].a * 0.05;
	sum += grid[x-1][y+1].a * 0.05;
	return sum;
};


const laplaceB = (x, y) => {
	let sum = 0;
	sum += grid[x][y].b * -1;
	sum += grid[x-1][y].b * 0.2;
	sum += grid[x+1][y].b * 0.2;
	sum += grid[x][y+1].b * 0.2;
	sum += grid[x][y-1].b * 0.2;
	sum += grid[x+1][y+1].b * 0.05;
	sum += grid[x-1][y-1].b * 0.05;
	sum += grid[x+1][y-1].b * 0.05;
	sum += grid[x-1][y+1].b * 0.05;
	return sum;
};