// using ES6 modules for three.ar.js 
import {
  ARUtils,
  ARView,
  ARPerspectiveCamera,
  ARDebug,
  ARReticle,
} from 'three.ar.js';
import {
  WebGLRenderer,
  Scene,
} from 'three';
import VRControls from 'three-vrcontrols-module';

let vrDisplay = null;
let renderer = null;
let arView = null;
let scene = null;
let camera = null;
let vrControls = null;
let reticle;

document.querySelector('.title').innerText = 'Reticle ES6';

ARUtils.getARDisplay().then(display => {
  if (display) {
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

const update = () => {
  arView.render();

  camera.updateProjectionMatrix();

  // Update our ARReticle's position, and provide normalized
  // screen coordinates to send the hit test -- in this case, (0.5, 0.5)
  // is the middle of our screen
  reticle.update(0.5, 0.5);

  vrControls.update();

  renderer.clearDepth();
  renderer.render(scene, camera);

  requestAnimationFrame(update);
};

const init = () => {
  const arDebug = new ARDebug(vrDisplay);
  document.body.appendChild(arDebug.getElement());

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

  reticle = new ARReticle(vrDisplay,
                                0.03, // innerRadius
                                0.04, // outerRadius
                                0xff0077, // color
                                0.25); // easing
  scene.add(reticle);

  vrControls = new VRControls(camera);

  // Bind our event handlers
  window.addEventListener('resize', onWindowResize, false);

  // Kick off the render loop!
  update();
};
