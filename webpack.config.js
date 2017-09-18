/*
 * Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global require __dirname module */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const licensePath = path.join(__dirname, 'build', 'license.js');
const license = fs.readFileSync(licensePath, 'utf8');

module.exports = {
  entry: {
    'three.ar': './src/index.js',
    'three.module.ar': './src/index.module.js',
    'three.ar.min': './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      { test: /\.js/, exclude: /node_modules/, use: ['babel-loader'] },
      {
        test: /\.(glsl|frag|vert)$/,
        exclude: /node_modules/,
        use: ['raw-loader', 'glslify-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  // https://webpack.github.io/docs/webpack-dev-server.html
  devServer: {
    publicPath: '/dist',
    contentBase: [path.resolve(__dirname)],
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
    }),
    new webpack.BannerPlugin({ banner: license, raw: true }),
  ],
};
