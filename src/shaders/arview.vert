attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;

void main(void) {
  gl_Position = vec4(aVertexPosition, 1.0);
  vTextureCoord = aTextureCoord;
}
