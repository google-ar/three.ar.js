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

var fs = require("fs");
var path = require("path");
var webpack = require("webpack");
var UglifyJSPlugin = require("uglifyjs-webpack-plugin")
var licensePath = path.join(__dirname, 'build', 'license.js');
var license = fs.readFileSync(licensePath, 'utf8');

module.exports = {
  entry: {
    "three.ar": "./src/index.js",
    "three.ar.min": "./src/index.js"
  },
  output: {
    libraryTarget: 'umd',
    path: path.join(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [
      { test: /\.js/, exclude: /node_modules/, use: ["babel-loader"] },
      {
        test: /\.(glsl|frag|vert)$/,
        exclude: /node_modules/,
        use: ["raw-loader", "glslify-loader"]
      },
      {
        test: /\.(png)$/,
        exclude: /node_modules/,
        use: ["base64-image-loader"],
      },
    ]
  },
  externals: {
    three: {
      commonjs: 'three',
      commonjs2: 'three',
      amd: 'three',
      root: 'THREE',
    },
  },
  resolve: {
    extensions: [".js"]
  },
  // https://webpack.github.io/docs/webpack-dev-server.html
  devServer: {
    publicPath: "/dist",
    contentBase: [path.resolve(__dirname)],
    host: "0.0.0.0",
    disableHostCheck: true
  },
  plugins: [
    // Use beta build of UglifyJSPlugin directly
    // due to webpack-dev-server's using let/const in the
    // injection code, which cannot be minified by the built in
    // version of Uglify. Can remove this once the fix is out
    // of uglifyjs-webpack-plugin beta
    //
    // https://github.com/webpack/webpack-dev-server/issues/1101
    // https://github.com/webpack/webpack-dev-server/tree/ee7231baf9f41082435832e6df3e57f4dafee013#caveats
    new UglifyJSPlugin({
      // The unbundled plugin also needs 'test' instead of 'include' (?),
      test: /\.min\.js$/
    }),
    new webpack.BannerPlugin({ banner: license, raw: true }),
  ]
};
