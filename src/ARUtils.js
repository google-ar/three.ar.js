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

import { Color, Matrix4, Quaternion, Vector3, Math as Math3 } from 'three';

import { loadMtl, loadObj } from './loaders';

const colors = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
].map(hex => new Color(hex));

const LEARN_MORE_LINK = 'https://developers.google.com/ar/develop/web/getting-started';
const UNSUPPORTED_MESSAGE = `This augmented reality experience requires
  WebARonARCore or WebARonARKit, experimental browsers from Google
  for Android and iOS. Learn more at the <a href="${LEARN_MORE_LINK}">Google Developers site</a>.`;


const ARUtils = Object.create(null);

ARUtils.isTango = display =>
  display && display.displayName.toLowerCase().includes('tango');
export const isTango = ARUtils.isTango;

ARUtils.isARKit = display =>
  display && display.displayName.toLowerCase().includes('arkit');
export const isARKit = ARUtils.isARKit;

ARUtils.isARDisplay = display => isARKit(display) || isTango(display);
export const isARDisplay = ARUtils.isARDisplay;

/**
 * Returns a promise that resolves to either to a VRDisplay with
 * AR capabilities, or null if no valid AR devices found on the platform.
 *
 * @return {Promise<VRDisplay?>}
 */
ARUtils.getARDisplay = () => new Promise((resolve, reject) => {
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
export const getARDisplay = ARUtils.getARDisplay;

/**
 * Takes a path for an OBJ model and optionally a path for an MTL
 * texture and returns a promise resolving to a THREE.Mesh loaded with
 * the appropriate material. Can be used on downloaded models from Blocks.
 *
 * @param {string} objPath
 * @param {string} mtlPath
 * @return {THREE.Mesh}
 */
ARUtils.loadBlocksModel = (objPath, mtlPath) => new Promise((resolve, reject) => {
  if (!global.THREE || !global.THREE.OBJLoader || !global.THREE.MTLLoader) {
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
      new Matrix4().makeRotationY(Math3.degToRad(-90))
    );

    return model;
  }).then(resolve, reject);
});
export const loadBlocksModel = ARUtils.loadBlocksModel;

const model = new Matrix4();
const tempPos = new Vector3();
const tempQuat = new Quaternion();
const tempScale = new Vector3();

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
ARUtils.placeObjectAtHit = (object, hit, easing=1, applyOrientation=false) => {
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
export const placeObjectAtHit = ARUtils.placeObjectAtHit;

/**
 * Returns a random color from the stored palette.
 * @return {THREE.Color}
 */
ARUtils.getRandomPaletteColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};
export const getRandomPaletteColor = ARUtils.getRandomPaletteColor;

/**
 * Injects a DOM element into the current page prompting the user that
 * their browser does not support these AR features.
 */
ARUtils.displayUnsupportedMessage = () => {
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
export const displayUnsupportedMessage = ARUtils.displayUnsupportedMessage;

export default ARUtils;
