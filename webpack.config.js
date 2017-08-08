var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    'three.ar': './src/index.js',
    'three.ar.min': './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js/, exclude: /node_modules/, use: ['babel-loader'] },
      { test: /\.(glsl|frag|vert)$/, exclude: /node_modules/, use: ['raw-loader', 'glslify-loader'] },
    ]
  },
  resolve: {
    extensions: ['.js'],
  },
  devServer: {
    publicPath: '/dist',
    contentBase: [
      path.resolve(__dirname),
    ],
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
    }),
  ],
}
