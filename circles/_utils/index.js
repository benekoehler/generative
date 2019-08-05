export class Arc {
    constructor(x, y, r, start, end) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.reso = 64;
        this.start = this.reso * start;
        this.end = this.reso * end;
        
        this.points = [];
        
        this.calculate();
    }

    calculate() {
        const step = Math.PI * 2 / this.reso;
        let angle = 0;
        for (let i = 0; i <= this.end; i++) {
            this.points.push([
                this.x + Math.cos(angle) * this.r,
                this.y + Math.sin(angle) * this.r,
            ])
            angle += step;
        }
    }
    rotate(angle) {
        this.points.forEach(point => {
            let x = point[0] * Math.cos(angle) - point[1] * Math.sin(angle);
            let y = point[1] * Math.cos(angle) + point[0] * Math.sin(angle);
            point[0] = x;
            point[1] = y;
            
        })
    }
}

export class Circle extends Arc {
    constructor(x,y,r) {
        super(x,y,r, 0, 1);
    }
}

/**
 * Get a random floating point number between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random floating point number
 */
export function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min
  }
  
  /**
   * Get a random integer between `min` and `max`.
   *
   * @param {number} min - min number
   * @param {number} max - max number
   * @return {number} a random integer
   */
  export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  /**
   * Get a random boolean value.
   *
   * @return {boolean} a random true/false
   */
  export function getRandomBool() {
    return Math.random() >= 0.5
  }
  
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  // https://davidwalsh.name/javascript-debounce-function
  export function debounce(func, wait, immediate) {
    let timeout
    return function () {
      const context = this
      const args = arguments
      const later = function () {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      const callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }
  
  /**
  * p5.js mapping function
  * @method map
  * @param  {Number} value  the incoming value to be converted
  * @param  {Number} start1 lower bound of the value's current range
  * @param  {Number} stop1  upper bound of the value's current range
  * @param  {Number} start2 lower bound of the value's target range
  * @param  {Number} stop2  upper bound of the value's target range
  * @param  {Boolean} [withinBounds] constrain the value to the newly mapped range
  * @return {Number}        remapped number
  */
  export function map(n, start1, stop1, start2, stop2, withinBounds) {
    const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2
    if (!withinBounds) {
      return newval
    }
    if (start2 < stop2) {
      return constrain(newval, start2, stop2)
    } else {
      return constrain(newval, stop2, start2)
    }
  }
  
  // p5.js constrain function
  /**
   * Constrains a value between a minimum and maximum value.
   *
   * @method constrain
   * @param  {Number} n    number to constrain
   * @param  {Number} low  minimum limit
   * @param  {Number} high maximum limit
   * @return {Number}      constrained number
   **/
  export function constrain(n, low, high) {
    return Math.max(Math.min(n, high), low)
  }
  
  /**
   * returns window width
   *
   * @method getWidth
   * @return {Number}      window width
   **/
  export function getWidth() {
    return window.innerWidth ||
      document.documentElement.clientWidth ||
      document.getElementsByTagName('body')[0].clientWidth
  }
  
  /**
   * returns window height
   *
   * @method getHeight
   * @return {Number}      window height
   **/
  export function getHeight() {
    return window.innerHeight ||
      document.documentElement.clientHeight ||
      document.getElementsByTagName('body')[0].clientHeight
  }
  export function dist(a,b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  }