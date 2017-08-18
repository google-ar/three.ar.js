/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadBlocksModel = exports.getARDisplay = exports.isARDisplay = exports.isARKit = exports.isTango = undefined;

var _loaders = __webpack_require__(8);

THREE.ARUtils = Object.create(null); /*
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

THREE.ARUtils.isTango = function (display) {
  return display && display.displayName.toLowerCase().includes('tango');
};
var isTango = exports.isTango = THREE.ARUtils.isTango;

THREE.ARUtils.isARKit = function (display) {
  return display && display.displayName.toLowerCase().includes('arkit');
};
var isARKit = exports.isARKit = THREE.ARUtils.isARKit;

THREE.ARUtils.isARDisplay = function (display) {
  return isARKit(display) || isTango(display);
};
var isARDisplay = exports.isARDisplay = THREE.ARUtils.isARDisplay;

/**
 * Returns a promise that resolves to either to a VRDisplay with
 * AR capabilities, or null if no valid AR devices found on the platform.
 *
 * @return {Promise<VRDisplay?>}
 */
THREE.ARUtils.getARDisplay = function () {
  return new Promise(function (resolve, reject) {
    if (!navigator.getVRDisplays) {
      resolve(null);
      return;
    }

    navigator.getVRDisplays().then(function (displays) {
      if (!displays && displays.length === 0) {
        resolve(null);
        return;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = displays[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var display = _step.value;

          if (isARDisplay(display)) {
            resolve(display);
            return;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      resolve(null);
    });
  });
};
var getARDisplay = exports.getARDisplay = THREE.ARUtils.getARDisplay;

/**
 * Takes a path for an OBJ model and optionally a path for an MTL
 * texture and returns a promise resolving to a THREE.Mesh loaded with
 * the appropriate material. Can be used on downloaded models from Blocks.
 *
 * @param {string} objPath
 * @param {string} mtlPath
 * @return {THREE.Mesh}
 */
THREE.ARUtils.loadBlocksModel = function (objPath, mtlPath) {
  return new Promise(function (resolve, reject) {
    if (!THREE.OBJLoader || !THREE.MTLLoader) {
      reject(new Error('Must include THREE.OBJLoader and THREE.MTLLoader'));
      return;
    }

    var p = Promise.resolve();

    if (mtlPath) {
      p = (0, _loaders.loadMtl)(mtlPath);
    }

    p.then(function (materials) {
      if (materials) {
        materials.preload();
      }
      return (0, _loaders.loadObj)(objPath, materials);
    }).then(function (obj) {
      var model = obj.children[0];
      model.geometry.applyMatrix(new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(-90)));

      return model;
    }).then(resolve, reject);
  });
};
var loadBlocksModel = exports.loadBlocksModel = THREE.ARUtils.loadBlocksModel;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

// Reuse the frame data for getting the projection matrix
var frameData = void 0;

var ARPerspectiveCamera = function (_THREE$PerspectiveCam) {
  _inherits(ARPerspectiveCamera, _THREE$PerspectiveCam);

  function ARPerspectiveCamera(vrDisplay, fov, aspect, near, far) {
    _classCallCheck(this, ARPerspectiveCamera);

    var _this = _possibleConstructorReturn(this, (ARPerspectiveCamera.__proto__ || Object.getPrototypeOf(ARPerspectiveCamera)).call(this, fov, aspect, near, far));

    _this.isARPerpsectiveCamera = true;
    _this.vrDisplay = vrDisplay;
    _this.updateProjectionMatrix();
    return _this;
  }

  _createClass(ARPerspectiveCamera, [{
    key: "updateProjectionMatrix",
    value: function updateProjectionMatrix() {
      var intrinsics = this.getProjectionMatrix();
      if (!intrinsics) {
        _get(ARPerspectiveCamera.prototype.__proto__ || Object.getPrototypeOf(ARPerspectiveCamera.prototype), "updateProjectionMatrix", this).call(this);
        return;
      }

      this.projectionMatrix.fromArray(intrinsics);
    }
  }, {
    key: "getProjectionMatrix",
    value: function getProjectionMatrix() {
      if (this.vrDisplay && this.vrDisplay.getFrameData) {
        if (!frameData) {
          frameData = new VRFrameData();
        }
        this.vrDisplay.getFrameData(frameData);
        return frameData.projectionMatrix;
      }
      return null;
    }
  }]);

  return ARPerspectiveCamera;
}(THREE.PerspectiveCamera);

THREE.ARPerspectiveCamera = ARPerspectiveCamera;
exports.default = ARPerspectiveCamera;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var tempPos = new THREE.Vector3();
var tempPlaneDir = new THREE.Vector3();

var ARReticle = function (_THREE$Mesh) {
  _inherits(ARReticle, _THREE$Mesh);

  function ARReticle(vrDisplay) {
    var innerRadius = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.025;
    var outerRadius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.030;
    var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0xff0077;
    var easing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.25;

    _classCallCheck(this, ARReticle);

    var geometry = new THREE.RingGeometry(innerRadius, outerRadius, 36, 64);
    var material = new THREE.MeshBasicMaterial({ color: color });

    var _this = _possibleConstructorReturn(this, (ARReticle.__proto__ || Object.getPrototypeOf(ARReticle)).call(this, geometry, material));

    _this.easing = easing;
    _this.vrDisplay = vrDisplay;
    _this._planeDir = new THREE.Vector3();
    return _this;
  }

  _createClass(ARReticle, [{
    key: "update",
    value: function update() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.5;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;

      if (!this.vrDisplay || !this.vrDisplay.hitTest) {
        return;
      }

      var hit = this.vrDisplay.hitTest(x, y);
      if (hit) {
        var point = hit.point,
            plane = hit.plane;

        tempPos.fromArray(point);
        this.position.lerp(tempPos, this.easing);

        tempPlaneDir.fromArray(plane);
        this._planeDir.lerp(tempPlaneDir, this.easing);

        tempPos.addVectors(this._planeDir, this.position);
        this.lookAt(tempPos);
      }
    }
  }]);

  return ARReticle;
}(THREE.Mesh);

THREE.ARReticle = ARReticle;
exports.default = ARReticle;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
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

var _ARViewMesh = __webpack_require__(6);

var _ARViewMesh2 = _interopRequireDefault(_ARViewMesh);

var _ARUtils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A helper class that takes a VRDisplay with AR capabilities
 * and renders the see through camera to the passed in WebGLRenderer's
 * context.
 */
var ARView = function () {
  /**
   * @param {VRDisplay}
   */
  function ARView(vrDisplay) {
    _classCallCheck(this, ARView);

    this.vrDisplay = vrDisplay;
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 100);
    this.mesh = new _ARViewMesh2.default(vrDisplay);
    this.scene.add(this.mesh);
  }

  /**
   * Updates the underlying mesh's orientation if necessary.
   */


  _createClass(ARView, [{
    key: 'update',
    value: function update() {
      this.mesh.updateOrientation();
    }

    /**
     * Renders the see through camera to the passed in renderer
     *
     * @param {THREE.WebGLRenderer}
     */

  }, {
    key: 'render',
    value: function render(renderer) {
      // Don't render anything in ARKit since the platform handles
      // the see-through camera rendering.
      if ((0, _ARUtils.isARKit)(this.vrDisplay)) {
        return;
      }
      renderer.render(this.scene, this.camera);
    }
  }]);

  return ARView;
}();

;

THREE.ARView = ARView;
exports.default = ARView;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "#extension GL_OES_EGL_image_external : require\nprecision mediump float;\n#define GLSLIFY 1\n\nvarying vec2 vUV;\n\nuniform samplerExternalOES map;\n\nvoid main(void) {\n  gl_FragColor = texture2D(map, vUV);\n}\n";

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "#define GLSLIFY 1\nattribute vec3 position;\nattribute vec2 uv;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\n\nvarying vec2 vUV;\n\nvoid main(void) {\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n  vUV = uv;\n}\n";

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ARUtils = __webpack_require__(0);

var _arview = __webpack_require__(5);

var _arview2 = _interopRequireDefault(_arview);

var _arview3 = __webpack_require__(4);

var _arview4 = _interopRequireDefault(_arview3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
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

/**
 * A mesh that renders the passed in VRDisplay's see through camera,
 * if applicable.
 */
var ARViewMesh = function (_THREE$Mesh) {
  _inherits(ARViewMesh, _THREE$Mesh);

  function ARViewMesh(vrDisplay) {
    _classCallCheck(this, ARViewMesh);

    var arCamera = vrDisplay && vrDisplay.getPassThroughCamera ? vrDisplay.getPassThroughCamera() : null;

    if (!(0, _ARUtils.isARDisplay)(vrDisplay) || (0, _ARUtils.isARKit)(vrDisplay)) {
      var _this = _possibleConstructorReturn(this, (ARViewMesh.__proto__ || Object.getPrototypeOf(ARViewMesh)).call(this, new THREE.BufferGeometry(), new THREE.MeshBasicMaterial()));

      return _possibleConstructorReturn(_this);
    }

    var u = arCamera.width / arCamera.textureWidth;
    var v = arCamera.height / arCamera.textureHeight;

    // Store uvs for 4 possible orientations:
    // 0: 0 degrees
    // 1: 90 degrees
    // 2: 180 degrees
    // 3: 270 degrees
    var uvs = createARViewMeshUVs(u, v);
    var currentUVIndex = 0;

    // Create geometry with the 0 degrees orientation.
    // We will update the uv based on orientation later
    var geometry = createARViewMeshGeometry(uvs[0]);
    var material = createARViewMeshMaterial(arCamera);

    var _this = _possibleConstructorReturn(this, (ARViewMesh.__proto__ || Object.getPrototypeOf(ARViewMesh)).call(this, geometry, material));

    _this.arCamera = arCamera;

    _this.uvs = uvs;
    _this.currentUVIndex = currentUVIndex;

    _this.updateOrientation();
    return _possibleConstructorReturn(_this);
  }

  /**
  * Updates the camera mesh texture coordinates depending on the
  * orientation of the current screen and the AR camera.
  */


  _createClass(ARViewMesh, [{
    key: 'updateOrientation',
    value: function updateOrientation() {
      // If we're using a non ARDisplay, or an ARDisplay does not
      // use a camera implementation (like ARKit), ignore this
      if (!this.arCamera) {
        return;
      }

      var uvIndex = getNormalizedIndexFromOrientation(this.arCamera);

      if (uvIndex === this.currentUVIndex) {
        return;
      }

      var uvs = this.geometry.getAttribute('uv');
      var newUVs = this.uvs[uvIndex];

      for (var i = 0; i < uvs.length; i++) {
        uvs.array[i] = newUVs[i];
      }

      uvs.needsUpdate = true;
      this.currentUVIndex = uvIndex;
    }
  }]);

  return ARViewMesh;
}(THREE.Mesh);

/**
 * Create a THREE.BufferGeometry set up with the expected
 * attributes.
 *
 * @param {Float32Array<number>} uv
 * @return {THREE.BufferGeometry}
 */


function createARViewMeshGeometry(uv) {
  var geometry = new THREE.BufferGeometry();

  var positionBuffer = new Float32Array([-1.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, 1.0, 0.0, 1.0, -1.0, 0.0]);

  geometry.addAttribute('position', new THREE.BufferAttribute(positionBuffer, 3));

  geometry.addAttribute('uv', new THREE.BufferAttribute(new Float32Array(uv), 2));

  geometry.setIndex(new THREE.BufferAttribute(new Uint16Array([0, 1, 2, 2, 1, 3]), 1));

  geometry.computeBoundingSphere();

  return geometry;
}

/**
 * Create an array of 4 texture coordinate arrays (one for each orientation),
 * based off of the passed in uv values.
 *
 * @param {number} u
 * @param {number} v
 * @return {Array<Float32Array<number>>}
 */
function createARViewMeshUVs(u, v) {
  // All the possible texture coordinates for the 4 possible orientations.
  // The ratio between the texture size and the camera size is used in order
  // to be compatible with the YUV to RGB conversion option (not recommended
  // but still available).
  return [new Float32Array([0, 0, 0, v, u, 0, u, v]), new Float32Array([u, 0, 0, 0, u, v, 0, v]), new Float32Array([u, v, u, 0, 0, v, 0, 0]), new Float32Array([0, v, u, v, 0, 0, u, 0])];
}

/**
 * Creates a THREE.Material to render the video texture of an AR Camera
 * upon, or a basic material if no AR Camera provided.
 *
 * @param {VRSeeThroughCamera?} arCamera
 * @return {THREE.Material}
 */
function createARViewMeshMaterial(arCamera) {
  // The material is different if the see through camera is
  // provided inside the vrDisplay or not.
  if (!arCamera) {
    return new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      side: THREE.DoubleSide
    });
  }

  // HACK: Needed to tell the THREE.VideoTexture that the video is ready and
  // that the texture needs update.
  arCamera.readyState = 2;
  arCamera.HAVE_CURRENT_DATA = 2;

  var videoTexture = new THREE.VideoTexture(arCamera);
  videoTexture.minFilter = THREE.NearestFilter;
  videoTexture.magFilter = THREE.NearestFilter;
  videoTexture.format = THREE.RGBFormat;
  videoTexture.flipY = false;

  return new THREE.RawShaderMaterial({
    uniforms: {
      map: {
        value: videoTexture
      }
    },
    vertexShader: _arview2.default,
    fragmentShader: _arview4.default,
    side: THREE.DoubleSide
  });
};

/**
 * Maps an orientation value (0, 90, 180, 270) to the index of stored
 * uv values.
 *
 * @param {number} orientation
 * @return {number}
 */
function getIndexFromOrientation(orientation) {
  switch (orientation) {
    case 90:
      return 1;
    case 180:
      return 2;
    case 270:
      return 3;
    default:
      return 0;
  }
};

/**
* Returns an index that is based on the combination between the
* display orientation and the AR camera orientation. This index will
* always be device natural orientation independent.
*
* @param {VRSeeThroughCamera?} arCamera
* @return {number} The index from 0 to 3 that represents the
*                  combination of the device and see through camera
*                  orientations.
*/
function getNormalizedIndexFromOrientation(arCamera) {
  var cameraOrientation = arCamera ? arCamera.orientation : 0;
  var screenOrientation = screen.orientation.angle;

  var result = getIndexFromOrientation(screenOrientation) - getIndexFromOrientation(cameraOrientation);
  return (result + 4) % 4;
}

exports.default = ARViewMesh;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ARView = __webpack_require__(3);

var _ARView2 = _interopRequireDefault(_ARView);

var _ARPerspectiveCamera = __webpack_require__(1);

var _ARPerspectiveCamera2 = _interopRequireDefault(_ARPerspectiveCamera);

var _ARReticle = __webpack_require__(2);

var _ARReticle2 = _interopRequireDefault(_ARReticle);

var _ARUtils = __webpack_require__(0);

var _ARUtils2 = _interopRequireDefault(_ARUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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

/**
 * This module contains promisified loaders for internal use for
 * exposed ARUtils.
 */

var noop = function noop() {};

var loadObj = exports.loadObj = function loadObj(objPath, materials) {
  return new Promise(function (resolve, reject) {
    var loader = new THREE.OBJLoader();

    if (materials) {
      loader.setMaterials(materials);
    }

    loader.load(objPath, resolve, noop, reject);
  });
};

var loadMtl = exports.loadMtl = function loadMtl(mtlPath) {
  return new Promise(function (resolve, reject) {
    var loader = new THREE.MTLLoader();
    var pathChunks = mtlPath.split('/');

    if (pathChunks.length >= 2) {
      loader.setTexturePath(pathChunks[pathChunks.length - 2]);
    }

    loader.load(mtlPath, resolve, noop, reject);
  });
};

/***/ })
/******/ ]);