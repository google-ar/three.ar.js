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

import ARViewMesh from './ARViewMesh';
import { isARKit } from './ARUtils';

/**
 * A helper class that takes a VRDisplay with AR capabilities
 * and renders the see through camera to the passed in WebGLRenderer's
 * context.
 */
class ARView {
  /**
   * @param {VRDisplay}
   */
  constructor(vrDisplay) {
    this.vrDisplay = vrDisplay;
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 100);
    this.mesh = new ARViewMesh(vrDisplay);
    this.scene.add(this.mesh);
  }

  /**
   * Updates the underlying mesh's orientation if necessary.
   */
  update() {
    this.mesh.updateOrientation();
  }

  /**
   * Renders the see through camera to the passed in renderer
   *
   * @param {THREE.WebGLRenderer}
   */
  render(renderer) {
    // Don't render anything in ARKit since the platform handles
    // the see-through camera rendering.
    if (isARKit(this.vrDisplay)) {
      return;
    }
    renderer.render(this.scene, this.camera);
  }
};

THREE.ARView = ARView;
export default ARView;
