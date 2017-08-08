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

import { loadMtl, loadObj } from './loaders';

THREE.ARUtils = Object.create(null);

THREE.ARUtils.isTango = display =>
  display && display.displayName.toLowerCase().includes('tango');
export const isTango = THREE.ARUtils.isTango;

THREE.ARUtils.isARKit = display =>
  display && display.displayName.toLowerCase().includes('arkit');
export const isARKit = THREE.ARUtils.isARKit;

THREE.ARUtils.isARDisplay = display => isARKit(display) || isTango(display);
export const isARDisplay = THREE.ARUtils.isARDisplay;

/**
 * Returns a promise that resolves to either to a VRDisplay with
 * AR capabilities, or null if no valid AR devices found on the platform.
 *
 * @return {Promise<VRDisplay?>}
 */
THREE.ARUtils.getARDisplay = () => new Promise((resolve, reject) => {
  if (!navigator.getVRDisplays) {
    resolve(null);
    return;
  }

  navigator.getVRDisplays().then(displays => {
    if (!displays && displays.length === 0) {
      resolve(null);
      return;
    }

    for (var display of displays) {
      if (isARDisplay(display)) {
        resolve(display);
        return;
      }
    }
    resolve(null);
  });
});
export const getARDisplay = THREE.ARUtils.getARDisplay;

/**
 * Takes a path for an OBJ model and optionally a path for an MTL
 * texture and returns a promise resolving to a THREE.Mesh loaded with
 * the appropriate material. Can be used on downloaded models from Blocks.
 *
 * @param {string} objPath
 * @param {string} mtlPath
 * @return {THREE.Mesh}
 */
THREE.ARUtils.loadBlocksModel = (objPath, mtlPath) => new Promise((resolve, reject) => {
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
      new THREE.Matrix4().makeRotationY(THREE.Math.degToRad(-90))
    );

    return model;
  }).then(resolve, reject);
});
export const loadBlocksModel = THREE.ARUtils.loadBlocksModel;
