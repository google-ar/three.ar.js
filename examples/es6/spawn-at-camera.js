// using ES6 modules for three.ar.js 
import { ARUtils, ARView, ARPerspectiveCamera } from 'three.ar.js';
import {
  WebGLRenderer,
  Scene,
  Color,
  Quaternion,
  Matrix4,
  Vector3,
  BoxGeometry,
  MeshBasicMaterial,
  VertexColors,
  Mesh,
} from 'three';
import VRControls from 'three-vrcontrols-module';

let vrDisplay = null;
let renderer = null;
let arView = null;
let scene = null;
let camera = null;
let vrControls = null;
let vrFrameData = null;

let cube;

const colors = [
  new Color( 0xffffff ),
  new Color( 0xffff00 ),
  new Color( 0xff00ff ),
  new Color( 0xff0000 ),
  new Color( 0x00ffff ),
  new Color( 0x00ff00 ),
  new Color( 0x0000ff ),
  new Color( 0x000000 ),
];

document.querySelector('.title').innerText = 'Tap to spawn objects at camera position';

ARUtils.getARDisplay().then(display => {
  if (display) {
    vrFrameData = new VRFrameData();
    vrDisplay = display;
    init();
  } else {
    ARUtils.displayUnsupportedMessage();
  }
});

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

/**
 * When clicking on the screen, create a cube at the user's
 * current position.
 */
const onClick = () => {
  // Fetch the pose data from the current frame
  let pose = vrFrameData.pose;

  // Convert the pose orientation and position into
  // THREE.Quaternion and THREE.Vector3 respectively
  let ori = new Quaternion(
    pose.orientation[0],
    pose.orientation[1],
    pose.orientation[2],
    pose.orientation[3]
  );

  let pos = new Vector3(
    pose.position[0],
    pose.position[1],
    pose.position[2]
  );

  let dirMtx = new Matrix4();
  dirMtx.makeRotationFromQuaternion(ori);

  let push = new Vector3(0, 0, -1.0);
  push.transformDirection(dirMtx);
  pos.addScaledVector(push, 0.125);

  // Clone our cube object and place it at the camera's
  // current position
  let clone = cube.clone();
  scene.add(clone);
  clone.position.copy(pos);
  clone.quaternion.copy(ori);
};

const update = () => {
  arView.render();

  camera.updateProjectionMatrix();

  // From the WebVR API, populate `vrFrameData` with
  // updated information for the frame
  vrDisplay.getFrameData(vrFrameData);

  vrControls.update();

  renderer.clearDepth();
  renderer.render(scene, camera);

  requestAnimationFrame(update);
};

const init = () => {
  renderer = new WebGLRenderer({ alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  document.body.appendChild(renderer.domElement);

  arView = new ARView(vrDisplay, renderer);
  scene = new Scene();

  camera = new ARPerspectiveCamera(
    vrDisplay,
    60,
    window.innerWidth / window.innerHeight,
    vrDisplay.depthNear,
    vrDisplay.depthFar
  );

  vrControls = new VRControls(camera);

  // Create the cube geometry that we'll copy and place in the
  // scene when the user clicks the screen
  const geometry = new BoxGeometry( 0.05, 0.05, 0.05 );
  const faceIndices = ['a', 'b', 'c'];
  for (let i = 0; i < geometry.faces.length; i++) {
    let f = geometry.faces[i];
    for (let j = 0; j < 3; j++) {
      let vertexIndex = f[faceIndices[j]];
      f.vertexColors[j] = colors[vertexIndex];
    }
  }
  let material = new MeshBasicMaterial({ vertexColors: VertexColors });
  cube = new Mesh(geometry, material);

  // Bind our event handlers
  window.addEventListener('resize', onWindowResize, false);
  renderer.domElement.addEventListener('touchstart', onClick, false);

  // Kick off the render loop!
  update();
};
