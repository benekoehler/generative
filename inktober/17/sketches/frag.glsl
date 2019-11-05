#pragma glslify: hsl2rgb = require('glsl-hsl2rgb');

varying vec2 vUv;
uniform float playhead;

void main () {

  vec3 coord = vec3(gl_FragCoord.xyz);
  vec3 color = mix(vec3(0.6941, 0.9059, 0.1961), vec3(0.0863, 0.8078, 0.7451), sin(coord.x * 0.01));
  // coord.x = sin(coord.x * 0.1);
  // // coord.z = sin(coord.z * 0.1);
  gl_FragColor = vec4(color, 1.0);
}