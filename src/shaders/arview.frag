#extension GL_OES_EGL_image_external : require
precision mediump float;

varying vec2 vUV;

uniform samplerExternalOES map;

void main(void) {
  gl_FragColor = texture2D(map, vUV);
}
