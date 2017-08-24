# three.ar.js

[![Build Status](http://img.shields.io/travis/google-ar/three.ar.js.svg?style=flat-square)](https://travis-ci.org/google-ar/three.ar.js)
[![Build Status](http://img.shields.io/npm/v/three.ar.js.svg?style=flat-square)](https://www.npmjs.org/package/three.ar.js)
[![Build Status](http://img.shields.io/npm/dt/three.ar.js.svg?style=flat-square)](https://www.npmjs.org/package/three.ar.js)
[![Build Status](http://img.shields.io/npm/l/three.ar.js.svg?style=flat-square)](https://www.npmjs.org/package/three.ar.js)

**A helper three.js library for building AR web experiences that run in WebARonARKit and WebARonARCore.**

[WebARonARKit](https://github.com/googlevr/WebARonARKit) and [WebARonARCore](https://github.com/googlevr/WebARonARCore) are experimental apps for iOS and Android that let developers create Augmented Reality (AR) experiences using web technologies. Three.ar.js makes it easier to create these experiences by providing helper classes and utilities on top of the [three.js framework](https://threejs.org/). For example:

* THREE.ARReticle: a visible reticle drawn on the real surface of real world objects.
* THREE.ARPerspectiveCamera: a camera that matches your Three.js scene to your camera's video feed.

See [three.ar.js API documentataion](TODO) for details.

## Getting started

Run `npm run build` to create a new build in `./dist`. Run `npm run dev` to start a local dev server on port 8080 (or increments if in use), and making changes to files in `./src` will auto update the build, and work on demos at `localhost:8080/examples`.

## Examples

Examples of three.ar.js are in the `/examples` directory. 

A [list of examples](https://developers.google.com/ar/develop/web/getting-started#examples) that are compatible with WebARonARKit and WebARonARCore is also available at [developers.google.com](https://developers.google.com/ar/develop/web/getting-started#examples).

## Notes

* WebAR prototyping requires [three.js](https://threejs.org/) r86 or higher due to needing a specific [uniform type](https://github.com/mrdoob/three.js/pull/11463) for rendering the AR camera on Android.

## <a name="License">License</a>
Apache License Version 2.0 (see the `LICENSE` file inside this repo).
