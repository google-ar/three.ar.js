precision mediump float;
precision mediump int;

uniform mat4 modelViewMatrix; // optional
uniform mat4 projectionMatrix; // optional
uniform vec3 cameraPosition;
uniform float size;

attribute vec3 position;

varying float zDepth;

void main() {
  gl_PointSize = size;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  zDepth = distance(position, cameraPosition);
}
