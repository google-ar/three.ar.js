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

import {
  DoubleSide,
  Color,
  Object3D,
  RawShaderMaterial,
  Geometry,
  Vector3,
  Face3,
} from 'three';

import { getRandomPaletteColor } from './ARUtils';
import vertexShader from './shaders/arplanes.vert';
import fragmentShader from './shaders/arplanes.frag';

const DEFAULT_MATERIAL = new RawShaderMaterial({
  side: DoubleSide,
  transparent: true,
  uniforms: {
    dotColor: {
      value: new Color(0xffffff),
    },
    lineColor: {
      value: new Color(0x707070),
    },
    backgroundColor: {
      value: new Color(0x404040),
    },
    dotRadius: {
      value: 0.006666666667,
    },
    alpha: {
      value: 0.4,
    },
  },
  vertexShader,
  fragmentShader,
});

/**
 * The ARDebugRow subclass for displaying planes information
 * by wrapping polling getPlanes, and rendering.
 */
class ARPlanes extends Object3D {
  /**
   * @param {VRDisplay} vrDisplay
   */
  constructor(vrDisplay) {
    super();
    this.vrDisplay = vrDisplay;
    this.planes = [];

    // A mapping of plane IDs to colors, so that we can reuse the same
    // color everytime we update for the same plane rather than randomizing
    // @TODO When we have plane removal events, clear this map so we don't
    // have a leak
    this.materialMap = new Map();
  }

  /**
   * Clear out the THREE representation mesh from
   * scene.
   */
  clear() {
    this.planes.forEach(plane => this.remove(plane));
    this.planes.length = 0;
  }

  /**
   * Polling callback while enabled, used to fetch and orchestrate
   * plane rendering. If successful, returns the number of planes found.
   *
   * @return {number?}
   */
  update() {
    if (!this.vrDisplay || !this.vrDisplay.getPlanes) {
      return;
    }

    // Remove current planes and clear out
    // from scene
    this.clear();

    // Recreate each plane detected
    const planes = this.vrDisplay.getPlanes();
    for (const anchor of planes) {
      if (anchor.vertices.length == 0) {
        continue;
      }

      const id = anchor.identifier;
      const planeObj = new Object3D();
      const mm = anchor.modelMatrix;
      planeObj.matrixAutoUpdate = false;
      planeObj.matrix.set(
        mm[0],
        mm[4],
        mm[8],
        mm[12],
        mm[1],
        mm[5],
        mm[9],
        mm[13],
        mm[2],
        mm[6],
        mm[10],
        mm[14],
        mm[3],
        mm[7],
        mm[11],
        mm[15]
      );

      this.add(planeObj);
      this.planes.push(planeObj);

      const geo = new Geometry();
      // generate vertices
      for (let pt = 0; pt < anchor.vertices.length / 3; pt++) {
        geo.vertices.push(
          new Vector3(
            anchor.vertices[pt * 3],
            anchor.vertices[pt * 3 + 1],
            anchor.vertices[pt * 3 + 2]
          )
        );
      }

      // generate faces
      for (let face = 0; face < geo.vertices.length - 2; face++) {
        // this makes a triangle fan, from the first +Y point around
        geo.faces.push(new Face3(0, face + 1, face + 2));
      }

      let material;
      if (this.materialMap.has(id)) {
        // If we have a material stored for this plane already, reuse it
        material = this.materialMap.get(id);
      } else {
        // Otherwise, generate a new color, and assign the color to
        // this plane's ID
        const color = getRandomPaletteColor();
        material = DEFAULT_MATERIAL.clone();
        material.uniforms.backgroundColor.value = color;
        this.materialMap.set(id, material);
      }

      const plane = new THREE.Mesh(geo, material);
      planeObj.add(plane);
    }

    return planes.length;
  }
}

export default ARPlanes;
