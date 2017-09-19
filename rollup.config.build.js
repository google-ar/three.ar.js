import glslify from '@shotamatsuda/rollup-plugin-glslify';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

const glsl = () => {
  return {

    transform( code, id ) {
      if ( /\.glsl$/.test( id ) === false ) return;

      let transformedCode = 'export default ' + JSON.stringify(
        code
        .replace( /[ \t]*\/\/.*\n/g, '' ) // remove //
        .replace( /[ \t]*\/\*[\s\S]*?\*\//g, '' ) // remove /* */
        .replace( /\n{2,}/g, '\n' ) // # \n+ to \n
      ) + ';';
      return {
        code: transformedCode,
        map: { mappings: '' },
      };
    },
  };
};

export default {
  input: 'src/index.js',
  indent: '\t',
  sourcemap: true,
  plugins: [
    glslify(),
    babel(),
    glsl(),
    resolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true,
    }),
  ],
  external: ['three'],
  globals: {
    'three': 'THREE',
  },
  output: [
    {
      format: 'umd',
      name: 'THREEAR',
      file: 'dist/three.ar.js',
    },
    {
      format: 'es',
      file: 'dist/three.module.ar.js',
    },
  ],
};
