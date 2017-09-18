(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(factory((global.THREEAR = {}),global.THREE));
}(this, (function (exports,three) { 'use strict';

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

	const DEFAULTS = {
	  open: true,
	  showLastHit: true,
	  showPoseStatus: true,
	};

	const SUCCESS_COLOR = '#00ff00';
	const FAILURE_COLOR = '#ff0077';

	// A cache to store original native VRDisplay methods
	// since WebARonARKit does not provide a VRDisplay.prototype[method],
	// and assuming the first time ARDebug proxies a method is the
	// 'native' version, this caches the correct method if we proxy a method twice
	let cachedVRDisplayMethods = new Map();

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
	  let lastFired;
	  let timeout;

	  return (...args) => {
	    const current = +new Date();
	    let until;

	    if (lastFired) {
	      until = lastFired + timer - current;
	    }

	    if (until == undefined || until < 0) {
	      lastFired = current;
	      fn.apply(scope, args);
	    } else if (until >= 0) {
	      clearTimeout(timeout);
	      timeout = setTimeout(() => {
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
	class ARDebug {
	  /**
	   * @param {VRDisplay} vrDisplay
	   * @param {Object} config
	   * @param {boolean} config.open
	   * @param {boolean} config.showLastHit
	   * @param {boolean} config.showPoseStatus
	   */
	  constructor(vrDisplay, config={}) {
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
	  open() {
	    this._view.open();
	  }

	  /**
	   * Closes the debug panel.
	   */
	  close() {
	    this._view.close();
	  }

	  /**
	   * Returns the root DOM element for the panel.
	   *
	   * @return {HTMLElement}
	   */
	  getElement() {
	    return this._view.getElement();
	  }
	}

	/**
	 * An implementation that interfaces with the DOM, used
	 * by ARDebug
	 */
	class ARDebugView {
	  /**
	   * @param {Object} config
	   * @param {boolean} config.open
	   */
	  constructor(config={}) {
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
	  toggleControls() {
	    if (this._isOpen) {
	      this.close();
	    } else {
	      this.open();
	    }
	  }

	  /**
	   * Opens the debugging panel.
	   */
	  open() {
	    // Use max-height with large value to transition
	    // to/from a non-specific height (like auto/100%)
	    // https://stackoverflow.com/a/8331169
	    // @TODO investigate a more complete solution with correct timing,
	    // via something like http://n12v.com/css-transition-to-from-auto/
	    this._rowsEl.style.maxHeight = '100px';
	    this._isOpen = true;
	    this._controls.textContent = 'Close ARDebug';
	    for (let [, row] of this.rows) {
	      row.enable();
	    }
	  }

	  /**
	   * Closes the debugging panel.
	   */
	  close() {
	    this._rowsEl.style.maxHeight = '0px';
	    this._isOpen = false;
	    this._controls.textContent = 'Open ARDebug';
	    for (let [, row] of this.rows) {
	      row.disable();
	    }
	  }

	  /**
	   * Returns the ARDebugView root element.
	   *
	   * @return {HTMLElement}
	   */
	  getElement() {
	    return this.el;
	  }

	  /**
	   * Adds a row to the ARDebugView.
	   *
	   * @param {string} id
	   * @param {ARDebugRow} row
	   */
	  addRow(id, row) {
	    this.rows.set(id, row);

	    if (this._isOpen) {
	      row.enable();
	    }

	    this._rowsEl.appendChild(row.getElement());
	  }
	}

	/**
	 * A class that implements features being a row in the ARDebugView.
	 */
	class ARDebugRow {
	  /**
	   * @param {string} title
	   */
	  constructor(title) {
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
	  enable() {
	    throw new Error('Implement in child class');
	  }

	  /**
	   * Disables the proxying and inspection functionality of
	   * this row. Should be implemented by child class.
	   */
	  disable() {
	    throw new Error('Implement in child class');
	  }

	  /**
	   * Returns the ARDebugRow's root element.
	   *
	   * @return {HTMLElement}
	   */
	  getElement() {
	    return this.el;
	  }

	  /**
	   * Updates the row's value.
	   *
	   * @param {string} value
	   * @param {boolean} isSuccess
	   */
	  update(value, isSuccess) {
	    this._dataElText.nodeValue = value;
	    this._dataEl.style.color = isSuccess ? SUCCESS_COLOR : FAILURE_COLOR;
	  }
	}

	/**
	 * The ARDebugRow subclass for displaying hit information
	 * by wrapping `vrDisplay.hitTest` and displaying the results.
	 */
	class ARDebugHitTestRow extends ARDebugRow {
	  /**
	   * @param {VRDisplay} vrDisplay
	   */
	  constructor(vrDisplay) {
	    super('Hit');
	    this.vrDisplay = vrDisplay;
	    this._onHitTest = this._onHitTest.bind(this);

	    // Store the native hit test, or proxy the native `hitTest` call with our own
	    this._nativeHitTest = cachedVRDisplayMethods.get('hitTest') || this.vrDisplay.hitTest;
	    cachedVRDisplayMethods.set('hitTest', this._nativeHitTest);

	    this._didPreviouslyHit = null;
	  }

	  /**
	   * Enables the tracking of hit test information.
	   */
	  enable() {
	    this.vrDisplay.hitTest = this._onHitTest;
	  }

	  /**
	   * Disables the tracking of hit test information.
	   */
	  disable() {
	    this.vrDisplay.hitTest = this._nativeHitTest;
	  }

	  /**
	   * @param {VRHit} hit
	   * @return {string}
	   */
	  _hitToString(hit) {
	    const mm = hit.modelMatrix;
	    return `${mm[12].toFixed(2)}, ${mm[13].toFixed(2)}, ${mm[14].toFixed(2)}`;
	  }

	  /**
	   * @param {number} x
	   * @param {number} y
	   * @return {VRHit?}
	   */
	  _onHitTest(x, y) {
	    const hits = this._nativeHitTest.call(this.vrDisplay, x, y);

	    const t = (parseInt(performance.now(), 10) / 1000).toFixed(1);
	    const didHit = hits && hits.length;

	    this.update(`${didHit ? this._hitToString(hits[0]) : 'MISS'} @ ${t}s`, didHit);
	    this._didPreviouslyHit = didHit;
	    return hits;
	  }
	}

	/**
	 * The ARDebugRow subclass for displaying pose information
	 * by wrapping `vrDisplay.getFrameData` and displaying the results.
	 */
	class ARDebugPoseRow extends ARDebugRow {
	  /**
	   * @param {VRDisplay} vrDisplay
	   */
	  constructor(vrDisplay) {
	    super('Pose');
	    this.vrDisplay = vrDisplay;
	    this._onGetFrameData = this._onGetFrameData.bind(this);

	    // Store the native hit test, or proxy the native `hitTest` call with our own
	    this._nativeGetFrameData = cachedVRDisplayMethods.get('getFrameData') ||
	                               this.vrDisplay.getFrameData;
	    cachedVRDisplayMethods.set('getFrameData', this._nativeGetFrameData);

	    this.update('Looking for position...');
	    this._initialPose = false;
	  }

	  /**
	   * Enables displaying and pulling getFrameData
	   */
	  enable() {
	    this.vrDisplay.getFrameData = this._onGetFrameData;
	  }

	  /**
	   * Disables displaying and pulling getFrameData
	   */
	  disable() {
	    this.vrDisplay.getFrameData = this._nativeGetFrameData;
	  }

	  /**
	   * @param {VRPose} pose
	   * @return {string}
	   */
	  _poseToString(pose) {
	    return `${pose[0].toFixed(2)}, ${pose[1].toFixed(2)}, ${pose[2].toFixed(2)}`;
	  }

	  /**
	   * Wrapper around getFrameData
	   *
	   * @param {VRFrameData} frameData
	   * @return {boolean}
	   */
	  _onGetFrameData(frameData) {
	    const results = this._nativeGetFrameData.call(this.vrDisplay, frameData);
	    const pose = frameData && frameData.pose && frameData.pose.position;
	    // Ensure we have a valid pose; while the pose SHOULD be null when not
	    // provided by the VRDisplay, on WebARonARCore, the xyz values of position
	    // are all 0 -- mark this as an invalid pose
	    const isValidPose = pose &&
	                        typeof pose[0] === 'number' &&
	                        typeof pose[1] === 'number' &&
	                        typeof pose[2] === 'number' &&
	                        !(pose[0] === 0 && pose[1] === 0 && pose[2] === 0);

	    // If we haven't received a pose yet, and still don't have a valid pose
	    // leave the message how it is
	    if (!this._initialPose && !isValidPose) {
	      return results;
	    }

	    if (isValidPose) {
	      this.update(this._poseToString(pose), true);
	    } else if (!isValidPose && this._lastPoseValid !== false) {
	      this.update(`Position lost`, false);
	    }

	    this._lastPoseValid = isValidPose;
	    this._initialPose = true;

	    return results;
	  }
	}

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

	console.log(three.PerspectiveCamera);

	// Reuse the frame data for getting the projection matrix
	let frameData;

	/**
	 * Class extending a THREE.PerspectiveCamera, attempting
	 * to use the projection matrix provided from an AR-enabled
	 * VRDisplay. If no AR-enabled VRDisplay found, uses provided
	 * parameters.
	 */
	class ARPerspectiveCamera extends three.PerspectiveCamera {
	  /**
	   * @param {VRDisplay} vrDisplay
	   * @param {number} fov
	   * @param {number} aspect
	   * @param {number} near
	   * @param {number} far
	   */
	  constructor(vrDisplay, fov, aspect, near, far) {
	    super(fov, aspect, near, far);
	    this.isARPerpsectiveCamera = true;
	    this.vrDisplay = vrDisplay;
	    this.updateProjectionMatrix();

	    if (!vrDisplay || !vrDisplay.capabilities.hasPassThroughCamera) {
	      console.warn(`ARPerspectiveCamera does not a VRDisplay with
                    a pass through camera. Using supplied values and defaults
                    instead of device camera intrinsics`);
	    }
	  }

	  /**
	   * Updates the underlying `projectionMatrix` property from
	   * the AR-enabled VRDisplay, or falls back to
	   * THREE.PerspectiveCamera.prototype.updateProjectionMatrix
	   */
	  updateProjectionMatrix() {
	    const projMatrix = this.getProjectionMatrix();
	    if (!projMatrix) {
	      super.updateProjectionMatrix();
	      return;
	    }

	    this.projectionMatrix.fromArray(projMatrix);
	  }

	  /**
	   * Gets the projection matrix from AR-enabled VRDisplay
	   * if possible.
	   * @return {!Float32Array}
	   */
	  getProjectionMatrix() {
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
	}

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

	const noop = function() {};

	const loadObj = (objPath, materials) => new Promise((resolve, reject) => {
	  const loader = new three.OBJLoader();

	  if (materials) {
	    loader.setMaterials(materials);
	  }

	  loader.load(objPath, resolve, noop, reject);
	});

	const loadMtl = mtlPath => new Promise((resolve, reject) => {
	  const loader = new three.MTLLoader();
	  const pathChunks = mtlPath.split('/');

	  if (pathChunks.length >= 2) {
	    loader.setTexturePath(pathChunks[pathChunks.length - 2]);
	  }

	  loader.load(mtlPath, resolve, noop, reject);
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

	const LEARN_MORE_LINK = 'https://developers.google.com/ar/develop/web/getting-started';
	const UNSUPPORTED_MESSAGE = `This augmented reality experience requires
  WebARonARCore or WebARonARKit, experimental browsers from Google
  for Android and iOS. Learn more at the <a href="${LEARN_MORE_LINK}">Google Developers site</a>.`;

	const ARUtils$1 = {};

	ARUtils$1.isTango = display =>
	  display && display.displayName.toLowerCase().includes('tango');
	const isTango = ARUtils$1.isTango;

	ARUtils$1.isARKit = display =>
	  display && display.displayName.toLowerCase().includes('arkit');
	const isARKit = ARUtils$1.isARKit;

	ARUtils$1.isARDisplay = display => isARKit(display) || isTango(display);
	const isARDisplay = ARUtils$1.isARDisplay;

	/**
	 * Returns a promise that resolves to either to a VRDisplay with
	 * AR capabilities, or null if no valid AR devices found on the platform.
	 *
	 * @return {Promise<VRDisplay?>}
	 */
	ARUtils$1.getARDisplay = () => new Promise((resolve, reject) => {
	  if (!navigator.getVRDisplays) {
	    resolve(null);
	    return;
	  }

	  navigator.getVRDisplays().then(displays => {
	    if (!displays && displays.length === 0) {
	      resolve(null);
	      return;
	    }

	    for (let display of displays) {
	      if (isARDisplay(display)) {
	        resolve(display);
	        return;
	      }
	    }
	    resolve(null);
	  });
	});


	/**
	 * Takes a path for an OBJ model and optionally a path for an MTL
	 * texture and returns a promise resolving to a THREE.Mesh loaded with
	 * the appropriate material. Can be used on downloaded models from Blocks.
	 *
	 * @param {string} objPath
	 * @param {string} mtlPath
	 * @return {THREE.Mesh}
	 */
	ARUtils$1.loadBlocksModel = (objPath, mtlPath) => new Promise((resolve, reject) => {
	  if (!THREE.OBJLoader || !THREE.MTLLoader) {
	    reject(new Error('Must include THREE.OBJLoader and THREE.MTLLoader'));
	    return;
	  }

	  let p = Promise.resolve();

	  if (mtlPath) {
	    p = loadMtl(mtlPath);
	  }

	  p.then(materials => {
	    if (materials) {
	      materials.preload();
	    }
	    return loadObj(objPath, materials);
	  }).then(obj => {
	    const model = obj.children[0];
	    model.geometry.applyMatrix(
	      new three.Matrix4().makeRotationY(three.Math.degToRad(-90))
	    );

	    return model;
	  }).then(resolve, reject);
	});


	const model = new three.Matrix4();
	const tempPos = new three.Vector3();
	const tempQuat = new three.Quaternion();
	const tempScale = new three.Vector3();

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
	ARUtils$1.placeObjectAtHit = (object, hit, easing=1, applyOrientation=false) => {
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
	const placeObjectAtHit = ARUtils$1.placeObjectAtHit;

	/**
	 * Injects a DOM element into the current page prompting the user that
	 * their browser does not support these AR features.
	 */
	ARUtils$1.displayUnsupportedMessage = () => {
	  const element = document.createElement('div');
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
	class ARReticle extends three.Mesh {
	  /**
	   * @param {VRDisplay} vrDisplay
	   * @param {number} innerRadius
	   * @param {number} outerRadius
	   * @param {number} color
	   * @param {number} easing
	   */
	  constructor(
	    vrDisplay,
	    innerRadius = 0.02,
	    outerRadius = 0.05,
	    color = 0xff0077,
	    easing = 0.25
	  ) {
	    const geometry = new three.RingGeometry(innerRadius, outerRadius, 36, 64);
	    const material = new three.MeshBasicMaterial({ color });

	    // Orient the geometry so it's position is flat on a horizontal surface
	    geometry.applyMatrix(new three.Matrix4().makeRotationX(three.Math.degToRad(-90)));

	    super(geometry, material);
	    this.visible = false;

	    this.easing = easing;
	    this.applyOrientation = true;
	    this.vrDisplay = vrDisplay;
	    this._planeDir = new three.Vector3();
	  }

	  /**
	   * Attempt to fire a raycast from normalized screen coordinates
	   * x and y and lerp the reticle to the position.
	   *
	   * @param {number} x
	   * @param {number} y
	   */
	  update(x = 0.5, y = 0.5) {
	    if (!this.vrDisplay || !this.vrDisplay.hitTest) {
	      return;
	    }

	    const hit = this.vrDisplay.hitTest(x, y);
	    if (hit && hit.length > 0) {
	      this.visible = true;
	      placeObjectAtHit(this, hit[0], this.applyOrientation, this.easing);
	    }
	  }
	}

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
	  let shader;
	  if (type == 'fragment') {
	    shader = gl.createShader(gl.FRAGMENT_SHADER);
	  } else if (type == 'vertex') {
	    shader = gl.createShader(gl.VERTEX_SHADER);
	  } else {
	    return null;
	  }

	  gl.shaderSource(shader, str);
	  gl.compileShader(shader);

	  const result = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
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
	  const vertexShader = getShader(gl, vs, 'vertex');
	  const fragmentShader = getShader(gl, fs, 'fragment');
	  if (!fragmentShader) {
	    return null;
	  }

	  const shaderProgram = gl.createProgram();
	  gl.attachShader(shaderProgram, vertexShader);
	  gl.attachShader(shaderProgram, fragmentShader);
	  gl.linkProgram(shaderProgram);

	  const result = gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);
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
	  let seeThroughCameraOrientationIndex = 0;
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
	  let screenOrientationIndex = 0;
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
	  let ret = screenOrientationIndex - seeThroughCameraOrientationIndex;
	  if (ret < 0) {
	    ret += 4;
	  }
	  return ret % 4;
	}

	/**
	 * Renders the ar camera's video texture
	 */
	class ARVideoRenderer {
	  /**
	   * @param {VRDisplay} vrDisplay
	   * @param {WebGLRenderingContext} gl
	   */
	  constructor(vrDisplay, gl) {
	    this.vrDisplay = vrDisplay;
	    this.gl = gl;
	    if (this.vrDisplay) {
	      this.passThroughCamera = vrDisplay.getPassThroughCamera();
	      this.program = getProgram(gl, vertexSource, fragmentSource);
	    }

	    gl.useProgram(this.program);

	    // Setup a quad
	    this.vertexPositionAttribute = gl.getAttribLocation(
	      this.program,
	      'aVertexPosition'
	    );
	    this.textureCoordAttribute = gl.getAttribLocation(
	      this.program,
	      'aTextureCoord'
	    );

	    this.samplerUniform = gl.getUniformLocation(this.program, 'uSampler');

	    this.vertexPositionBuffer = gl.createBuffer();
	    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
	    let vertices = [
	      -1.0,
	      1.0,
	      0.0,
	      -1.0,
	      -1.0,
	      0.0,
	      1.0,
	      1.0,
	      0.0,
	      1.0,
	      -1.0,
	      0.0,
	    ];
	    let f32Vertices = new Float32Array(vertices);
	    gl.bufferData(gl.ARRAY_BUFFER, f32Vertices, gl.STATIC_DRAW);
	    this.vertexPositionBuffer.itemSize = 3;
	    this.vertexPositionBuffer.numItems = 12;

	    this.textureCoordBuffer = gl.createBuffer();
	    gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
	    // Precalculate different texture UV coordinates depending on the possible
	    // orientations of the device depending if there is a VRDisplay or not
	    let textureCoords = null;
	    if (this.vrDisplay) {
	      let u =
	        this.passThroughCamera.width / this.passThroughCamera.textureWidth;
	      let v =
	        this.passThroughCamera.height / this.passThroughCamera.textureHeight;
	      textureCoords = [
	        [0.0, 0.0, 0.0, v, u, 0.0, u, v],
	        [u, 0.0, 0.0, 0.0, u, v, 0.0, v],
	        [u, v, u, 0.0, 0.0, v, 0.0, 0.0],
	        [0.0, v, u, v, 0.0, 0.0, u, 0.0],
	      ];
	    } else {
	      textureCoords = [
	        [0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0],
	        [1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0],
	        [1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0],
	        [0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0],
	      ];
	    }

	    this.f32TextureCoords = [];
	    for (let i = 0; i < textureCoords.length; i++) {
	      this.f32TextureCoords.push(new Float32Array(textureCoords[i]));
	    }
	    // Store the current combined orientation to check if it has changed
	    // during the update calls and use the correct texture coordinates.
	    this.combinedOrientation = combineOrientations(
	      screen.orientation.angle,
	      this.passThroughCamera.orientation
	    );

	    gl.bufferData(
	      gl.ARRAY_BUFFER,
	      this.f32TextureCoords[this.combinedOrientation],
	      gl.STATIC_DRAW
	    );
	    this.textureCoordBuffer.itemSize = 2;
	    this.textureCoordBuffer.numItems = 8;
	    gl.bindBuffer(gl.ARRAY_BUFFER, null);

	    this.indexBuffer = gl.createBuffer();
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	    let indices = [0, 1, 2, 2, 1, 3];
	    let ui16Indices = new Uint16Array(indices);
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
	  render() {
	    let gl = this.gl;
	    gl.useProgram(this.program);
	    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
	    gl.enableVertexAttribArray(this.vertexPositionAttribute);
	    gl.vertexAttribPointer(
	      this.vertexPositionAttribute,
	      this.vertexPositionBuffer.itemSize,
	      gl.FLOAT,
	      false,
	      0,
	      0
	    );

	    gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);

	    // Check the current orientation of the device combined with the
	    // orientation of the VRSeeThroughCamera to determine the correct UV
	    // coordinates to be used.
	    let combinedOrientation = combineOrientations(
	      screen.orientation.angle,
	      this.passThroughCamera.orientation
	    );
	    if (combinedOrientation !== this.combinedOrientation) {
	      this.combinedOrientation = combinedOrientation;
	      gl.bufferData(
	        gl.ARRAY_BUFFER,
	        this.f32TextureCoords[this.combinedOrientation],
	        gl.STATIC_DRAW
	      );
	    }
	    gl.enableVertexAttribArray(this.textureCoordAttribute);
	    gl.vertexAttribPointer(
	      this.textureCoordAttribute,
	      this.textureCoordBuffer.itemSize,
	      gl.FLOAT,
	      false,
	      0,
	      0
	    );

	    gl.activeTexture(gl.TEXTURE0);
	    gl.bindTexture(gl.TEXTURE_EXTERNAL_OES, this.texture);
	    // Update the content of the texture in every frame.
	    gl.texImage2D(
	      gl.TEXTURE_EXTERNAL_OES,
	      0,
	      gl.RGB,
	      gl.RGB,
	      gl.UNSIGNED_BYTE,
	      this.passThroughCamera
	    );
	    gl.uniform1i(this.samplerUniform, 0);

	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

	    gl.drawElements(
	      gl.TRIANGLES,
	      this.indexBuffer.numItems,
	      gl.UNSIGNED_SHORT,
	      0
	    );

	    // Disable enabled states to allow other render calls to correctly work
	    gl.bindTexture(gl.TEXTURE_EXTERNAL_OES, null);
	    gl.disableVertexAttribArray(this.vertexPositionAttribute);
	    gl.disableVertexAttribArray(this.textureCoordAttribute);
	    gl.bindBuffer(gl.ARRAY_BUFFER, null);
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	    gl.useProgram(null);
	  }
	}

	/**
	 * A helper class that takes a VRDisplay with AR capabilities
	 * and renders the see through camera to the passed in WebGLRenderer's
	 * context.
	 */
	class ARView {
	  /**
	   * @param {VRDisplay} vrDisplay
	   * @param {THREE.WebGLRenderer} renderer
	   */
	  constructor(vrDisplay, renderer) {
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
	  onWindowResize() {
	    this.width = window.innerWidth;
	    this.height = window.innerHeight;
	  }

	  /**
	   * Renders the see through camera to the passed in renderer
	   */
	  render() {
	    if (isARKit(this.vrDisplay)) {
	      return;
	    }

	    let gl = this.gl;
	    let dpr = window.devicePixelRatio;
	    let width = this.width * dpr;
	    let height = this.height * dpr;

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
	  _resetGLState() {
	    if (typeof this.renderer.resetGLState === 'function') {
	      // If using three.js <= r86
	      this.renderer.resetGLState();
	    } else {
	      // If using three.js >= r87
	      this.renderer.state.reset();
	    }
	  }
	}

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
	(function() {
	  if (window.webarSpeechRecognitionInstance) {

	    function addEventHandlingToObject(object) {
	      object.listeners = { };
	      object.addEventListener = function(eventType, callback) {
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
	      object.removeEventListener = function(eventType, callback) {
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
	      object.callEventListeners = function(eventType, event) {
	        if (!event) {
	          event = { target : this };
	        }
	        if (!event.target) {
	          event.target = this;
	        }
	        event.type = eventType;
	        var onEventType = 'on' + eventType;
	        if (typeof(this[onEventType]) === 'function') {
	          this[onEventType](event);
	        }
	        var listeners = this.listeners[eventType];
	        if (listeners) {
	          for (var i = 0; i < listeners.length; i++) {
	            var typeofListener = typeof(listeners[i]);
	            if (typeofListener === 'object') {
	              listeners[i].handleEvent(event);
	            }
	            else if (typeofListener === 'function') {
	              listeners[i](event);
	            }
	          }
	        }
	        return this;
	      };
	    } 

	    addEventHandlingToObject(window.webarSpeechRecognitionInstance);
	    window.webkitSpeechRecognition = function() {
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
