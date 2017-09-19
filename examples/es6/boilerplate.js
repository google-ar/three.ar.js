// using ES6 modules for three.ar.js 
import { ARUtils, ARView, ARPerspectiveCamera } from 'three.ar.js';
import {
  WebGLRenderer,
  Scene,
  BoxGeometry,
  MeshNormalMaterial,
  Mesh,
} from 'three';
import VRControls from 'three-vrcontrols-module';

const BOX_DISTANCE = 1.5;
const BOX_SIZE = 0.25;
const BOX_QUANTITY = 6;

let vrDisplay = null;
let renderer = null;
let arView = null;
let scene = null;
let camera = null;
let vrControls = null;
let boxesAdded = false;

document.querySelector('.title').innerText = 'Boilerplate ES6';

ARUtils.getARDisplay().then(display => {
  if (display) {
    vrDisplay = display;
    init();
  } else {
    ARUtils.displayUnsupportedMessage();
  }
});

const addBoxes = () => {
  // Create some cubes around the origin point
  for (let i = 0; i < BOX_QUANTITY; i++) {
    const angle = Math.PI * 2 * (i / BOX_QUANTITY);
    const geometry = new BoxGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE);
    const material = new MeshNormalMaterial();
    const cube = new Mesh(geometry, material);
    cube.position.set(
      Math.cos(angle) * BOX_DISTANCE,
      camera.position.y - 0.25,
      Math.sin(angle) * BOX_DISTANCE);
    scene.add(cube);
  }

  // Flip this switch so that we only perform this once
  boxesAdded = true;
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const update = () => {
  arView.render();

  camera.updateProjectionMatrix();

  vrControls.update();

  if (!boxesAdded && !camera.position.y) {
    addBoxes();
  }

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

  // Bind our event handlers
  window.addEventListener('resize', onWindowResize, false);

  // Kick off the render loop!
  update();
};
