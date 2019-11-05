#pragma glslify: snoise = require('./noise.glsl');

varying vec2 vUv;
uniform float playhead;
uniform float offset;

void main () {
    vUv = uv;
    vec3 pos = position.xyz;
    if (pos.y >= 0.0) { 
        pos.y += snoise(vec3(playhead * 0.3, pos.x, 1.0)) * 0.5;
    }
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}