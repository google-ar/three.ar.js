precision mediump float;
precision mediump int;

varying float zDepth;
uniform vec3 nearColor;
uniform vec3 farColor;
uniform float range;
uniform bool useHSVInterpolation;

#pragma glslify: rgb2hsv = require(glsl-y-hsv/rgb2hsv)
#pragma glslify: lerpHSV = require(glsl-y-hsv/lerpHSV)
#pragma glslify: hsv2rgb = require(glsl-y-hsv/hsv2rgb)
#pragma glslify: map = require(./map.glsl)

void main() {
  float dist = clamp(map(zDepth, 0.0, range, 0.0, 1.0), 0.0, 1.0);
  if (useHSVInterpolation == true) {
    gl_FragColor = vec4(hsv2rgb(lerpHSV(rgb2hsv(nearColor), rgb2hsv(farColor), dist)), 1.0);
  }
  else {
    gl_FragColor = vec4(mix(nearColor, farColor, dist), 1.0);
  }
}
