# three.ar.js

Helper [three.js] classes and utilities for WebAR prototyping.

## API

API documentation can be found in [API.md].

## Development

Run `npm run build` to create a new build in `./dist`.

Run `npm run dev` to start a local dev server on port 8080 (or increments if in use),
and making changes to files in `./src` will auto update the build, and work on demos
at `localhost:8080/examples`.

## Notes

* WebAR prototyping requires [three.js] r86 or higher due to needing a specific [uniform type](https://github.com/mrdoob/three.js/pull/11463) for rendering the AR camera on Android.

## License

Apache License Version 2.0

[three.js]: http://threejs.org
[API.md]: API.md
