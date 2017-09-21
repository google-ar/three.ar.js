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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayUnsupportedMessage = exports.getRandomPaletteColor = exports.placeObjectAtHit = exports.loadBlocksModel = exports.getARDisplay = exports.isARDisplay = exports.isARKit = exports.isTango = undefined;

var _loaders = __webpack_require__(13);

var colors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800'].map(function (hex) {
  return new THREE.Color(hex);
}); /*
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

var LEARN_MORE_LINK = 'https://developers.google.com/ar/develop/web/getting-started';
var UNSUPPORTED_MESSAGE = 'This augmented reality experience requires\n  WebARonARCore or WebARonARKit, experimental browsers from Google\n  for Android and iOS. Learn more at the <a href="' + LEARN_MORE_LINK + '">Google Developers site</a>.';

THREE.ARUtils = Object.create(null);

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

var model = new THREE.Matrix4();
var tempPos = new THREE.Vector3();
var tempQuat = new THREE.Quaternion();
var tempScale = new THREE.Vector3();

/**
 * Takes a THREE.Object3D and a VRHit and positions and optionally orients
 * the object according to the transform of the VRHit. Can provide an
 * easing value between 0 and 1 corresponding to the lerp between the
 * object's current position/orientation, and the position/orientation of the
 * hit.
 *
 * @param {THREE.Object3D} object
 * @param {VRHit} hit
 * @param {number} easing
 * @param {boolean} applyOrientation
 */
THREE.ARUtils.placeObjectAtHit = function (object, hit) {
  var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var applyOrientation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (!hit || !hit.modelMatrix) {
    throw new Error('placeObjectAtHit requires a VRHit object');
  }

  model.fromArray(hit.modelMatrix);

  model.decompose(tempPos, tempQuat, tempScale);

  if (easing === 1) {
    object.position.copy(tempPos);
    if (applyOrientation) {
      object.quaternion.copy(tempQuat);
    }
  } else {
    object.position.lerp(tempPos, easing);
    if (applyOrientation) {
      object.quaternion.slerp(tempQuat, easing);
    }
  }
};
var placeObjectAtHit = exports.placeObjectAtHit = THREE.ARUtils.placeObjectAtHit;

/**
 * Returns a random color from the stored palette.
 * @return {THREE.Color}
 */
THREE.ARUtils.getRandomPaletteColor = function () {
  return colors[Math.floor(Math.random() * colors.length)];
};
var getRandomPaletteColor = exports.getRandomPaletteColor = THREE.ARUtils.getRandomPaletteColor;

/**
 * Injects a DOM element into the current page prompting the user that
 * their browser does not support these AR features.
 */
THREE.ARUtils.displayUnsupportedMessage = function () {
  var element = document.createElement('div');
  element.id = 'webgl-error-message';
  element.style.fontFamily = 'monospace';
  element.style.fontSize = '13px';
  element.style.fontWeight = 'normal';
  element.style.textAlign = 'center';
  element.style.background = '#fff';
  element.style.border = '1px solid black';
  element.style.color = '#000';
  element.style.padding = '1.5em';
  element.style.width = '400px';
  element.style.margin = '5em auto 0';
  element.innerHTML = UNSUPPORTED_MESSAGE;
  document.body.appendChild(element);
};
var displayUnsupportedMessage = exports.displayUnsupportedMessage = THREE.ARUtils.displayUnsupportedMessage;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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

var _ARPlanes = __webpack_require__(11);

var _ARPlanes2 = _interopRequireDefault(_ARPlanes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULTS = {
  open: true,
  showLastHit: true,
  showPoseStatus: true,
  showPlanes: false
};

var SUCCESS_COLOR = '#00ff00';
var FAILURE_COLOR = '#ff0077';
var PLANES_POLLING_TIMER = 500;

// A cache to store original native VRDisplay methods
// since WebARonARKit does not provide a VRDisplay.prototype[method],
// and assuming the first time ARDebug proxies a method is the
// 'native' version, this caches the correct method if we proxy a method twice
var cachedVRDisplayMethods = new Map();

/**
 * A throttle function to limit number of DOM writes
 * in the ARDebug view.
 *
 * @param {Function} fn
 * @param {number} timer
 * @param {Object} scope
 *
 * @return {Function}
 */
function throttle(fn, timer, scope) {
  var lastFired = void 0;
  var timeout = void 0;

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var current = +new Date();
    var until = void 0;

    if (lastFired) {
      until = lastFired + timer - current;
    }

    if (until == undefined || until < 0) {
      lastFired = current;
      fn.apply(scope, args);
    } else if (until >= 0) {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        lastFired = current;
        fn.apply(scope, args);
      }, until);
    }
  };
}
/**
 * Class for creating a mesh that fires raycasts and lerps
 * a 3D object along the surface
 */

var ARDebug = function () {
  /**
   * @param {VRDisplay} vrDisplay
   * @param {THREE.Scene?} scene
   * @param {Object} config
   * @param {boolean} config.open
   * @param {boolean} config.showLastHit
   * @param {boolean} config.showPoseStatus
   * @param {boolean} config.showPlanes
   */
  function ARDebug(vrDisplay, scene, config) {
    _classCallCheck(this, ARDebug);

    // Make `scene` optional
    if (typeof config === 'undefined' && scene && scene.type !== 'Scene') {
      config = scene;
      scene = null;
    }

    this.config = Object.assign({}, DEFAULTS, config);
    this.vrDisplay = vrDisplay;

    this._view = new ARDebugView({ open: this.config.open });

    if (this.config.showLastHit && this.vrDisplay.hitTest) {
      this._view.addRow('hit-test', new ARDebugHitTestRow(vrDisplay));
    }

    if (this.config.showPoseStatus && this.vrDisplay.getFrameData) {
      this._view.addRow('pose-status', new ARDebugPoseRow(vrDisplay));
    }

    if (this.config.showPlanes && this.vrDisplay.getPlanes) {
      if (!scene) {
        console.warn('ARDebug `{ showPlanes: true }` option requires ' + 'passing in a THREE.Scene as the second parameter ' + 'in the constructor.');
      } else {
        this._view.addRow('show-planes', new ARDebugPlanesRow(vrDisplay, scene));
      }
    }
  }

  /**
   * Opens the debug panel.
   */


  _createClass(ARDebug, [{
    key: 'open',
    value: function open() {
      this._view.open();
    }

    /**
     * Closes the debug panel.
     */

  }, {
    key: 'close',
    value: function close() {
      this._view.close();
    }

    /**
     * Returns the root DOM element for the panel.
     *
     * @return {HTMLElement}
     */

  }, {
    key: 'getElement',
    value: function getElement() {
      return this._view.getElement();
    }
  }]);

  return ARDebug;
}();

/**
 * An implementation that interfaces with the DOM, used
 * by ARDebug
 */


var ARDebugView = function () {
  /**
   * @param {Object} config
   * @param {boolean} config.open
   */
  function ARDebugView() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ARDebugView);

    this.rows = new Map();

    this.el = document.createElement('div');
    this.el.style.backgroundColor = '#333';
    this.el.style.padding = '5px';
    this.el.style.fontFamily = 'Roboto, Ubuntu, Arial, sans-serif';
    this.el.style.color = 'rgb(165, 165, 165)';
    this.el.style.position = 'absolute';
    this.el.style.right = '20px';
    this.el.style.top = '0px';
    this.el.style.width = '200px';
    this.el.style.fontSize = '12px';
    this.el.style.zIndex = 9999;

    this._rowsEl = document.createElement('div');
    this._rowsEl.style.transitionProperty = 'max-height';
    this._rowsEl.style.transitionDuration = '0.5s';
    this._rowsEl.style.transitionDelay = '0s';
    this._rowsEl.style.transitionTimingFunction = 'ease-out';
    this._rowsEl.style.overflow = 'hidden';

    this._controls = document.createElement('div');
    this._controls.style.fontSize = '13px';
    this._controls.style.fontWeight = 'bold';
    this._controls.style.paddingTop = '5px';
    this._controls.style.textAlign = 'center';
    this._controls.style.cursor = 'pointer';
    this._controls.addEventListener('click', this.toggleControls.bind(this));

    // Initialize the view as open or closed
    config.open ? this.open() : this.close();

    this.el.appendChild(this._rowsEl);
    this.el.appendChild(this._controls);
  }

  /**
   * Toggles between open and close modes.
   */


  _createClass(ARDebugView, [{
    key: 'toggleControls',
    value: function toggleControls() {
      if (this._isOpen) {
        this.close();
      } else {
        this.open();
      }
    }

    /**
     * Opens the debugging panel.
     */

  }, {
    key: 'open',
    value: function open() {
      // Use max-height with large value to transition
      // to/from a non-specific height (like auto/100%)
      // https://stackoverflow.com/a/8331169
      // @TODO investigate a more complete solution with correct timing,
      // via something like http://n12v.com/css-transition-to-from-auto/
      this._rowsEl.style.maxHeight = '100px';
      this._isOpen = true;
      this._controls.textContent = 'Close ARDebug';
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.rows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              row = _step$value[1];

          row.enable();
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
    }

    /**
     * Closes the debugging panel.
     */

  }, {
    key: 'close',
    value: function close() {
      this._rowsEl.style.maxHeight = '0px';
      this._isOpen = false;
      this._controls.textContent = 'Open ARDebug';
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.rows[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              row = _step2$value[1];

          row.disable();
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }

    /**
     * Returns the ARDebugView root element.
     *
     * @return {HTMLElement}
     */

  }, {
    key: 'getElement',
    value: function getElement() {
      return this.el;
    }

    /**
     * Adds a row to the ARDebugView.
     *
     * @param {string} id
     * @param {ARDebugRow} row
     */

  }, {
    key: 'addRow',
    value: function addRow(id, row) {
      this.rows.set(id, row);

      if (this._isOpen) {
        row.enable();
      }

      this._rowsEl.appendChild(row.getElement());
    }
  }]);

  return ARDebugView;
}();

/**
 * A class that implements features being a row in the ARDebugView.
 */


var ARDebugRow = function () {
  /**
   * @param {string} title
   */
  function ARDebugRow(title) {
    _classCallCheck(this, ARDebugRow);

    this.el = document.createElement('div');
    this.el.style.width = '100%';
    this.el.style.borderTop = '1px solid rgb(54, 54, 54)';
    this.el.style.borderBottom = '1px solid #14171A';
    this.el.style.position = 'relative';
    this.el.style.padding = '3px 0px';
    this.el.style.overflow = 'hidden';

    this._titleEl = document.createElement('span');
    this._titleEl.style.fontWeight = 'bold';
    this._titleEl.textContent = title;

    this._dataEl = document.createElement('span');
    this._dataEl.style.position = 'absolute';
    this._dataEl.style.left = '40px';

    // Create a text element to update so we can avoid
    // forced reflows when updating
    // https://stackoverflow.com/a/17203046
    this._dataElText = document.createTextNode('');
    this._dataEl.appendChild(this._dataElText);

    this.el.appendChild(this._titleEl);
    this.el.appendChild(this._dataEl);

    this.update = throttle(this.update, 500, this);
  }

  /**
   * Enables the proxying and inspection functionality of
   * this row. Should be implemented by child class.
   */


  _createClass(ARDebugRow, [{
    key: 'enable',
    value: function enable() {
      throw new Error('Implement in child class');
    }

    /**
     * Disables the proxying and inspection functionality of
     * this row. Should be implemented by child class.
     */

  }, {
    key: 'disable',
    value: function disable() {
      throw new Error('Implement in child class');
    }

    /**
     * Returns the ARDebugRow's root element.
     *
     * @return {HTMLElement}
     */

  }, {
    key: 'getElement',
    value: function getElement() {
      return this.el;
    }

    /**
     * Updates the row's value.
     *
     * @param {string} value
     * @param {boolean} isSuccess
     */

  }, {
    key: 'update',
    value: function update(value, isSuccess) {
      this._dataElText.nodeValue = value;
      this._dataEl.style.color = isSuccess ? SUCCESS_COLOR : FAILURE_COLOR;
    }
  }]);

  return ARDebugRow;
}();

/**
 * The ARDebugRow subclass for displaying hit information
 * by wrapping `vrDisplay.hitTest` and displaying the results.
 */


var ARDebugHitTestRow = function (_ARDebugRow) {
  _inherits(ARDebugHitTestRow, _ARDebugRow);

  /**
   * @param {VRDisplay} vrDisplay
   */
  function ARDebugHitTestRow(vrDisplay) {
    _classCallCheck(this, ARDebugHitTestRow);

    var _this = _possibleConstructorReturn(this, (ARDebugHitTestRow.__proto__ || Object.getPrototypeOf(ARDebugHitTestRow)).call(this, 'Hit'));

    _this.vrDisplay = vrDisplay;
    _this._onHitTest = _this._onHitTest.bind(_this);

    // Store the native hit test, or proxy the native `hitTest` call with our own
    _this._nativeHitTest = cachedVRDisplayMethods.get('hitTest') || _this.vrDisplay.hitTest;
    cachedVRDisplayMethods.set('hitTest', _this._nativeHitTest);

    _this._didPreviouslyHit = null;
    return _this;
  }

  /**
   * Enables the tracking of hit test information.
   */


  _createClass(ARDebugHitTestRow, [{
    key: 'enable',
    value: function enable() {
      this.vrDisplay.hitTest = this._onHitTest;
    }

    /**
     * Disables the tracking of hit test information.
     */

  }, {
    key: 'disable',
    value: function disable() {
      this.vrDisplay.hitTest = this._nativeHitTest;
    }

    /**
     * @param {VRHit} hit
     * @return {string}
     */

  }, {
    key: '_hitToString',
    value: function _hitToString(hit) {
      var mm = hit.modelMatrix;
      return mm[12].toFixed(2) + ', ' + mm[13].toFixed(2) + ', ' + mm[14].toFixed(2);
    }

    /**
     * @param {number} x
     * @param {number} y
     * @return {VRHit?}
     */

  }, {
    key: '_onHitTest',
    value: function _onHitTest(x, y) {
      var hits = this._nativeHitTest.call(this.vrDisplay, x, y);

      var t = (parseInt(performance.now(), 10) / 1000).toFixed(1);
      var didHit = hits && hits.length;

      this.update((didHit ? this._hitToString(hits[0]) : 'MISS') + ' @ ' + t + 's', didHit);
      this._didPreviouslyHit = didHit;
      return hits;
    }
  }]);

  return ARDebugHitTestRow;
}(ARDebugRow);

/**
 * The ARDebugRow subclass for displaying pose information
 * by wrapping `vrDisplay.getFrameData` and displaying the results.
 */


var ARDebugPoseRow = function (_ARDebugRow2) {
  _inherits(ARDebugPoseRow, _ARDebugRow2);

  /**
   * @param {VRDisplay} vrDisplay
   */
  function ARDebugPoseRow(vrDisplay) {
    _classCallCheck(this, ARDebugPoseRow);

    var _this2 = _possibleConstructorReturn(this, (ARDebugPoseRow.__proto__ || Object.getPrototypeOf(ARDebugPoseRow)).call(this, 'Pose'));

    _this2.vrDisplay = vrDisplay;
    _this2._onGetFrameData = _this2._onGetFrameData.bind(_this2);

    // Store the native hit test, or proxy the native `hitTest` call with our own
    _this2._nativeGetFrameData = cachedVRDisplayMethods.get('getFrameData') || _this2.vrDisplay.getFrameData;
    cachedVRDisplayMethods.set('getFrameData', _this2._nativeGetFrameData);

    _this2.update('Looking for position...');
    _this2._initialPose = false;
    return _this2;
  }

  /**
   * Enables displaying and pulling getFrameData
   */


  _createClass(ARDebugPoseRow, [{
    key: 'enable',
    value: function enable() {
      this.vrDisplay.getFrameData = this._onGetFrameData;
    }

    /**
     * Disables displaying and pulling getFrameData
     */

  }, {
    key: 'disable',
    value: function disable() {
      this.vrDisplay.getFrameData = this._nativeGetFrameData;
    }

    /**
     * @param {VRPose} pose
     * @return {string}
     */

  }, {
    key: '_poseToString',
    value: function _poseToString(pose) {
      return pose[0].toFixed(2) + ', ' + pose[1].toFixed(2) + ', ' + pose[2].toFixed(2);
    }

    /**
     * Wrapper around getFrameData
     *
     * @param {VRFrameData} frameData
     * @return {boolean}
     */

  }, {
    key: '_onGetFrameData',
    value: function _onGetFrameData(frameData) {
      var results = this._nativeGetFrameData.call(this.vrDisplay, frameData);
      var pose = frameData && frameData.pose && frameData.pose.position;
      // Ensure we have a valid pose; while the pose SHOULD be null when not
      // provided by the VRDisplay, on WebARonARCore, the xyz values of position
      // are all 0 -- mark this as an invalid pose
      var isValidPose = pose && typeof pose[0] === 'number' && typeof pose[1] === 'number' && typeof pose[2] === 'number' && !(pose[0] === 0 && pose[1] === 0 && pose[2] === 0);

      // If we haven't received a pose yet, and still don't have a valid pose
      // leave the message how it is
      if (!this._initialPose && !isValidPose) {
        return results;
      }

      if (isValidPose) {
        this.update(this._poseToString(pose), true);
      } else if (!isValidPose && this._lastPoseValid !== false) {
        this.update('Position lost', false);
      }

      this._lastPoseValid = isValidPose;
      this._initialPose = true;

      return results;
    }
  }]);

  return ARDebugPoseRow;
}(ARDebugRow);

/**
 * The ARDebugRow subclass for displaying planes information
 * by wrapping polling getPlanes, and rendering.
 */


var ARDebugPlanesRow = function (_ARDebugRow3) {
  _inherits(ARDebugPlanesRow, _ARDebugRow3);

  /**
   * @param {VRDisplay} vrDisplay
   * @param {THREE.Scene} scene
   */
  function ARDebugPlanesRow(vrDisplay, scene) {
    _classCallCheck(this, ARDebugPlanesRow);

    var _this3 = _possibleConstructorReturn(this, (ARDebugPlanesRow.__proto__ || Object.getPrototypeOf(ARDebugPlanesRow)).call(this, 'Planes'));

    _this3.vrDisplay = vrDisplay;
    _this3.planes = new _ARPlanes2.default(_this3.vrDisplay);
    _this3._onPoll = _this3._onPoll.bind(_this3);
    _this3.update('Looking for planes...');
    if (scene) {
      scene.add(_this3.planes);
    }
    return _this3;
  }

  /**
   * Enables displaying and pulling getFrameData
   */


  _createClass(ARDebugPlanesRow, [{
    key: 'enable',
    value: function enable() {
      if (this._timer) {
        this.disable();
      }
      this._timer = setInterval(this._onPoll, PLANES_POLLING_TIMER);
    }

    /**
     * Disables displaying and pulling getFrameData
     */

  }, {
    key: 'disable',
    value: function disable() {
      clearInterval(this._timer);
      this._timer = null;
      this.planes.clear();
    }

    /**
     * @param {number} count
     * @return {string}
     */

  }, {
    key: '_planesToString',
    value: function _planesToString(count) {
      return count + ' plane' + (count === 1 ? '' : 's') + ' found';
    }

    /**
     * Polling callback while enabled, used to fetch and orchestrate
     * plane rendering.
     */

  }, {
    key: '_onPoll',
    value: function _onPoll() {
      var planeCount = this.planes.update();
      this.update(this._planesToString(planeCount), planeCount > 0);
    }
  }]);

  return ARDebugPlanesRow;
}(ARDebugRow);

THREE.ARDebug = ARDebug;
exports.default = ARDebug;

/***/ }),
/* 2 */
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

/**
 * Class extending a THREE.PerspectiveCamera, attempting
 * to use the projection matrix provided from an AR-enabled
 * VRDisplay. If no AR-enabled VRDisplay found, uses provided
 * parameters.
 */

var ARPerspectiveCamera = function (_THREE$PerspectiveCam) {
  _inherits(ARPerspectiveCamera, _THREE$PerspectiveCam);

  /**
   * @param {VRDisplay} vrDisplay
   * @param {number} fov
   * @param {number} aspect
   * @param {number} near
   * @param {number} far
   */
  function ARPerspectiveCamera(vrDisplay, fov, aspect, near, far) {
    _classCallCheck(this, ARPerspectiveCamera);

    var _this = _possibleConstructorReturn(this, (ARPerspectiveCamera.__proto__ || Object.getPrototypeOf(ARPerspectiveCamera)).call(this, fov, aspect, near, far));

    _this.isARPerpsectiveCamera = true;
    _this.vrDisplay = vrDisplay;
    _this.updateProjectionMatrix();

    if (!vrDisplay || !vrDisplay.capabilities.hasPassThroughCamera) {
      console.warn("ARPerspectiveCamera does not a VRDisplay with\n                    a pass through camera. Using supplied values and defaults\n                    instead of device camera intrinsics");
    }
    return _this;
  }

  /**
   * Updates the underlying `projectionMatrix` property from
   * the AR-enabled VRDisplay, or falls back to
   * THREE.PerspectiveCamera.prototype.updateProjectionMatrix
   */


  _createClass(ARPerspectiveCamera, [{
    key: "updateProjectionMatrix",
    value: function updateProjectionMatrix() {
      var projMatrix = this.getProjectionMatrix();
      if (!projMatrix) {
        _get(ARPerspectiveCamera.prototype.__proto__ || Object.getPrototypeOf(ARPerspectiveCamera.prototype), "updateProjectionMatrix", this).call(this);
        return;
      }

      this.projectionMatrix.fromArray(projMatrix);
    }

    /**
     * Gets the projection matrix from AR-enabled VRDisplay
     * if possible.
     * @return {!Float32Array}
     */

  }, {
    key: "getProjectionMatrix",
    value: function getProjectionMatrix() {
      if (this.vrDisplay && this.vrDisplay.getFrameData) {
        if (!frameData) {
          frameData = new VRFrameData();
        }
        this.vrDisplay.getFrameData(frameData);

        // Can use either left or right projection matrix
        return frameData.leftProjectionMatrix;
      }
      return null;
    }
  }]);

  return ARPerspectiveCamera;
}(THREE.PerspectiveCamera);

THREE.ARPerspectiveCamera = ARPerspectiveCamera;
exports.default = ARPerspectiveCamera;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ARUtils = __webpack_require__(0);

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
 * Class for creating a mesh that fires raycasts and lerps
 * a 3D object along the surface
 */
var ARReticle = function (_THREE$Mesh) {
  _inherits(ARReticle, _THREE$Mesh);

  /**
   * @param {VRDisplay} vrDisplay
   * @param {number} innerRadius
   * @param {number} outerRadius
   * @param {number} color
   * @param {number} easing
   */
  function ARReticle(vrDisplay) {
    var innerRadius = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.02;
    var outerRadius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.05;
    var color = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0xff0077;
    var easing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.25;

    _classCallCheck(this, ARReticle);

    var geometry = new THREE.RingGeometry(innerRadius, outerRadius, 36, 64);
    var material = new THREE.MeshBasicMaterial({ color: color });

    // Orient the geometry so it's position is flat on a horizontal surface
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(THREE.Math.degToRad(-90)));

    var _this = _possibleConstructorReturn(this, (ARReticle.__proto__ || Object.getPrototypeOf(ARReticle)).call(this, geometry, material));

    _this.visible = false;

    _this.easing = easing;
    _this.applyOrientation = true;
    _this.vrDisplay = vrDisplay;
    _this._planeDir = new THREE.Vector3();
    return _this;
  }

  /**
   * Attempt to fire a raycast from normalized screen coordinates
   * x and y and lerp the reticle to the position.
   *
   * @param {number} x
   * @param {number} y
   */


  _createClass(ARReticle, [{
    key: 'update',
    value: function update() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.5;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;

      if (!this.vrDisplay || !this.vrDisplay.hitTest) {
        return;
      }

      var hit = this.vrDisplay.hitTest(x, y);
      if (hit && hit.length > 0) {
        this.visible = true;
        (0, _ARUtils.placeObjectAtHit)(this, hit[0], this.applyOrientation, this.easing);
      }
    }
  }]);

  return ARReticle;
}(THREE.Mesh);

THREE.ARReticle = ARReticle;
exports.default = ARReticle;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

/* eslint-disable */
(function () {
  if (window.webarSpeechRecognitionInstance) {
    var addEventHandlingToObject = function addEventHandlingToObject(object) {
      object.listeners = {};
      object.addEventListener = function (eventType, callback) {
        if (!callback) {
          return this;
        }
        var listeners = this.listeners[eventType];
        if (!listeners) {
          this.listeners[eventType] = listeners = [];
        }
        if (listeners.indexOf(callback) < 0) {
          listeners.push(callback);
        }
        return this;
      };
      object.removeEventListener = function (eventType, callback) {
        if (!callback) {
          return this;
        }
        var listeners = this.listeners[eventType];
        if (listeners) {
          var i = listeners.indexOf(callback);
          if (i >= 0) {
            this.listeners[eventType] = listeners.splice(i, 1);
          }
        }
        return this;
      };
      object.callEventListeners = function (eventType, event) {
        if (!event) {
          event = { target: this };
        }
        if (!event.target) {
          event.target = this;
        }
        event.type = eventType;
        var onEventType = 'on' + eventType;
        if (typeof this[onEventType] === 'function') {
          this[onEventType](event);
        }
        var listeners = this.listeners[eventType];
        if (listeners) {
          for (var i = 0; i < listeners.length; i++) {
            var typeofListener = _typeof(listeners[i]);
            if (typeofListener === 'object') {
              listeners[i].handleEvent(event);
            } else if (typeofListener === 'function') {
              listeners[i](event);
            }
          }
        }
        return this;
      };
    };

    addEventHandlingToObject(window.webarSpeechRecognitionInstance);
    var originalWebKitSpeechRecognition = window.webkitSpeechRecognition;
    window.webkitSpeechRecognition = function () {
      return window.webarSpeechRecognitionInstance;
    };
  }
})();

/***/ }),
/* 5 */
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

var _ARUtils = __webpack_require__(0);

var _arview = __webpack_require__(10);

var _arview2 = _interopRequireDefault(_arview);

var _arview3 = __webpack_require__(9);

var _arview4 = _interopRequireDefault(_arview3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Creates and load a shader from a string, type specifies either 'vertex' or 'fragment'
 *
 * @param {WebGLRenderingContext} gl
 * @param {string} str
 * @param {string} type
 * @return {!WebGLShader}
 */
function getShader(gl, str, type) {
  var shader = void 0;
  if (type == 'fragment') {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (type == 'vertex') {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;
  }

  gl.shaderSource(shader, str);
  gl.compileShader(shader);

  var result = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!result) {
    alert(gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

/**
 * Creates a shader program from vertex and fragment shader sources
 *
 * @param {WebGLRenderingContext} gl
 * @param {string} vs
 * @param {string} fs
 * @return {!WebGLProgram}
 */
function getProgram(gl, vs, fs) {
  var vertexShader = getShader(gl, vs, 'vertex');
  var fragmentShader = getShader(gl, fs, 'fragment');
  if (!fragmentShader) {
    return null;
  }

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  var result = gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);
  if (!result) {
    alert('Could not initialise arview shaders');
  }

  return shaderProgram;
}

/**
 * Calculate the correct orientation depending on the device and the camera
 * orientations.
 *
 * @param {number} screenOrientation
 * @param {number} seeThroughCameraOrientation
 * @return {number}
 */
function combineOrientations(screenOrientation, seeThroughCameraOrientation) {
  var seeThroughCameraOrientationIndex = 0;
  switch (seeThroughCameraOrientation) {
    case 90:
      seeThroughCameraOrientationIndex = 1;
      break;
    case 180:
      seeThroughCameraOrientationIndex = 2;
      break;
    case 270:
      seeThroughCameraOrientationIndex = 3;
      break;
    default:
      seeThroughCameraOrientationIndex = 0;
      break;
  }
  var screenOrientationIndex = 0;
  switch (screenOrientation) {
    case 90:
      screenOrientationIndex = 1;
      break;
    case 180:
      screenOrientationIndex = 2;
      break;
    case 270:
      screenOrientationIndex = 3;
      break;
    default:
      screenOrientationIndex = 0;
      break;
  }
  var ret = screenOrientationIndex - seeThroughCameraOrientationIndex;
  if (ret < 0) {
    ret += 4;
  }
  return ret % 4;
}

/**
 * Renders the ar camera's video texture
 */

var ARVideoRenderer = function () {
  /**
   * @param {VRDisplay} vrDisplay
   * @param {WebGLRenderingContext} gl
   */
  function ARVideoRenderer(vrDisplay, gl) {
    _classCallCheck(this, ARVideoRenderer);

    this.vrDisplay = vrDisplay;
    this.gl = gl;
    if (this.vrDisplay) {
      this.passThroughCamera = vrDisplay.getPassThroughCamera();
      this.program = getProgram(gl, _arview2.default, _arview4.default);
    }

    gl.useProgram(this.program);

    // Setup a quad
    this.vertexPositionAttribute = gl.getAttribLocation(this.program, 'aVertexPosition');
    this.textureCoordAttribute = gl.getAttribLocation(this.program, 'aTextureCoord');

    this.samplerUniform = gl.getUniformLocation(this.program, 'uSampler');

    this.vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
    var vertices = [-1.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, 1.0, 0.0, 1.0, -1.0, 0.0];
    var f32Vertices = new Float32Array(vertices);
    gl.bufferData(gl.ARRAY_BUFFER, f32Vertices, gl.STATIC_DRAW);
    this.vertexPositionBuffer.itemSize = 3;
    this.vertexPositionBuffer.numItems = 12;

    this.textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
    // Precalculate different texture UV coordinates depending on the possible
    // orientations of the device depending if there is a VRDisplay or not
    var textureCoords = null;
    if (this.vrDisplay) {
      var u = this.passThroughCamera.width / this.passThroughCamera.textureWidth;
      var v = this.passThroughCamera.height / this.passThroughCamera.textureHeight;
      textureCoords = [[0.0, 0.0, 0.0, v, u, 0.0, u, v], [u, 0.0, 0.0, 0.0, u, v, 0.0, v], [u, v, u, 0.0, 0.0, v, 0.0, 0.0], [0.0, v, u, v, 0.0, 0.0, u, 0.0]];
    } else {
      textureCoords = [[0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0], [1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0], [1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0], [0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0]];
    }

    this.f32TextureCoords = [];
    for (var i = 0; i < textureCoords.length; i++) {
      this.f32TextureCoords.push(new Float32Array(textureCoords[i]));
    }
    // Store the current combined orientation to check if it has changed
    // during the update calls and use the correct texture coordinates.
    this.combinedOrientation = combineOrientations(screen.orientation.angle, this.passThroughCamera.orientation);

    gl.bufferData(gl.ARRAY_BUFFER, this.f32TextureCoords[this.combinedOrientation], gl.STATIC_DRAW);
    this.textureCoordBuffer.itemSize = 2;
    this.textureCoordBuffer.numItems = 8;
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    var indices = [0, 1, 2, 2, 1, 3];
    var ui16Indices = new Uint16Array(indices);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, ui16Indices, gl.STATIC_DRAW);
    this.indexBuffer.itemSize = 1;
    this.indexBuffer.numItems = 6;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    this.texture = gl.createTexture();
    gl.useProgram(null);

    // The projection matrix will be based on an identify orthographic camera
    this.projectionMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    this.mvMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    return this;
  }

  /**
   * Renders the quad
   */


  _createClass(ARVideoRenderer, [{
    key: 'render',
    value: function render() {
      var gl = this.gl;
      gl.useProgram(this.program);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
      gl.enableVertexAttribArray(this.vertexPositionAttribute);
      gl.vertexAttribPointer(this.vertexPositionAttribute, this.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);

      // Check the current orientation of the device combined with the
      // orientation of the VRSeeThroughCamera to determine the correct UV
      // coordinates to be used.
      var combinedOrientation = combineOrientations(screen.orientation.angle, this.passThroughCamera.orientation);
      if (combinedOrientation !== this.combinedOrientation) {
        this.combinedOrientation = combinedOrientation;
        gl.bufferData(gl.ARRAY_BUFFER, this.f32TextureCoords[this.combinedOrientation], gl.STATIC_DRAW);
      }
      gl.enableVertexAttribArray(this.textureCoordAttribute);
      gl.vertexAttribPointer(this.textureCoordAttribute, this.textureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_EXTERNAL_OES, this.texture);
      // Update the content of the texture in every frame.
      gl.texImage2D(gl.TEXTURE_EXTERNAL_OES, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, this.passThroughCamera);
      gl.uniform1i(this.samplerUniform, 0);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

      gl.drawElements(gl.TRIANGLES, this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

      // Disable enabled states to allow other render calls to correctly work
      gl.bindTexture(gl.TEXTURE_EXTERNAL_OES, null);
      gl.disableVertexAttribArray(this.vertexPositionAttribute);
      gl.disableVertexAttribArray(this.textureCoordAttribute);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
      gl.useProgram(null);
    }
  }]);

  return ARVideoRenderer;
}();

/**
 * A helper class that takes a VRDisplay with AR capabilities
 * and renders the see through camera to the passed in WebGLRenderer's
 * context.
 */


var ARView = function () {
  /**
   * @param {VRDisplay} vrDisplay
   * @param {THREE.WebGLRenderer} renderer
   */
  function ARView(vrDisplay, renderer) {
    _classCallCheck(this, ARView);

    this.vrDisplay = vrDisplay;
    if ((0, _ARUtils.isARKit)(this.vrDisplay)) {
      return;
    }
    this.renderer = renderer;
    this.gl = renderer.context;

    this.videoRenderer = new ARVideoRenderer(vrDisplay, this.gl);
    this._resetGLState();

    // Cache the width/height so we're not potentially forcing
    // a reflow if there's been a style invalidation
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }

  /**
   * Updates the stored width/height of window on resize.
   */


  _createClass(ARView, [{
    key: 'onWindowResize',
    value: function onWindowResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    }

    /**
     * Renders the see through camera to the passed in renderer
     */

  }, {
    key: 'render',
    value: function render() {
      if ((0, _ARUtils.isARKit)(this.vrDisplay)) {
        return;
      }

      var gl = this.gl;
      var dpr = window.devicePixelRatio;
      var width = this.width * dpr;
      var height = this.height * dpr;

      if (gl.viewportWidth !== width) {
        gl.viewportWidth = width;
      }

      if (gl.viewportHeight !== height) {
        gl.viewportHeight = height;
      }

      this.gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
      this.videoRenderer.render();
      this._resetGLState();
    }

    /**
     * Resets the GL state in the THREE.WebGLRenderer.
     */

  }, {
    key: '_resetGLState',
    value: function _resetGLState() {
      if (typeof this.renderer.resetGLState === 'function') {
        // If using three.js <= r86
        this.renderer.resetGLState();
      } else {
        // If using three.js >= r87
        this.renderer.state.reset();
      }
    }
  }]);

  return ARView;
}();

THREE.ARView = ARView;
exports.default = ARView;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "data:image/png;base64,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/GMzLdsAAEE7aVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzExMSA3OS4xNTgzMjUsIDIwMTUvMDkvMTAtMDE6MTA6MjAgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiCiAgICAgICAgICAgIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNy0wOC0wOVQxNzoyMTozNi0wNDowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTctMDgtMTZUMTM6Mzc6NDgtMDQ6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE3LTA4LTE2VDEzOjM3OjQ4LTA0OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDpiZDg0YTVmYy1iODc3LTRlMWQtYjUxMy02NGUxMzFkMWFkMmI8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDowNWZkZDNjOS1jMzM4LTExN2EtYTAzOC1hN2Y3ZDE5MDY4YTI8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDoxRUQxN0JCOTQ4N0RFNzExQTQ5OUE0QjlEN0FDMzEyRDwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDoxRUQxN0JCOTQ4N0RFNzExQTQ5OUE0QjlEN0FDMzEyRDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0wOC0wOVQxNzoyMTozNi0wNDowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjFGRDE3QkI5NDg3REU3MTFBNDk5QTRCOUQ3QUMzMTJEPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTA4LTA5VDE3OjM4OjMyLTA0OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6NTJlOTEyOWMtMzRiYy00MjI0LTg5NWQtNTZlNDIzY2Y1ODI5PC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTA4LTE2VDEzOjM3OjQ4LTA0OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNvbnZlcnRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6cGFyYW1ldGVycz5mcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nPC9zdEV2dDpwYXJhbWV0ZXJzPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+ZGVyaXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6cGFyYW1ldGVycz5jb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZzwvc3RFdnQ6cGFyYW1ldGVycz4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6YmQ4NGE1ZmMtYjg3Ny00ZTFkLWI1MTMtNjRlMTMxZDFhZDJiPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE3LTA4LTE2VDEzOjM3OjQ4LTA0OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8eG1wTU06RGVyaXZlZEZyb20gcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICA8c3RSZWY6aW5zdGFuY2VJRD54bXAuaWlkOjUyZTkxMjljLTM0YmMtNDIyNC04OTVkLTU2ZTQyM2NmNTgyOTwvc3RSZWY6aW5zdGFuY2VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDoxRUQxN0JCOTQ4N0RFNzExQTQ5OUE0QjlEN0FDMzEyRDwvc3RSZWY6ZG9jdW1lbnRJRD4KICAgICAgICAgICAgPHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjFFRDE3QkI5NDg3REU3MTFBNDk5QTRCOUQ3QUMzMTJEPC9zdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDwveG1wTU06RGVyaXZlZEZyb20+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDxwaG90b3Nob3A6SUNDUHJvZmlsZT5zUkdCIElFQzYxOTY2LTIuMTwvcGhvdG9zaG9wOklDQ1Byb2ZpbGU+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjI5MjU3MTAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjI5MjU3MTAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+MjA0ODwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4yMDQ4PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz5uDkuBAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAe6ESURBVHja7N3Nbyz7fdhp9gvZfH9psk+/Rfa9k8CR4gtNBtZkEGQCCEaAZDHJH5AA2XoykyBZGAOMF3Y29sLINkAUDKBBFlp5pZWAZFYDTCxnY1/Ikq0okGTdfmOTzfcmu9ldNQtaxdI51Tw8PM1mNft5VtUsHR72r+rDun2+6q7Mv/pX/2qJdPg3/+bf5HK5KX7D8Xj8m7/5mxYWtAaKA61pDeQGQrOwoLgFlLUE6dHv91P+DUFrWgPFgdZAbnIDoYHiFDcvDABSpNvtpvwbgta0BooDrYHc5AZCA8Upbl4YAKTIT37yk5R/Q9Ca1kBxoDWQm9xAaKA4xc2L/B//8R9bhZQIw/DXf/3Xp/gNv/3tb//Jn/yJhQWtgeJAa1oDuYHQLCwobgF5B0CKfP75541GY1rfrdFofP7551YVtAaKA61pDeQGQrOqoLjFZACQ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igOtgdzkBkIDxSkORpLGfQcA77zzjssKY0hDa6A40BrITW4gNFCc4mAkadx3AFAoFFxWGEMaWgPFgdZAbnIDoYHiFAcjSeO+A4CVlRWXFcaQhtZAcaA1kJvcQGigOMXBSNKYd7EAAAAAAGD63HcAcHFx4WLBGNLQGigOtAZykxsIDRSnOBhJGvcdADSbTZcVxpCG1kBxoDWQm9xAaKA4xcFI0li453/3jW984z//5//sysKbafx3/91/N9oPqDVQHGgN5CY3EBooTnHw9NbuewLgP/7H/+iywhjS0BooDrQGcpMbCA0UpzgYSRr3GgDs7e198MEHLiu86YMPPtjb2xvVR9MaKA60BnKTGwgNFKc4GFVr9xoAfPWrX+33+y4rvKnf73/1q18d1UfTGigOtAZykxsIDRSnOBhVa28fAPzlX/7l1772NdcUonzta1/77ne/+/SPozVQHGgNZjO3v/zLv5QbeF4DxSkOnqO1twwALi8vf+/3fu/29tYFhSi3t7e///u/f3l5+ZQP0ul0tAb3L67T6Tzlg3h2A89ukKjc/u//+//21Aae18B3bZ7a4Dme3dK/+7u/G3Vbt9v9nd/5nQ8//NDVhHgnJyc//OEPf+mXfml+fv4R/3uv1/ujP/qjb33rW098doQZ0el0rq6ufu7nfu5xxXW73d/7vd/71re+5UrCcz+7/dt/+2+/+c1vdrtdFxNiLC0t5XK5arX6d//u3330U5tv3MDzGiRKv9+/uLh4ylOb79rgns9u3/ve9770pS/FtBY5AOh0Ov/X//V//emf/qnrCPexuLi4v7///vvvLywsPOh/7HQ6f/RHf/TRRx8tLy8fHh66kvBWf+Nv/I12u/2jH/3occX98R//8ccff3x0dORKwnM/u3388cfZbFZu8NbntWw2e3Bw8Ointv/z//w///2///euJHheg4RIpVLvvvvu8fGx79pgDKrV6sXFxX//3//3Ua2FDwA+/fTTP/zDP/zRj37U6/UuLi5cR4i3sbFRLBYPDg4++OCDd99999WrV/f8H+9a+8EPfjA3N7ewsKA4uGduc3NzTykum81eXl46cwNjeHaTG9zzee0pT217e3tCA89rkByFQiGfz/uuDcZWXLfbjWktNbRK+/Dw8Otf//o3vvGNu1/v9XofffSRA24QI5VKvffee9ls9u7dfr//P/wP/8Ov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";

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "// Copyright 2017 Google Inc. All Rights Reserved.\n// Licensed under the Apache License, Version 2.0 (the 'License');\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n// http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an 'AS IS' BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\nprecision mediump float;\n#define GLSLIFY 1\n\nuniform sampler2D uTexture;\nuniform vec3 uColor;\n\nvarying vec3 vPosition;\n\nvoid main() {\n  vec4 textureColor = texture2D(uTexture, vPosition.xz * 1.5);\n  gl_FragColor = vec4((uColor * textureColor.rgb) + (uColor * 0.25), 0.4);\n}\n";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "// Copyright 2017 Google Inc. All Rights Reserved.\n// Licensed under the Apache License, Version 2.0 (the 'License');\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n// http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an 'AS IS' BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\nprecision mediump float;\nprecision mediump int;\n#define GLSLIFY 1\n\nuniform mat4 modelViewMatrix;\nuniform mat4 modelMatrix;\nuniform mat4 projectionMatrix;\n\nattribute vec3 position;\n\nvarying vec3 vPosition;\n\nvoid main() {\n  vPosition = (modelMatrix * vec4(position, 1.0)).xyz;\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "// Copyright 2017 Google Inc. All Rights Reserved.\n// Licensed under the Apache License, Version 2.0 (the 'License');\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n// http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an 'AS IS' BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n#extension GL_OES_EGL_image_external : require\n\nprecision mediump float;\n#define GLSLIFY 1\n\nvarying vec2 vTextureCoord;\n\nuniform samplerExternalOES uSampler;\n\nvoid main(void) {\n  gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = "#define GLSLIFY 1\n// Copyright 2017 Google Inc. All Rights Reserved.\n// Licensed under the Apache License, Version 2.0 (the 'License');\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n// http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an 'AS IS' BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n  gl_Position = vec4(aVertexPosition, 1.0);\n  vTextureCoord = aTextureCoord;\n}\n";

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ARUtils = __webpack_require__(0);

var _arplanes = __webpack_require__(8);

var _arplanes2 = _interopRequireDefault(_arplanes);

var _arplanes3 = __webpack_require__(7);

var _arplanes4 = _interopRequireDefault(_arplanes3);

var _plane = __webpack_require__(6);

var _plane2 = _interopRequireDefault(_plane);

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

var texture = new THREE.TextureLoader().load(_plane2.default);
texture.wrapS = THREE.MirroredRepeatWrapping;
texture.wrapT = THREE.MirroredRepeatWrapping;

var DEFAULT_MATERIAL = new THREE.RawShaderMaterial({
  side: THREE.DoubleSide,
  transparent: true,
  uniforms: {
    uTexture: {
      value: texture
    },
    uColor: {
      value: new THREE.Color(0x000000)
    }
  },
  vertexShader: _arplanes2.default,
  fragmentShader: _arplanes4.default
});

/**
 * The ARDebugRow subclass for displaying planes information
 * by wrapping polling getPlanes, and rendering.
 */

var ARPlanes = function (_THREE$Object3D) {
  _inherits(ARPlanes, _THREE$Object3D);

  /**
   * @param {VRDisplay} vrDisplay
   */
  function ARPlanes(vrDisplay) {
    _classCallCheck(this, ARPlanes);

    var _this = _possibleConstructorReturn(this, (ARPlanes.__proto__ || Object.getPrototypeOf(ARPlanes)).call(this));

    _this.vrDisplay = vrDisplay;
    _this.planes = [];

    // A mapping of plane IDs to colors, so that we can reuse the same
    // color everytime we update for the same plane rather than randomizing
    // @TODO When we have plane removal events, clear this map so we don't
    // have a leak
    _this.materialMap = new Map();
    return _this;
  }

  /**
   * Clear out the THREE representation mesh from
   * scene.
   */


  _createClass(ARPlanes, [{
    key: 'clear',
    value: function clear() {
      var _this2 = this;

      this.planes.forEach(function (plane) {
        return _this2.remove(plane);
      });
      this.planes.length = 0;
    }

    /**
     * Polling callback while enabled, used to fetch and orchestrate
     * plane rendering. If successful, returns the number of planes found.
     *
     * @return {number?}
     */

  }, {
    key: 'update',
    value: function update() {
      if (!this.vrDisplay || !this.vrDisplay.getPlanes) {
        return;
      }

      // Remove current planes and clear out
      // from scene
      this.clear();

      // Recreate each plane detected
      var planes = this.vrDisplay.getPlanes();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = planes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var anchor = _step.value;

          if (anchor.vertices.length == 0) {
            continue;
          }

          var id = anchor.identifier;
          var planeObj = new THREE.Object3D();
          var mm = anchor.modelMatrix;
          planeObj.matrixAutoUpdate = false;
          planeObj.matrix.set(mm[0], mm[4], mm[8], mm[12], mm[1], mm[5], mm[9], mm[13], mm[2], mm[6], mm[10], mm[14], mm[3], mm[7], mm[11], mm[15]);

          this.add(planeObj);
          this.planes.push(planeObj);

          var geo = new THREE.Geometry();
          // generate vertices
          for (var pt = 0; pt < anchor.vertices.length / 3; pt++) {
            geo.vertices.push(new THREE.Vector3(anchor.vertices[pt * 3], anchor.vertices[pt * 3 + 1], anchor.vertices[pt * 3 + 2]));
          }

          // generate faces
          for (var face = 0; face < geo.vertices.length - 2; face++) {
            // this makes a triangle fan, from the first +Y point around
            geo.faces.push(new THREE.Face3(0, face + 1, face + 2));
          }

          var material = void 0;
          if (this.materialMap.has(id)) {
            // If we have a material stored for this plane already, reuse it
            material = this.materialMap.get(id);
          } else {
            // Otherwise, generate a new color, and assign the color to
            // this plane's ID
            var color = (0, _ARUtils.getRandomPaletteColor)();
            material = DEFAULT_MATERIAL.clone();
            material.uniforms.uColor.value = color;
            material.uniforms.uTexture.value = texture;
            this.materialMap.set(id, material);
          }

          var plane = new THREE.Mesh(geo, material);
          planeObj.add(plane);
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

      return planes.length;
    }
  }]);

  return ARPlanes;
}(THREE.Object3D);

THREE.ARPlanes = ARPlanes;
exports.default = ARPlanes;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ARDebug = __webpack_require__(1);

var _ARDebug2 = _interopRequireDefault(_ARDebug);

var _ARPerspectiveCamera = __webpack_require__(2);

var _ARPerspectiveCamera2 = _interopRequireDefault(_ARPerspectiveCamera);

var _ARReticle = __webpack_require__(3);

var _ARReticle2 = _interopRequireDefault(_ARReticle);

var _ARUtils = __webpack_require__(0);

var _ARUtils2 = _interopRequireDefault(_ARUtils);

var _ARView = __webpack_require__(5);

var _ARView2 = _interopRequireDefault(_ARView);

__webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 13 */
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