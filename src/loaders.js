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

export const loadObj = (objPath, materials) => new Promise((resolve, reject) => {
  const loader = new global.THREE.OBJLoader();

  if (materials) {
    loader.setMaterials(materials);
  }

  loader.load(objPath, resolve, noop, reject);
});

export const loadMtl = mtlPath => new Promise((resolve, reject) => {
  const loader = new global.THREE.MTLLoader();

  loader.setTexturePath(mtlPath.substring(0, mtlPath.lastIndexOf("/") + 1));

  loader.load(mtlPath, resolve, noop, reject);
});
