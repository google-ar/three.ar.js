#extension GL_OES_EGL_image_external : require

precision mediump float;

varying vec2 vTextureCoord;

uniform samplerExternalOES uSampler;

void main(void) {
  gl_FragColor = texture2D(uSampler, vTextureCoord);
}
