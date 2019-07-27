export class Arc {
  constructor(xpos, ypos, radius, start = 0, end = 0.8 , clockwise = true, steps = 64) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.radius = radius;
    this.start = start;
    this.end = end;
    this.clockwise = clockwise
    this.steps = steps;
    this.points = [];
    this.calculateArc();

  }
  
  calculateArc() {
    let angle = 0;
    const t = (Math.PI * 2) / Math.max(1, this.steps - 1);
    for(let i = this.steps * this.start; i < this.steps *this.end; i++) {
      angle =  t * i;      
      this.points.push([
        this.xpos + Math.cos(angle) * this.radius,
        this.ypos + Math.sin(angle) * this.radius
      ]);
    }  
  
  }
}

export class Circle extends Arc {
  constructor(xpos, ypos, radius, steps = 32) {
    super(xpos, ypos, radius, steps = 32 )
    this.calculateCircle();

  }

  calculateCircle() {
    for(let i = 0; i < this.steps; i++) {
      const t = i / Math.max(1, this.steps - 1);
      const angle = Math.PI * 2 * t;
      
      this.points.push([
        this.xpos + Math.cos(angle) * this.radius,
        this.ypos + Math.sin(angle) * this.radius
      ]);
    }  
  }
}

/* 
for(let i = 0; i < this.steps; i++) {
  const t = i / Math.max(1, this.steps - 1);
  const angle = Math.PI * 2 * t;
  
  this.points.push([
    this.xpos + Math.cos(angle) * this.radius,
    this.ypos + Math.sin(angle) * this.radius
  ]);
}
*/

//if 'steps' is not specified, we'll just approximate it
function arc(x, y, radius, start, end, clockwise = true, steps = 16, path = []) {
  x = x||0
  y = y||0
  radius = radius||0
  start = start||0
  end = end||0

  //determine distance between the two angles
  //...probably a nicer way of writing this
  var dist = Math.abs(start-end)
  if (!clockwise && start > end)
      dist = 2*Math.PI - dist
  else if (clockwise && end > start)
      dist = 2*Math.PI - dist

  //approximate the # of steps using the cube root of the radius
  if (typeof steps !== 'number') 
      steps = Math.max(6, Math.floor(6 * Math.pow(radius, 1/3) * (dist / (Math.PI))))

  //ensure we have at least 3 steps..
  steps = Math.max(steps, 3)
  
  var f = dist / (steps),
      t = start

  //modify direction
  f *= clockwise ? -1 : 1

  for (var i=0; i<steps+1; i++) {
      var cs = Math.cos(t),
          sn = Math.sin(t)

      var nx = x + cs*radius,
          ny = y + sn*radius

      path.push([ nx, ny ])

      t += f
  }
  return path
}