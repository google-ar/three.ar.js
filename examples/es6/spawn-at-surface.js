// using ES6 modules for three.ar.js 
import {
  ARUtils,
  ARView,
  ARDebug,
  ARPerspectiveCamera,
} from 'three.ar.js';
import {
  WebGLRenderer,
  Scene,
  Color,
  VertexColors,
  MeshBasicMaterial,
  BoxGeometry,
  Mesh,
} from 'three';
import VRControls from 'three-vrcontrols-module';

const BOX_SIZE = 0.2;

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

document.querySelector('.title').innerText = 'Tap to spawn objects on surfaces';

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
 * @param {MouseEvent} e
 */
const onClick = e => {
  // If we don't have a touches object, abort
  // TODO: is this necessary?
  if (!e.touches[0]) {
    return;
  }

  // Inspect the event object and generate normalize screen coordinates
  // (between 0 and 1) for the screen position.
  let x = e.touches[0].pageX / window.innerWidth;
  let y = e.touches[0].pageY / window.innerHeight;

  // Send a ray from the point of click to the real world surface
  // and attempt to find a hit. `hitTest` returns an array of potential
  // hits.
  let hits = vrDisplay.hitTest(x, y);

  // If a hit is found, just use the first one
  if (hits && hits.length) {
    let hit = hits[0];
    // Use the `placeObjectAtHit` utility to position
    // the cube where the hit occurred
    ARUtils.placeObjectAtHit(cube, // The object to place
                                   hit, // The VRHit object to move the cube to
                                   true, // Whether or not we also apply orientation
                                   1); // Easing value from 0 to 1; we want to move
                                          // the cube directly to the hit position
  }
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

  vrControls = new VRControls(camera);

  // Create the cube geometry and add it to the scene. Set the position
  // to (Infinity, Infinity, Infinity) so that it won't appear visible
  // until the first hit is found, and move it there
  const geometry = new BoxGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE);
  const faceIndices = ['a', 'b', 'c'];
  for (let i = 0; i < geometry.faces.length; i++) {
    let f = geometry.faces[i];
    for (let j = 0; j < 3; j++) {
      let vertexIndex = f[faceIndices[j]];
      f.vertexColors[j] = colors[vertexIndex];
    }
  }
  // Shift the cube geometry vertices upwards, so that the "pivot" of
  // the cube is at it's base. When the cube is added to the scene,
  // this will help make it appear to be sitting on top of the real-
  // world surface.
  // geometry.applyMatrix( new THREE.Matrix4().setTranslation( 0, BOX_SIZE / 2, 0 ) );
  geometry.translate( 0, BOX_SIZE / 2, 0 );
  let material = new MeshBasicMaterial({ vertexColors: VertexColors });
  cube = new Mesh(geometry, material);

  // Place the cube very far to initialize
  cube.position.set(10000, 10000, 10000);

  // Bind our event handlers
  window.addEventListener('resize', onWindowResize, false);
  renderer.domElement.addEventListener('touchstart', onClick, false);

  // Kick off the render loop!
  update();
};
