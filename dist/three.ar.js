(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(factory((global.THREEAR = {}),global.THREE));
}(this, (function (exports,three) { 'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};





	var asyncGenerator = function () {
	  function AwaitValue(value) {
	    this.value = value;
	  }

	  function AsyncGenerator(gen) {
	    var front, back;

	    function send(key, arg) {
	      return new Promise(function (resolve, reject) {
	        var request = {
	          key: key,
	          arg: arg,
	          resolve: resolve,
	          reject: reject,
	          next: null
	        };

	        if (back) {
	          back = back.next = request;
	        } else {
	          front = back = request;
	          resume(key, arg);
	        }
	      });
	    }

	    function resume(key, arg) {
	      try {
	        var result = gen[key](arg);
	        var value = result.value;

	        if (value instanceof AwaitValue) {
	          Promise.resolve(value.value).then(function (arg) {
	            resume("next", arg);
	          }, function (arg) {
	            resume("throw", arg);
	          });
	        } else {
	          settle(result.done ? "return" : "normal", result.value);
	        }
	      } catch (err) {
	        settle("throw", err);
	      }
	    }

	    function settle(type, value) {
	      switch (type) {
	        case "return":
	          front.resolve({
	            value: value,
	            done: true
	          });
	          break;

	        case "throw":
	          front.reject(value);
	          break;

	        default:
	          front.resolve({
	            value: value,
	            done: false
	          });
	          break;
	      }

	      front = front.next;

	      if (front) {
	        resume(front.key, front.arg);
	      } else {
	        back = null;
	      }
	    }

	    this._invoke = send;

	    if (typeof gen.return !== "function") {
	      this.return = undefined;
	    }
	  }

	  if (typeof Symbol === "function" && Symbol.asyncIterator) {
	    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
	      return this;
	    };
	  }

	  AsyncGenerator.prototype.next = function (arg) {
	    return this._invoke("next", arg);
	  };

	  AsyncGenerator.prototype.throw = function (arg) {
	    return this._invoke("throw", arg);
	  };

	  AsyncGenerator.prototype.return = function (arg) {
	    return this._invoke("return", arg);
	  };

	  return {
	    wrap: function (fn) {
	      return function () {
	        return new AsyncGenerator(fn.apply(this, arguments));
	      };
	    },
	    await: function (value) {
	      return new AwaitValue(value);
	    }
	  };
	}();





	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();







	var get = function get(object, property, receiver) {
	  if (object === null) object = Function.prototype;
	  var desc = Object.getOwnPropertyDescriptor(object, property);

	  if (desc === undefined) {
	    var parent = Object.getPrototypeOf(object);

	    if (parent === null) {
	      return undefined;
	    } else {
	      return get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;

	    if (getter === undefined) {
	      return undefined;
	    }

	    return getter.call(receiver);
	  }
	};

	var inherits = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};











	var possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};





	var slicedToArray = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if (Symbol.iterator in Object(arr)) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

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

	var DEFAULTS = {
	  open: true,
	  showLastHit: true,
	  showPoseStatus: true
	};

	var SUCCESS_COLOR = '#00ff00';
	var FAILURE_COLOR = '#ff0077';

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
	   * @param {Object} config
	   * @param {boolean} config.open
	   * @param {boolean} config.showLastHit
	   * @param {boolean} config.showPoseStatus
	   */
	  function ARDebug(vrDisplay) {
	    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    classCallCheck(this, ARDebug);

	    this.config = Object.assign({}, config, DEFAULTS);
	    this.vrDisplay = vrDisplay;

	    this._view = new ARDebugView({ open: this.config.open });

	    if (this.config.showLastHit && this.vrDisplay.hitTest) {
	      this._view.addRow('hit-test', new ARDebugHitTestRow(vrDisplay));
	    }

	    if (this.config.showPoseStatus && this.vrDisplay.getFrameData) {
	      this._view.addRow('pose-status', new ARDebugPoseRow(vrDisplay));
	    }
	  }

	  /**
	   * Opens the debug panel.
	   */


	  createClass(ARDebug, [{
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
	    classCallCheck(this, ARDebugView);

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


	  createClass(ARDebugView, [{
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
	          var _step$value = slicedToArray(_step.value, 2),
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
	          var _step2$value = slicedToArray(_step2.value, 2),
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
	    classCallCheck(this, ARDebugRow);

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


	  createClass(ARDebugRow, [{
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
	  inherits(ARDebugHitTestRow, _ARDebugRow);

	  /**
	   * @param {VRDisplay} vrDisplay
	   */
	  function ARDebugHitTestRow(vrDisplay) {
	    classCallCheck(this, ARDebugHitTestRow);

	    var _this = possibleConstructorReturn(this, (ARDebugHitTestRow.__proto__ || Object.getPrototypeOf(ARDebugHitTestRow)).call(this, 'Hit'));

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


	  createClass(ARDebugHitTestRow, [{
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
	  inherits(ARDebugPoseRow, _ARDebugRow2);

	  /**
	   * @param {VRDisplay} vrDisplay
	   */
	  function ARDebugPoseRow(vrDisplay) {
	    classCallCheck(this, ARDebugPoseRow);

	    var _this2 = possibleConstructorReturn(this, (ARDebugPoseRow.__proto__ || Object.getPrototypeOf(ARDebugPoseRow)).call(this, 'Pose'));

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


	  createClass(ARDebugPoseRow, [{
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

	var ARPerspectiveCamera = function (_PerspectiveCamera) {
	  inherits(ARPerspectiveCamera, _PerspectiveCamera);

	  /**
	   * @param {VRDisplay} vrDisplay
	   * @param {number} fov
	   * @param {number} aspect
	   * @param {number} near
	   * @param {number} far
	   */
	  function ARPerspectiveCamera(vrDisplay, fov, aspect, near, far) {
	    classCallCheck(this, ARPerspectiveCamera);

	    var _this = possibleConstructorReturn(this, (ARPerspectiveCamera.__proto__ || Object.getPrototypeOf(ARPerspectiveCamera)).call(this, fov, aspect, near, far));

	    _this.isARPerpsectiveCamera = true;
	    _this.vrDisplay = vrDisplay;
	    _this.updateProjectionMatrix();

	    if (!vrDisplay || !vrDisplay.capabilities.hasPassThroughCamera) {
	      console.warn('ARPerspectiveCamera does not a VRDisplay with\n                    a pass through camera. Using supplied values and defaults\n                    instead of device camera intrinsics');
	    }
	    return _this;
	  }

	  /**
	   * Updates the underlying `projectionMatrix` property from
	   * the AR-enabled VRDisplay, or falls back to
	   * THREE.PerspectiveCamera.prototype.updateProjectionMatrix
	   */


	  createClass(ARPerspectiveCamera, [{
	    key: 'updateProjectionMatrix',
	    value: function updateProjectionMatrix() {
	      var projMatrix = this.getProjectionMatrix();
	      if (!projMatrix) {
	        get(ARPerspectiveCamera.prototype.__proto__ || Object.getPrototypeOf(ARPerspectiveCamera.prototype), 'updateProjectionMatrix', this).call(this);
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
	    key: 'getProjectionMatrix',
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
	}(three.PerspectiveCamera);

	/**
	* @author mrdoob / http://mrdoob.com/
	*/

	// o object_name | g group_name
	var object_pattern = /^[og]\s*(.+)?/; //eslint-disable-line
	// mtllib file_reference
	var material_library_pattern = /^mtllib /; //eslint-disable-line
	// usemtl material_name
	var material_use_pattern = /^usemtl /; //eslint-disable-line

	var ParserState = function ParserState() {
	  var state = {
	    objects: [],
	    object: {},

	    vertices: [],
	    normals: [],
	    uvs: [],

	    materialLibraries: [],

	    startObject: function startObject(name, fromDeclaration) {
	      // If the current object (initial from reset) is not from a g/o declaration in the parsed
	      // file. We need to use it for the first parsed g/o to keep things in sync.
	      if (this.object && this.object.fromDeclaration === false) {
	        this.object.name = name;
	        this.object.fromDeclaration = fromDeclaration !== false;
	        return;
	      }

	      var previousMaterial = this.object && typeof this.object.currentMaterial === 'function' ? this.object.currentMaterial() : undefined;

	      if (this.object && typeof this.object._finalize === 'function') {
	        this.object._finalize(true);
	      }

	      this.object = {
	        name: name || '',
	        fromDeclaration: fromDeclaration !== false,

	        geometry: {
	          vertices: [],
	          normals: [],
	          uvs: []
	        },
	        materials: [],
	        smooth: true,

	        startMaterial: function startMaterial(name, libraries) {
	          var previous = this._finalize(false);

	          // New usemtl declaration overwrites an inherited material, except if faces were declared
	          // after the material, then it must be preserved for proper MultiMaterial continuation.
	          if (previous && (previous.inherited || previous.groupCount <= 0)) {
	            this.materials.splice(previous.index, 1);
	          }

	          var material = {
	            index: this.materials.length,
	            name: name || '',
	            mtllib: Array.isArray(libraries) && libraries.length > 0 ? libraries[libraries.length - 1] : '',
	            smooth: previous !== undefined ? previous.smooth : this.smooth,
	            groupStart: previous !== undefined ? previous.groupEnd : 0,
	            groupEnd: -1,
	            groupCount: -1,
	            inherited: false,

	            clone: function clone(index) {
	              var cloned = {
	                index: typeof index === 'number' ? index : this.index,
	                name: this.name,
	                mtllib: this.mtllib,
	                smooth: this.smooth,
	                groupStart: 0,
	                groupEnd: -1,
	                groupCount: -1,
	                inherited: false
	              };
	              cloned.clone = this.clone.bind(cloned);
	              return cloned;
	            }
	          };

	          this.materials.push(material);

	          return material;
	        },

	        currentMaterial: function currentMaterial() {
	          if (this.materials.length > 0) {
	            return this.materials[this.materials.length - 1];
	          }

	          return undefined;
	        },

	        _finalize: function _finalize(end) {
	          var lastMultiMaterial = this.currentMaterial();
	          if (lastMultiMaterial && lastMultiMaterial.groupEnd === -1) {
	            lastMultiMaterial.groupEnd = this.geometry.vertices.length / 3;
	            lastMultiMaterial.groupCount = lastMultiMaterial.groupEnd - lastMultiMaterial.groupStart; //eslint-disable-line
	            lastMultiMaterial.inherited = false;
	          }

	          // Ignore objects tail materials if no face
	          // declarations followed them before a new o/g started.
	          if (end && this.materials.length > 1) {
	            for (var mi = this.materials.length - 1; mi >= 0; mi--) {
	              if (this.materials[mi].groupCount <= 0) {
	                this.materials.splice(mi, 1);
	              }
	            }
	          }

	          // Guarantee at least one empty material,
	          // this makes the creation later more straight forward.
	          if (end && this.materials.length === 0) {
	            this.materials.push({ name: '', smooth: this.smooth });
	          }

	          return lastMultiMaterial;
	        }
	      };

	      // Inherit previous objects material.
	      // Spec tells us that a declared material must be set to all objects until
	      // a new material is declared.
	      // If a usemtl declaration is encountered while this new object is being parsed, it will
	      // overwrite the inherited material. Exception being that there was already face declarations
	      // to the inherited material, then it will be preserved for proper MultiMaterial continuation.

	      if (previousMaterial && previousMaterial.name && typeof previousMaterial.clone === 'function') {
	        var declared = previousMaterial.clone(0);
	        declared.inherited = true;
	        this.object.materials.push(declared);
	      }

	      this.objects.push(this.object);
	    },

	    finalize: function finalize() {
	      if (this.object && typeof this.object._finalize === 'function') {
	        this.object._finalize(true);
	      }
	    },

	    parseVertexIndex: function parseVertexIndex(value, len) {
	      var index = parseInt(value, 10);
	      return (index >= 0 ? index - 1 : index + len / 3) * 3;
	    },

	    parseNormalIndex: function parseNormalIndex(value, len) {
	      var index = parseInt(value, 10);
	      return (index >= 0 ? index - 1 : index + len / 3) * 3;
	    },

	    parseUVIndex: function parseUVIndex(value, len) {
	      var index = parseInt(value, 10);
	      return (index >= 0 ? index - 1 : index + len / 2) * 2;
	    },

	    addVertex: function addVertex(a, b, c) {
	      var src = this.vertices;
	      var dst = this.object.geometry.vertices;

	      dst.push(src[a + 0], src[a + 1], src[a + 2]);
	      dst.push(src[b + 0], src[b + 1], src[b + 2]);
	      dst.push(src[c + 0], src[c + 1], src[c + 2]);
	    },

	    addVertexLine: function addVertexLine(a) {
	      var src = this.vertices;
	      var dst = this.object.geometry.vertices;

	      dst.push(src[a + 0], src[a + 1], src[a + 2]);
	    },

	    addNormal: function addNormal(a, b, c) {
	      var src = this.normals;
	      var dst = this.object.geometry.normals;

	      dst.push(src[a + 0], src[a + 1], src[a + 2]);
	      dst.push(src[b + 0], src[b + 1], src[b + 2]);
	      dst.push(src[c + 0], src[c + 1], src[c + 2]);
	    },

	    addUV: function addUV(a, b, c) {
	      var src = this.uvs;
	      var dst = this.object.geometry.uvs;

	      dst.push(src[a + 0], src[a + 1]);
	      dst.push(src[b + 0], src[b + 1]);
	      dst.push(src[c + 0], src[c + 1]);
	    },

	    addUVLine: function addUVLine(a) {
	      var src = this.uvs;
	      var dst = this.object.geometry.uvs;

	      dst.push(src[a + 0], src[a + 1]);
	    },

	    addFace: function addFace(a, b, c, ua, ub, uc, na, nb, nc) {
	      var vLen = this.vertices.length;

	      var ia = this.parseVertexIndex(a, vLen);
	      var ib = this.parseVertexIndex(b, vLen);
	      var ic = this.parseVertexIndex(c, vLen);

	      this.addVertex(ia, ib, ic);

	      if (ua !== undefined) {
	        var uvLen = this.uvs.length;

	        ia = this.parseUVIndex(ua, uvLen);
	        ib = this.parseUVIndex(ub, uvLen);
	        ic = this.parseUVIndex(uc, uvLen);

	        this.addUV(ia, ib, ic);
	      }

	      if (na !== undefined) {
	        // Normals are many times the same. If so, skip function call and parseInt.
	        var nLen = this.normals.length;
	        ia = this.parseNormalIndex(na, nLen);

	        ib = na === nb ? ia : this.parseNormalIndex(nb, nLen);
	        ic = na === nc ? ia : this.parseNormalIndex(nc, nLen);

	        this.addNormal(ia, ib, ic);
	      }
	    },

	    addLineGeometry: function addLineGeometry(vertices, uvs) {
	      this.object.geometry.type = 'Line';

	      var vLen = this.vertices.length;
	      var uvLen = this.uvs.length;

	      for (var vi = 0, l = vertices.length; vi < l; vi++) {
	        this.addVertexLine(this.parseVertexIndex(vertices[vi], vLen));
	      }

	      for (var uvi = 0, _l = uvs.length; uvi < _l; uvi++) {
	        this.addUVLine(this.parseUVIndex(uvs[uvi], uvLen));
	      }
	    }
	  };

	  state.startObject('', false);

	  return state;
	};

	/**
	* OBJLoader class
	* @type {Loader}
	*/

	var OBJLoader = function () {
	  /**
	  * @param  {THREE.DefaultLoadingManager} manager
	  */
	  function OBJLoader(manager) {
	    classCallCheck(this, OBJLoader);

	    this.manager = manager !== undefined ? manager : three.DefaultLoadingManager;

	    this.materials = null;
	  }

	  /**
	  * @param  {String} url
	  * @param  {Function} onLoad
	  * @param  {Function} onProgress
	  * @param  {Function} onError
	  */


	  createClass(OBJLoader, [{
	    key: 'load',
	    value: function load(url, onLoad, onProgress, onError) {
	      var scope = this;

	      var loader = new three.FileLoader(scope.manager);
	      loader.setPath(this.path);
	      loader.load(url, function (text) {
	        onLoad(scope.parse(text));
	      }, onProgress, onError);
	    }

	    /**
	    * @param {String} value
	    */

	  }, {
	    key: 'setPath',
	    value: function setPath(value) {
	      this.path = value;
	    }

	    /**
	    * @param {Object} materials
	    * @return {OBJLoader} this
	    */

	  }, {
	    key: 'setMaterials',
	    value: function setMaterials(materials) {
	      this.materials = materials;

	      return this;
	    }

	    /**
	    * @param  {String} text
	    * @return {String}
	    */

	  }, {
	    key: 'parse',
	    value: function parse(text) {
	      console.time('OBJLoader'); //eslint-disable-line

	      var state = new ParserState();

	      if (text.indexOf('\r\n') !== -1) {
	        // This is faster than String.split with regex that splits on both
	        text = text.replace(/\r\n/g, '\n');
	      }

	      if (text.indexOf('\\\n') !== -1) {
	        // join lines separated by a line continuation character (\)
	        text = text.replace(/\\\n/g, '');
	      }

	      var lines = text.split('\n');
	      var line = '';
	      var lineFirstChar = '';
	      var lineLength = 0;
	      var result = [];

	      // Faster to just trim left side of the line. Use if available.
	      var trimLeft = typeof ''.trimLeft === 'function';

	      for (var i = 0, l = lines.length; i < l; i++) {
	        line = lines[i];

	        line = trimLeft ? line.trimLeft() : line.trim();

	        lineLength = line.length;

	        if (lineLength === 0) {
	          continue;
	        }

	        lineFirstChar = line.charAt(0);

	        // @todo invoke passed in handler if any
	        if (lineFirstChar === '#') {
	          continue;
	        }

	        if (lineFirstChar === 'v') {
	          var data = line.split(/\s+/);

	          switch (data[0]) {
	            case 'v':
	              state.vertices.push(parseFloat(data[1]), parseFloat(data[2]), parseFloat(data[3]));
	              break;
	            case 'vn':
	              state.normals.push(parseFloat(data[1]), parseFloat(data[2]), parseFloat(data[3]));
	              break;
	            case 'vt':
	              state.uvs.push(parseFloat(data[1]), parseFloat(data[2]));
	              break;
	          }
	        } else if (lineFirstChar === 'f') {
	          var lineData = line.substr(1).trim();
	          var vertexData = lineData.split(/\s+/);
	          var faceVertices = [];

	          // Parse the face vertex data into an easy to work with format

	          for (var j = 0, jl = vertexData.length; j < jl; j++) {
	            var vertex = vertexData[j];

	            if (vertex.length > 0) {
	              var vertexParts = vertex.split('/');
	              faceVertices.push(vertexParts);
	            }
	          }

	          // Draw an edge between the first vertex and all subsequent vertices to form an n-gon

	          var v1 = faceVertices[0];

	          for (var _j = 1, _jl = faceVertices.length - 1; _j < _jl; _j++) {
	            var v2 = faceVertices[_j];
	            var v3 = faceVertices[_j + 1];

	            state.addFace(v1[0], v2[0], v3[0], v1[1], v2[1], v3[1], v1[2], v2[2], v3[2]);
	          }
	        } else if (lineFirstChar === 'l') {
	          var lineParts = line.substring(1).trim().split(' ');
	          var lineVertices = [];
	          var lineUVs = [];

	          if (line.indexOf('/') === -1) {
	            lineVertices = lineParts;
	          } else {
	            for (var li = 0, llen = lineParts.length; li < llen; li++) {
	              var parts = lineParts[li].split('/');

	              if (parts[0] !== '') {
	                lineVertices.push(parts[0]);
	              }
	              if (parts[1] !== '') {
	                lineUVs.push(parts[1]);
	              }
	            }
	          }
	          state.addLineGeometry(lineVertices, lineUVs);
	        } else if ((result = object_pattern.exec(line)) !== null) {
	          // o object_name
	          // or
	          // g group_name

	          // WORKAROUND: https://bugs.chromium.org/p/v8/issues/detail?id=2869
	          // var name = result[ 0 ].substr( 1 ).trim();
	          var name = (' ' + result[0].substr(1).trim()).substr(1);

	          state.startObject(name);
	        } else if (material_use_pattern.test(line)) {
	          // material

	          state.object.startMaterial(line.substring(7).trim(), state.materialLibraries);
	        } else if (material_library_pattern.test(line)) {
	          // mtl file

	          state.materialLibraries.push(line.substring(7).trim());
	        } else if (lineFirstChar === 's') {
	          result = line.split(' ');

	          // smooth shading

	          // @todo Handle files that have varying smooth values for a set of faces
	          // inside one geometry, but does not define a usemtl for each face set.
	          // This should be detected and a dummy material created
	          // (later MultiMaterial and geometry groups).
	          // This requires some care to not create extra material on each smooth
	          //  value for "normal" obj files.
	          // where explicit usemtl defines geometry groups.
	          // Example asset: examples/models/obj/cerberus/Cerberus.obj

	          /*
	          * http://paulbourke.net/dataformats/obj/
	          * or
	          * http://www.cs.utah.edu/~boulos/cs3505/obj_spec.pdf
	          *
	          * From chapter "Grouping" Syntax explanation "s group_number":
	          * "group_number is the smoothing group number. To turn off smoothing
	          *  groups, use a value of 0 or off.
	          * Polygonal elements use group numbers to put elements in different
	          *  smoothing groups. For free-form
	          * surfaces, smoothing groups are either turned on or off; there is no
	          *  difference between values greater
	          * than 0."
	          */
	          if (result.length > 1) {
	            var value = result[1].trim().toLowerCase();
	            state.object.smooth = value !== '0' && value !== 'off';
	          } else {
	            // ZBrush can produce "s" lines #11707
	            state.object.smooth = true;
	          }
	          var material = state.object.currentMaterial();
	          if (material) {
	            material.smooth = state.object.smooth;
	          } else {
	            // Handle null terminated files without exception
	            if (line === '\0') {
	              continue;
	            }

	            throw new Error('Unexpected line: \'' + line + '\'');
	          }
	        }

	        state.finalize();

	        var container = new three.Group();
	        container.materialLibraries = [].concat(state.materialLibraries);

	        for (var _i = 0, _l2 = state.objects.length; _i < _l2; _i++) {
	          var object = state.objects[_i];
	          var geometry = object.geometry;
	          var materials = object.materials;
	          var isLine = geometry.type === 'Line';

	          // Skip o/g line declarations that did not follow with any faces
	          if (geometry.vertices.length === 0) {
	            continue;
	          }

	          var buffergeometry = new three.BufferGeometry();

	          buffergeometry.addAttribute('position', new three.BufferAttribute(new Float32Array(geometry.vertices), 3));

	          if (geometry.normals.length > 0) {
	            buffergeometry.addAttribute('normal', new three.BufferAttribute(new Float32Array(geometry.normals), 3));
	          } else {
	            buffergeometry.computeVertexNormals();
	          }

	          if (geometry.uvs.length > 0) {
	            buffergeometry.addAttribute('uv', new three.BufferAttribute(new Float32Array(geometry.uvs), 2));
	          }

	          // Create materials

	          var createdMaterials = [];

	          for (var mi = 0, miLen = materials.length; mi < miLen; mi++) {
	            var sourceMaterial = materials[mi];
	            var _material = undefined;

	            if (this.materials !== null) {
	              _material = this.materials.create(sourceMaterial.name);

	              // mtl etc. loaders probably can't create line materials correctly, 
	              // copy properties to a line material.
	              if (isLine && _material && !(_material instanceof three.LineBasicMaterial)) {
	                var materialLine = new three.LineBasicMaterial();
	                materialLine.copy(_material);
	                _material = materialLine;
	              }
	            }

	            if (!_material) {
	              _material = !isLine ? new three.MeshPhongMaterial() : new three.LineBasicMaterial();
	              _material.name = sourceMaterial.name;
	            }

	            _material.flatShading = sourceMaterial.smooth ? false : true;

	            createdMaterials.push(_material);
	          }

	          // Create mesh

	          var mesh = void 0;

	          if (createdMaterials.length > 1) {
	            for (var _mi = 0, _miLen = materials.length; _mi < _miLen; _mi++) {
	              var _sourceMaterial = materials[_mi];
	              buffergeometry.addGroup(_sourceMaterial.groupStart, _sourceMaterial.groupCount, _mi);
	            }

	            mesh = !isLine ? new three.Mesh(buffergeometry, createdMaterials) : new three.LineSegments(buffergeometry, createdMaterials);
	          } else {
	            mesh = !isLine ? new three.Mesh(buffergeometry, createdMaterials[0]) : new three.LineSegments(buffergeometry, createdMaterials[0]);
	          }

	          mesh.name = object.name;

	          container.add(mesh);
	        }

	        console.timeEnd('OBJLoader'); //eslint-disable-line

	        return container;
	      }
	    }
	  }]);
	  return OBJLoader;
	}();

	/**
	* Loads a Wavefront .mtl file specifying materials
	*
	* @author angelxuanchang
	*/

	var MTLLoader = function () {
	  /**
	  * @param {THREE.DefaultLoadingManager} manager - the loading manager
	  */
	  function MTLLoader(manager) {
	    classCallCheck(this, MTLLoader);

	    this.manager = manager !== undefined ? manager : three.DefaultLoadingManager;
	  }

	  /**
	  * Loads and parses a MTL asset from a URL.
	  *
	  * @param {String} url - URL to the MTL file.
	  * @param {Function} [onLoad] - Callback invoked with the loaded object.
	  * @param {Function} [onProgress] - Callback for download progress.
	  * @param {Function} [onError] - Callback for download errors.
	  *
	  * @see setPath setTexturePath
	  *
	  * @note In order for relative texture references to resolve correctly
	  * you must call setPath and/or setTexturePath explicitly prior to load.
	  */


	  createClass(MTLLoader, [{
	    key: 'load',
	    value: function load(url, onLoad, onProgress, onError) {
	      var scope = this;

	      var loader = new three.FileLoader(this.manager);
	      loader.setPath(this.path);
	      loader.load(url, function (text) {
	        onLoad(scope.parse(text));
	      }, onProgress, onError);
	    }

	    /**
	    * Set base path for resolving references.
	    * If set this path will be prepended to each loaded and found reference.
	    *
	    * @see setTexturePath
	    * @param {String} path
	    *
	    * @example
	    *     mtlLoader.setPath( 'assets/obj/' );
	    *     mtlLoader.load( 'my.mtl', ... );
	    */

	  }, {
	    key: 'setPath',
	    value: function setPath(path) {
	      this.path = path;
	    }

	    /**
	    * Set base path for resolving texture references.
	    * If set this path will be prepended found texture reference.
	    * If not set and setPath is, it will be used as texture base path.
	    *
	    * @see setPath
	    * @param {String} path
	    *
	    * @example
	    *     mtlLoader.setPath( 'assets/obj/' );
	    *     mtlLoader.setTexturePath( 'assets/textures/' );
	    *     mtlLoader.load( 'my.mtl', ... );
	    */

	  }, {
	    key: 'setTexturePath',
	    value: function setTexturePath(path) {
	      this.texturePath = path;
	    }

	    /**
	     * @param {String} path [description]
	     */

	  }, {
	    key: 'setBaseUrl',
	    value: function setBaseUrl(path) {
	      console.warn('MTLLoader: .setBaseUrl() is deprecated. Use .setTexturePath( path ) for texture path or .setPath( path ) for general base path instead.'); //eslint-disable-line
	      this.setTexturePath(path);
	    }

	    /**
	     * @param {String} value Set crossOrigin value
	     */

	  }, {
	    key: 'setCrossOrigin',
	    value: function setCrossOrigin(value) {
	      this.crossOrigin = value;
	    }

	    /**
	     * @param {Object} value set material options
	     */

	  }, {
	    key: 'setMaterialOptions',
	    value: function setMaterialOptions(value) {
	      this.materialOptions = value;
	    }

	    /**
	    * Parses a MTL file.
	    *
	    * @param {String} text - Content of MTL file
	    * @return {MTLLoader.MaterialCreator}
	    *
	    * @see setPath setTexturePath
	    *
	    * @note In order for relative texture references to resolve correctly
	    * you must call setPath and/or setTexturePath explicitly prior to parse.
	    */

	  }, {
	    key: 'parse',
	    value: function parse(text) {
	      var lines = text.split('\n');
	      var info = {};
	      var delimiter_pattern = /\s+/; //eslint-disable-line
	      var materialsInfo = {};

	      for (var i = 0; i < lines.length; i++) {
	        var line = lines[i];
	        line = line.trim();

	        if (line.length === 0 || line.charAt(0) === '#') {
	          // Blank line or comment ignore
	          continue;
	        }

	        var pos = line.indexOf(' ');

	        var key = pos >= 0 ? line.substring(0, pos) : line;
	        key = key.toLowerCase();

	        var value = pos >= 0 ? line.substring(pos + 1) : '';
	        value = value.trim();

	        if (key === 'newmtl') {
	          // New material

	          info = {
	            name: value
	          };
	          materialsInfo[value] = info;
	        } else if (info) {
	          if (key === 'ka' || key === 'kd' || key === 'ks') {
	            var ss = value.split(delimiter_pattern, 3);
	            info[key] = [parseFloat(ss[0]), parseFloat(ss[1]), parseFloat(ss[2])];
	          } else {
	            info[key] = value;
	          }
	        }
	      }

	      var materialCreator = new MaterialCreator(this.texturePath || this.path, this.materialOptions);
	      materialCreator.setCrossOrigin(this.crossOrigin);
	      materialCreator.setManager(this.manager);
	      materialCreator.setMaterials(materialsInfo);
	      return materialCreator;
	    }
	  }]);
	  return MTLLoader;
	}();

	var MaterialCreator = function () {
	  /**
	  * @param {String} baseUrl - Url relative to which textures are loaded
	  * @param {Object} options - Set of options on how to construct the materials
	  *                  side: Which side to apply the material
	  *                        FrontSide (default), BackSide, DoubleSide
	  *                  wrap: What type of wrapping to apply for textures
	  *                        RepeatWrapping (default), ClampToEdgeWrapping, MirroredRepeatWrapping
	  *                  normalizeRGB: RGBs need to be normalized to 0-1 from 0-255
	  *                                Default: false, assumed to be already normalized
	  *                  ignoreZeroRGBs: Ignore values of RGBs (Ka,Kd,Ks) that are all 0's
	  *                                  Default: false
	  * @constructor
	  */
	  function MaterialCreator(baseUrl, options) {
	    classCallCheck(this, MaterialCreator);

	    this.baseUrl = baseUrl || '';
	    this.options = options;
	    this.materialsInfo = {};
	    this.materials = {};
	    this.materialsArray = [];
	    this.nameLookup = {};
	    this.crossOrigin = 'Anonymous';

	    this.side = this.options && this.options.side ? this.options.side : three.FrontSide;
	    this.wrap = this.options && this.options.wrap ? this.options.wrap : three.RepeatWrapping;
	  }

	  /**
	   * set cross origin
	   * @param {String} value cross origin value
	   */


	  createClass(MaterialCreator, [{
	    key: 'setCrossOrigin',
	    value: function setCrossOrigin(value) {
	      this.crossOrigin = value;
	    }

	    /**
	     * setManager
	     * @param {THREE.DefaultLoadingManager} value Loading manager
	     */

	  }, {
	    key: 'setManager',
	    value: function setManager(value) {
	      this.manager = value;
	    }

	    /**
	     * [setMaterials description]
	     * @param {Object} materialsInfo [description]
	     */

	  }, {
	    key: 'setMaterials',
	    value: function setMaterials(materialsInfo) {
	      this.materialsInfo = this.convert(materialsInfo);
	      this.materials = {};
	      this.materialsArray = [];
	      this.nameLookup = {};
	    }

	    /**
	     * [convert description]
	     * @param  {[type]} materialsInfo [description]
	     * @return {[type]}               [description]
	     */

	  }, {
	    key: 'convert',
	    value: function convert(materialsInfo) {
	      if (!this.options) {
	        return materialsInfo;
	      }

	      var converted = {};

	      for (var mn in materialsInfo) {
	        if (materialsInfo[mn]) {
	          // Convert materials info into normalized form based on options

	          var mat = materialsInfo[mn];

	          var covmat = {};

	          converted[mn] = covmat;

	          for (var prop in mat) {
	            if (mat[prop]) {
	              var save = true;
	              var value = mat[prop];
	              var lprop = prop.toLowerCase();

	              switch (lprop) {
	                case 'kd':
	                case 'ka':
	                case 'ks':

	                  // Diffuse color (color under white light) using RGB values

	                  if (this.options && this.options.normalizeRGB) {
	                    value = [value[0] / 255, value[1] / 255, value[2] / 255];
	                  }

	                  if (this.options && this.options.ignoreZeroRGBs) {
	                    if (value[0] === 0 && value[1] === 0 && value[2] === 0) {
	                      // ignore

	                      save = false;
	                    }
	                  }

	                  break;

	                default:

	                  break;
	              }

	              if (save) {
	                covmat[lprop] = value;
	              }
	            }
	          }
	        }
	      }

	      return converted;
	    }

	    /**
	     * preload
	     */

	  }, {
	    key: 'preload',
	    value: function preload() {
	      for (var mn in this.materialsInfo) {
	        if (this.materialsInfo[mn]) {
	          this.create(mn);
	        }
	      }
	    }

	    /**
	     * get index
	     * @param  {String} materialName material name
	     * @return {Material}            return material
	     */

	  }, {
	    key: 'getIndex',
	    value: function getIndex(materialName) {
	      return this.nameLookup[materialName];
	    }

	    /**
	     * getAsArray
	     * @return {Array} array
	     */

	  }, {
	    key: 'getAsArray',
	    value: function getAsArray() {
	      var index = 0;

	      for (var mn in this.materialsInfo) {
	        if (this.materialsInfo[mn]) {
	          this.materialsArray[index] = this.create(mn);
	          this.nameLookup[mn] = index;
	          index++;
	        }
	      }

	      return this.materialsArray;
	    }

	    /**
	     * create material
	     * @param  {String} materialName material name
	     * @return {Material}            returned material
	     */

	  }, {
	    key: 'create',
	    value: function create(materialName) {
	      if (this.materials[materialName] === undefined) {
	        this.createMaterial_(materialName);
	      }

	      return this.materials[materialName];
	    }

	    /**
	     * create material internal
	     * @param  {String} materialName material name
	     * @return {[type]}              [description]
	     */

	  }, {
	    key: 'createMaterial_',
	    value: function createMaterial_(materialName) {
	      // Create material

	      var scope = this;
	      var mat = this.materialsInfo[materialName];
	      var params = {

	        name: materialName,
	        side: this.side
	      };

	      var resolveURL = function resolveURL(baseUrl, url) {
	        if (typeof url !== 'string' || url === '') {
	          return '';
	        }

	        // Absolute URL
	        if (/^https?:\/\//i.test(url)) {
	          return url;
	        }

	        return baseUrl + url;
	      };

	      var setMapForType = function setMapForType(mapType, value) {
	        if (params[mapType]) {
	          return;
	        } // Keep the first encountered texture

	        var texParams = scope.getTextureParams(value, params);
	        var map = scope.loadTexture(resolveURL(scope.baseUrl, texParams.url));

	        map.repeat.copy(texParams.scale);
	        map.offset.copy(texParams.offset);

	        map.wrapS = scope.wrap;
	        map.wrapT = scope.wrap;

	        params[mapType] = map;
	      };

	      for (var prop in mat) {
	        if (mat[prop]) {
	          var value = mat[prop];
	          var n = void 0;

	          if (value === '') {
	            continue;
	          }

	          switch (prop.toLowerCase()) {
	            // Ns is material specular exponent

	            case 'kd':

	              // Diffuse color (color under white light) using RGB values

	              params.color = new three.Color().fromArray(value);

	              break;

	            case 'ks':

	              // Specular color (color when light is reflected from shiny surface) using RGB values
	              params.specular = new three.Color().fromArray(value);

	              break;

	            case 'map_kd':

	              // Diffuse texture map

	              setMapForType('map', value);

	              break;

	            case 'map_ks':

	              // Specular map

	              setMapForType('specularMap', value);

	              break;

	            case 'norm':

	              setMapForType('normalMap', value);

	              break;

	            case 'map_bump':
	            case 'bump':

	              // Bump texture map

	              setMapForType('bumpMap', value);

	              break;

	            case 'ns':

	              // The specular exponent (defines the focus of the specular highlight)
	              // A high exponent results in a tight, concentrated highlight. 
	              // Ns values normally range from 0 to 1000.

	              params.shininess = parseFloat(value);

	              break;

	            case 'd':
	              n = parseFloat(value);

	              if (n < 1) {
	                params.opacity = n;
	                params.transparent = true;
	              }

	              break;

	            case 'tr':
	              n = parseFloat(value);

	              if (n > 0) {
	                params.opacity = 1 - n;
	                params.transparent = true;
	              }

	              break;

	            default:
	              break;
	          }
	        }
	      }

	      this.materials[materialName] = new three.MeshPhongMaterial(params);
	      return this.materials[materialName];
	    }

	    /**
	     * getTextureParams
	     * @param  {String} value     
	     * @param  {[type]} matParams 
	     * @return {[type]}           
	     */

	  }, {
	    key: 'getTextureParams',
	    value: function getTextureParams(value, matParams) {
	      var texParams = {

	        scale: new three.Vector2(1, 1),
	        offset: new three.Vector2(0, 0)
	      };

	      var items = value.split(/\s+/);
	      var pos = void 0;

	      pos = items.indexOf('-bm');

	      if (pos >= 0) {
	        matParams.bumpScale = parseFloat(items[pos + 1]);
	        items.splice(pos, 2);
	      }

	      pos = items.indexOf('-s');

	      if (pos >= 0) {
	        texParams.scale.set(parseFloat(items[pos + 1]), parseFloat(items[pos + 2]));
	        items.splice(pos, 4); // we expect 3 parameters here!
	      }

	      pos = items.indexOf('-o');

	      if (pos >= 0) {
	        texParams.offset.set(parseFloat(items[pos + 1]), parseFloat(items[pos + 2]));
	        items.splice(pos, 4); // we expect 3 parameters here!
	      }

	      texParams.url = items.join(' ').trim();
	      return texParams;
	    }

	    /**
	     * [loadTexture description]
	     * @param  {[type]} url        [description]
	     * @param  {[type]} mapping    [description]
	     * @param  {[type]} onLoad     [description]
	     * @param  {[type]} onProgress [description]
	     * @param  {[type]} onError    [description]
	     * @return {[type]}            [description]
	     */

	  }, {
	    key: 'loadTexture',
	    value: function loadTexture(url, mapping, onLoad, onProgress, onError) {
	      var texture = void 0;
	      var loader = three.Loader.Handlers.get(url);
	      var manager = this.manager !== undefined ? this.manager : three.DefaultLoadingManager;

	      if (loader === null) {
	        loader = new three.TextureLoader(manager);
	      }

	      if (loader.setCrossOrigin) {
	        loader.setCrossOrigin(this.crossOrigin);
	      }
	      texture = loader.load(url, onLoad, onProgress, onError);

	      if (mapping !== undefined) {
	        texture.mapping = mapping;
	      }

	      return texture;
	    }
	  }]);
	  return MaterialCreator;
	}();

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

	var loadObj = function loadObj(objPath, materials) {
	  return new Promise(function (resolve, reject) {
	    var loader = new OBJLoader();

	    if (materials) {
	      loader.setMaterials(materials);
	    }

	    loader.load(objPath, resolve, noop, reject);
	  });
	};

	var loadMtl = function loadMtl(mtlPath) {
	  return new Promise(function (resolve, reject) {
	    var loader = new MTLLoader();
	    var pathChunks = mtlPath.split('/');

	    if (pathChunks.length >= 2) {
	      loader.setTexturePath(pathChunks[pathChunks.length - 2]);
	    }

	    loader.load(mtlPath, resolve, noop, reject);
	  });
	};

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

	var LEARN_MORE_LINK = 'https://developers.google.com/ar/develop/web/getting-started';
	var UNSUPPORTED_MESSAGE = 'This augmented reality experience requires\n  WebARonARCore or WebARonARKit, experimental browsers from Google\n  for Android and iOS. Learn more at the <a href="' + LEARN_MORE_LINK + '">Google Developers site</a>.';

	var ARUtils$1 = {};

	ARUtils$1.isTango = function (display) {
	  return display && display.displayName.toLowerCase().includes('tango');
	};
	var isTango = ARUtils$1.isTango;

	ARUtils$1.isARKit = function (display) {
	  return display && display.displayName.toLowerCase().includes('arkit');
	};
	var isARKit = ARUtils$1.isARKit;

	ARUtils$1.isARDisplay = function (display) {
	  return isARKit(display) || isTango(display);
	};
	var isARDisplay = ARUtils$1.isARDisplay;

	/**
	 * Returns a promise that resolves to either to a VRDisplay with
	 * AR capabilities, or null if no valid AR devices found on the platform.
	 *
	 * @return {Promise<VRDisplay?>}
	 */
	ARUtils$1.getARDisplay = function () {
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


	/**
	 * Takes a path for an OBJ model and optionally a path for an MTL
	 * texture and returns a promise resolving to a THREE.Mesh loaded with
	 * the appropriate material. Can be used on downloaded models from Blocks.
	 *
	 * @param {string} objPath
	 * @param {string} mtlPath
	 * @return {THREE.Mesh}
	 */
	ARUtils$1.loadBlocksModel = function (objPath, mtlPath) {
	  return new Promise(function (resolve, reject) {
	    if (!THREE.OBJLoader || !THREE.MTLLoader) {
	      reject(new Error('Must include THREE.OBJLoader and THREE.MTLLoader'));
	      return;
	    }

	    var p = Promise.resolve();

	    if (mtlPath) {
	      p = loadMtl(mtlPath);
	    }

	    p.then(function (materials) {
	      if (materials) {
	        materials.preload();
	      }
	      return loadObj(objPath, materials);
	    }).then(function (obj) {
	      var model = obj.children[0];
	      model.geometry.applyMatrix(new three.Matrix4().makeRotationY(three.Math.degToRad(-90)));

	      return model;
	    }).then(resolve, reject);
	  });
	};


	var model = new three.Matrix4();
	var tempPos = new three.Vector3();
	var tempQuat = new three.Quaternion();
	var tempScale = new three.Vector3();

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
	ARUtils$1.placeObjectAtHit = function (object, hit) {
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
	var placeObjectAtHit = ARUtils$1.placeObjectAtHit;

	/**
	 * Injects a DOM element into the current page prompting the user that
	 * their browser does not support these AR features.
	 */
	ARUtils$1.displayUnsupportedMessage = function () {
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
	 * Class for creating a mesh that fires raycasts and lerps
	 * a 3D object along the surface
	 */

	var ARReticle = function (_Mesh) {
	  inherits(ARReticle, _Mesh);

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
	    classCallCheck(this, ARReticle);

	    var geometry = new three.RingGeometry(innerRadius, outerRadius, 36, 64);
	    var material = new three.MeshBasicMaterial({ color: color });

	    // Orient the geometry so it's position is flat on a horizontal surface
	    geometry.applyMatrix(new three.Matrix4().makeRotationX(three.Math.degToRad(-90)));

	    var _this = possibleConstructorReturn(this, (ARReticle.__proto__ || Object.getPrototypeOf(ARReticle)).call(this, geometry, material));

	    _this.visible = false;

	    _this.easing = easing;
	    _this.applyOrientation = true;
	    _this.vrDisplay = vrDisplay;
	    _this._planeDir = new three.Vector3();
	    return _this;
	  }

	  /**
	   * Attempt to fire a raycast from normalized screen coordinates
	   * x and y and lerp the reticle to the position.
	   *
	   * @param {number} x
	   * @param {number} y
	   */


	  createClass(ARReticle, [{
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
	        placeObjectAtHit(this, hit[0], this.applyOrientation, this.easing);
	      }
	    }
	  }]);
	  return ARReticle;
	}(three.Mesh);

	var vertexSource = "#define GLSLIFY 1\n// Copyright 2017 Google Inc. All Rights Reserved.\n// Licensed under the Apache License, Version 2.0 (the 'License');\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n// http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an 'AS IS' BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\nattribute vec3 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n  gl_Position = vec4(aVertexPosition, 1.0);\n  vTextureCoord = aTextureCoord;\n}";

	var fragmentSource = "// Copyright 2017 Google Inc. All Rights Reserved.\n// Licensed under the Apache License, Version 2.0 (the 'License');\n// you may not use this file except in compliance with the License.\n// You may obtain a copy of the License at\n//\n// http://www.apache.org/licenses/LICENSE-2.0\n//\n// Unless required by applicable law or agreed to in writing, software\n// distributed under the License is distributed on an 'AS IS' BASIS,\n// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n// See the License for the specific language governing permissions and\n// limitations under the License.\n\n#extension GL_OES_EGL_image_external : require\n\nprecision mediump float;\n#define GLSLIFY 1\n\nvarying vec2 vTextureCoord;\n\nuniform samplerExternalOES uSampler;\n\nvoid main(void) {\n  gl_FragColor = texture2D(uSampler, vTextureCoord);\n}\n";

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
	    classCallCheck(this, ARVideoRenderer);

	    this.vrDisplay = vrDisplay;
	    this.gl = gl;
	    if (this.vrDisplay) {
	      this.passThroughCamera = vrDisplay.getPassThroughCamera();
	      this.program = getProgram(gl, vertexSource, fragmentSource);
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


	  createClass(ARVideoRenderer, [{
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
	    classCallCheck(this, ARView);

	    this.vrDisplay = vrDisplay;
	    if (isARKit(this.vrDisplay)) {
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


	  createClass(ARView, [{
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
	      if (isARKit(this.vrDisplay)) {
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
	    window.webkitSpeechRecognition = function () {
	      return window.webarSpeechRecognitionInstance;
	    };
	  }
	})();

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

	/* eslint no-unused-vars: "off" */

	exports.ARDebug = ARDebug;
	exports.ARPerspectiveCamera = ARPerspectiveCamera;
	exports.ARReticle = ARReticle;
	exports.ARUtils = ARUtils$1;
	exports.ARView = ARView;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=three.ar.js.map
