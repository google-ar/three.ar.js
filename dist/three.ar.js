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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadBlocksModel = exports.getARDisplay = exports.isARDisplay = exports.isARKit = exports.isTango = undefined;

var _loaders = __webpack_require__(4);

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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ARPerspectiveCamera = __webpack_require__(0);

var _ARPerspectiveCamera2 = _interopRequireDefault(_ARPerspectiveCamera);

var _ARReticle = __webpack_require__(1);

var _ARReticle2 = _interopRequireDefault(_ARReticle);

var _ARUtils = __webpack_require__(2);

var _ARUtils2 = _interopRequireDefault(_ARUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 4 */
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