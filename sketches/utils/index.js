/**
 * Get a random floating point number between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random floating point number
 */
export function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Get a random integer between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random integer
 */
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Get a random boolean value.
 *
 * @return {boolean} a random true/false
 */
export function getRandomBool() {
  return Math.random() >= 0.5;
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// https://davidwalsh.name/javascript-debounce-function
export function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// constrain function
/**
 * Constrains a value between a minimum and maximum value.
 *
 * @method constrain
 * @param  {Number} n    number to constrain
 * @param  {Number} low  minimum limit
 * @param  {Number} high maximum limit
 * @return {Number}      constrained number
 * */
export function constrain(n, low, high) {
  return Math.max(Math.min(n, high), low);
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
  const newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  if (!withinBounds) {
    return newval;
  }
  if (start2 < stop2) {
    return constrain(newval, start2, stop2);
  }
  return constrain(newval, stop2, start2);
}
/**
 * Calculates a number between two numbers at a specific increment. The amt
 * parameter is the amount to interpolate between the two values where 0.0
 * equal to the first point, 0.1 is very near the first point, 0.5 is
 * half-way in between, and 1.0 is equal to the second point. If the
 * value of amt is more than 1.0 or less than 0.0, the number will be
 * calculated accordingly in the ratio of the two given numbers. The lerp
 * function is convenient for creating motion along a straight
 * path and for drawing dotted lines.
 *
 * @method lerp
 * @param  {Number} start first value
 * @param  {Number} stop  second value
 * @param  {Number} amt   number
 * @return {Number}       lerped value
 * */

export function lerp(start, stop, amt) {
  let result = amt * (stop - start) + start;
  // result = parseFloat(result.toFixed(5));
  return result > 0.001 || result < -0.001 ? result : 0;
}

/**
 * returns window width
 *
 * @method getWidth
 * @return {Number}      window width
 * */
export function getWidth() {
  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.getElementsByTagName('body')[0].clientWidth
  );
}

/**
 * returns window height
 *
 * @method getHeight
 * @return {Number}      window height
 * */
export function getHeight() {
  return (
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.getElementsByTagName('body')[0].clientHeight
  );
}
/**
 * returns an object with x and y pos of the mouse
 *
 * @param {Object} event  mousemove event
 * @return {Object} n
 */

export function getMousePos(event) {
  var eventDoc, doc, body;

  event = event || window.event; // IE-ism

  // If pageX/Y aren't available and clientX/Y are,
  // calculate pageX/Y - logic taken from jQuery.
  // (This is to support old IE)
  if (event.pageX == null && event.clientX != null) {
    eventDoc = (event.target && event.target.ownerDocument) || document;
    doc = eventDoc.documentElement;
    body = eventDoc.body;

    event.pageX =
      event.clientX +
      ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
      ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);
    event.pageY =
      event.clientY +
      ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
      ((doc && doc.clientTop) || (body && body.clientTop) || 0);
  }

  // Use event.pageX / event.pageY here
  return { x: event.pageX, y: event.pageY };
}
/**
 * returns dist between two points
 *
 * @method dist
 * @param {Object} x  first point {x: 0, y: 0}
 * @param {Object} y  second point {x: 0, y: 0}
 * @return {Number}      dist
 * */
export function dist(x, y) {
  let a = y.x - x.x;
  let b = y.y - x.y;
  return Math.hypot(a, b);
}

export function vhFix() {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // We listen to the resize event
  window.addEventListener(
    'resize',
    debounce(() => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }),
    20
  );
}
//------- Shuffle Helper Function based on the Fisher-Yates Algorithm --------//

/**
 * shuffles Array
 *
 * @method shuffle
 * @param {Array} a
 * @return {Array} shuffled array
 * */
export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// helper class to expand setinterval with isrunning check
export function Interval(fn, time) {
  var timer = false;
  this.start = function() {
    if (!this.isRunning()) timer = setInterval(fn, time);
  };
  this.stop = function() {
    clearInterval(timer);
    timer = false;
  };
  this.isRunning = function() {
    return timer !== false;
  };
}

(function initUtils() {
  Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function() {
      return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
  });

  Object.defineProperty(navigator, 'isIOS', {
    get: function() {
      // const regex = new RegExp();
      return !!navigator.userAgent.match(/(iPad|iPhone)/) && !window.MSStream;
    }
  });

  Object.defineProperty(navigator, 'isIphoneX', {
    get: function() {
      // Get the device pixel ratio
      var ratio = window.devicePixelRatio || 1;

      // Define the users device screen dimensions
      var screen = {
        width: window.screen.width * ratio,
        height: window.screen.height * ratio
      };

      // Set a global variable now we've determined the iPhoneX is true
      return (
        (navigator.isIOS && (screen.width === 1125 && screen.height === 2436)) || // iphone xr
        (screen.width === 1242 && screen.height === 2688) || //iphone xs
        (screen.width === 828 && screen.height === 1792) // iphone x
      );
    }
  });
})();
