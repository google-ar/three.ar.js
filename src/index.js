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
/* eslint no-undef: "off" */
import ARDebug from './ARDebug';
import ARPerspectiveCamera from './ARPerspectiveCamera';
import ARReticle from './ARReticle';
import ARUtils from './ARUtils';
import ARView from './ARView';
import './ARSpeechRecognition';

// If including three.ar.js as a standalone script tag,
// we'll need to expose these objects directly by attaching
// them on the THREE global
if (typeof global.THREE === 'object') {
  global.THREE.ARDebug = ARDebug;
  global.THREE.ARPerspectiveCamera = ARPerspectiveCamera;
  global.THREE.ARReticle = ARReticle;
  global.THREE.ARUtils = ARUtils;
  global.THREE.ARView = ARView;
}

export {
  ARDebug,
  ARPerspectiveCamera,
  ARReticle,
  ARUtils,
  ARView,
};
