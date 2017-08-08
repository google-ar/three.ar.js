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

import { isARKit, getARCamera } from './ARUtils';

class ARPerspectiveCamera extends THREE.PerspectiveCamera {
  constructor(vrDisplay, fov, aspect, near, far) {
    super(fov, aspect, near, far);
    this.vrDisplay = vrDisplay;
    this.arCamera = getARCamera(vrDisplay);
    this.updateProjectionMatrix();
  }

  updateProjectionMatrix() {
    const { innerWidth, innerHeight } = window;
    const { arCamera } = this;

    if (!arCamera) {
      super.updateProjectionMatrix();
      return;
    }

    // With WebARKit, the projection matrix is provided,
    // however the near/far planes are not configurable by the user
    if (isARKit(this.vrDisplay)) {
      this.projectionMatrix.fromArray(arCamera.projectionMatrix);
      return;
    }

    const windowIsLandscape = innerWidth > innerHeight;
    const cameraIsLandscape = arCamera.width > arCamera.height;
    const swap = !(windowIsLandscape && cameraIsLandscape);

    const width  = swap ? arCamera.height : arCamera.width;
    const height = swap ? arCamera.width : arCamera.height;
    const fx     = swap ? arCamera.focalLengthY : arCamera.focalLengthX;
    const fy     = swap ? arCamera.focalLengthX : arCamera.focalLengthY;
    const cx     = swap ? arCamera.pointY : arCamera.pointX;
    const cy     = swap ? arCamera.pointX : arCamera.pointY;

    const xscale = this.near / fx;
    const yscale = this.near / fy;

    const xoffset = (cx - (width / 2.0)) * xscale;
    // Color camera's coordinates has Y pointing downwards so we negate this term.
    const yoffset = -(cy - (height / 2.0)) * yscale;

    const left   = xscale * -width / 2.0 - xoffset;
    const right  = xscale * width / 2.0 - xoffset;
    const bottom = yscale * -height / 2.0 - yoffset;
    const top    = yscale * height / 2.0 - yoffset;

    this.aspect = innerWidth / innerHeight;

    this.projectionMatrix.makeFrustum(
      left, right, bottom, top, this.near, this.far);

    // Recalculate the fov as threejs is not doing it.
    this.fov = THREE.Math.radToDeg(
      Math.atan((top * this.zoom) / this.near)) * 2.0;
  }
}

THREE.ARPerspectiveCamera = ARPerspectiveCamera;
export default ARPerspectiveCamera;
