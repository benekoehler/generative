#ifdef GL_ES
precision mediump float;
#endif

const float PI=3.14159265359;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

float random2d(vec2 coord){
    return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);
}   

void main(){
    vec2 coord = gl_FragCoord.xy * 1.0 - u_resolution;
    vec3 color = vec3(0.0);
    color += abs(cos(coord.x /20.0) + sin(coord.y / 20.0)-cos(u_time));
    
    color = step(color, vec3(0.3));
     

    gl_FragColor = vec4(color,1.0);
}