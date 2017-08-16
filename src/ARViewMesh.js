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

import { isARDisplay, isARKit } from "./ARUtils";
import vertexShader from "./shaders/arview.vert";
import fragmentShader from "./shaders/arview.frag";

/**
 * A mesh that renders the passed in VRDisplay's see through camera,
 * if applicable.
 */
class ARViewMesh extends THREE.Mesh {
  constructor(vrDisplay) {
    console.log(vrDisplay);
    const arCamera = vrDisplay.getPassThroughCamera();

    if (!isARDisplay(vrDisplay) || isARKit(vrDisplay)) {
      super(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial());
      return;
    }

    let u = arCamera.width / arCamera.textureWidth;
    let v = arCamera.height / arCamera.textureHeight;

    // Store uvs for 4 possible orientations:
    // 0: 0 degrees
    // 1: 90 degrees
    // 2: 180 degrees
    // 3: 270 degrees
    const uvs = createARViewMeshUVs(u, v);
    const currentUVIndex = 0;

    // Create geometry with the 0 degrees orientation.
    // We will update the uv based on orientation later
    const geometry = createARViewMeshGeometry(uvs[0]);
    const material = createARViewMeshMaterial(arCamera);

    super(geometry, material);

    this.arCamera = arCamera;

    this.uvs = uvs;
    this.currentUVIndex = currentUVIndex;

    this.updateOrientation();
  }

  /**
  * Updates the camera mesh texture coordinates depending on the
  * orientation of the current screen and the AR camera.
  */
  updateOrientation() {
    // If we're using a non ARDisplay, or an ARDisplay does not
    // use a camera implementation (like ARKit), ignore this
    if (!this.arCamera) {
      return;
    }

    const uvIndex = getNormalizedIndexFromOrientation(this.arCamera);

    if (uvIndex === this.currentUVIndex) {
      return;
    }

    const uvs = this.geometry.getAttribute("uv");
    const newUVs = this.uvs[uvIndex];

    for (let i = 0; i < uvs.length; i++) {
      uvs.array[i] = newUVs[i];
    }

    uvs.needsUpdate = true;
    this.currentUVIndex = uvIndex;
  }
}

/**
 * Create a THREE.BufferGeometry set up with the expected
 * attributes.
 *
 * @param {Float32Array<number>} uv
 * @return {THREE.BufferGeometry}
 */
function createARViewMeshGeometry(uv) {
  const geometry = new THREE.BufferGeometry();

  const positionBuffer = new Float32Array([
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
    0.0
  ]);

  geometry.addAttribute(
    "position",
    new THREE.BufferAttribute(positionBuffer, 3)
  );

  geometry.addAttribute(
    "uv",
    new THREE.BufferAttribute(new Float32Array(uv), 2)
  );

  geometry.setIndex(
    new THREE.BufferAttribute(new Uint16Array([0, 1, 2, 2, 1, 3]), 1)
  );

  geometry.computeBoundingSphere();

  return geometry;
}

/**
 * Create an array of 4 texture coordinate arrays (one for each orientation),
 * based off of the passed in uv values.
 *
 * @param {number} u
 * @param {number} v
 * @return {Array<Float32Array<number>>}
 */
function createARViewMeshUVs(u, v) {
  // All the possible texture coordinates for the 4 possible orientations.
  // The ratio between the texture size and the camera size is used in order
  // to be compatible with the YUV to RGB conversion option (not recommended
  // but still available).
  return [
    new Float32Array([0, 0, 0, v, u, 0, u, v]),
    new Float32Array([u, 0, 0, 0, u, v, 0, v]),
    new Float32Array([u, v, u, 0, 0, v, 0, 0]),
    new Float32Array([0, v, u, v, 0, 0, u, 0])
  ];
}

/**
 * Creates a THREE.Material to render the video texture of an AR Camera
 * upon, or a basic material if no AR Camera provided.
 *
 * @param {VRSeeThroughCamera?} arCamera
 * @return {THREE.Material}
 */
function createARViewMeshMaterial(arCamera) {
  // The material is different if the see through camera is
  // provided inside the vrDisplay or not.
  if (!arCamera) {
    return new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide
    });
  }

  // HACK: Needed to tell the THREE.VideoTexture that the video is ready and
  // that the texture needs update.
  arCamera.readyState = 2;
  arCamera.HAVE_CURRENT_DATA = 2;

  const videoTexture = new THREE.VideoTexture(arCamera);
  videoTexture.minFilter = THREE.NearestFilter;
  videoTexture.magFilter = THREE.NearestFilter;
  videoTexture.format = THREE.RGBFormat;
  videoTexture.flipY = false;

  return new THREE.RawShaderMaterial({
    uniforms: {
      map: {
        value: videoTexture
      }
    },
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide
  });
}

/**
 * Maps an orientation value (0, 90, 180, 270) to the index of stored
 * uv values.
 *
 * @param {number} orientation
 * @return {number}
 */
function getIndexFromOrientation(orientation) {
  switch (orientation) {
    case 90:
      return 1;
    case 180:
      return 2;
    case 270:
      return 3;
    default:
      return 0;
  }
}

/**
* Returns an index that is based on the combination between the
* display orientation and the AR camera orientation. This index will
* always be device natural orientation independent.
*
* @param {VRSeeThroughCamera?} arCamera
* @return {number} The index from 0 to 3 that represents the
*                  combination of the device and see through camera
*                  orientations.
*/
function getNormalizedIndexFromOrientation(arCamera) {
  let cameraOrientation = arCamera ? arCamera.orientation : 0;
  let screenOrientation = screen.orientation.angle;

  let result =
    getIndexFromOrientation(screenOrientation) -
    getIndexFromOrientation(cameraOrientation);
  return (result + 4) % 4;
}

export default ARViewMesh;
