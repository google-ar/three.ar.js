import { ARUtils, ARView, ARPerspectiveCamera } from 'three.ar.js';
import {
  WebGLRenderer,
  Scene,
  DoubleSide,
  Vector3,
  Quaternion,
  BufferGeometry,
  BufferAttribute,
  TriangleStripDrawMode,
  Math as Math3,
  Mesh,
  RawShaderMaterial,
} from 'three';
import VRControls from 'three-vrcontrols-module';

import { vert as graffitiVert, frag as graffitiFrag } from './shaders/graffiti.glsl';

let vrDisplay = null;
let renderer = null;
let arView = null;
let scene = null;
let camera = null;
let vrControls = null;

const MINIMIM_POINT_DISTANCE = 0.001;
const MINIMUM_STROKE_POINTS = 2;
const MINIMUM_BRUSH_POINTS = 2;

const STROKE_DISTANCE = 0.1;
const STROKE_WIDTH_EASING = 0.05;
const STROKE_WIDTH_MINIMUM = 0.00125;
const STROKE_WIDTH_MAXIMUM = 0.1;
const STROKE_WIDTH_MODIFIER = 1.25;

const STROKE_POSITION_EASING = 0.5;
const STROKE_VELOCITY_EASING = 0.5;
// const STROKE_ORTHOGONAL_EASING = 0.5;
const STROKE_NORMAL_EASING = 0.95;
const STROKE_NORMAL_QUAT_EASING = 0.5;

const MINIMIM_ERASE_ENERGY = 0.005;
const MINIMIM_ERASE_ENERGY_FRAMES = 15;

// Setup drawing variables.
let drawing = false;
let stroke = [];
let strokes = [];
let strokeIndex = 0;

let brush;
let brushStroke = [];

const drawMaterial = new RawShaderMaterial({
  vertexShader: graffitiVert,
  fragmentShader: graffitiFrag,
  side: DoubleSide,
  transparent: true,
});

document.querySelector('.title').innerText = 'Graffiti ES6';

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

  vrControls.update();

  // Update Brush Physics
  updatePhysics();

  // Check for shake to undo functionality
  checkForShake();

  // Update the current graffiti stroke.
  if (drawing) {
    processDraw();
  }

  renderer.clearDepth();
  renderer.render(scene, camera);

  requestAnimationFrame(update);
};

// Get a point in front of the device to use as the drawing location.
// Pass in a Vector3 to be populated with data to avoid creating garbage.
// This strange function structure is a way of avoiding creating garbage while
// generating the rotated forward vector.
const getDrawPoint = (function() {
  // Setup a basic forward vector (scaled down so it's not so far away).
  let forward = new Vector3(0, 0, -1).multiplyScalar(STROKE_DISTANCE);

  // Create a scratch vector for generating the rotated forward vector.
  let rotatedForward = new Vector3();
  return function(out) {
    // Start with the camera position, which is equivalent to device pose.
    out.copy(camera.position);

    // Rotate the forward vector by the pose orientation.
    rotatedForward.copy(forward);
    rotatedForward.applyQuaternion(camera.quaternion);
    out.add(rotatedForward);
  };
})();

// Basic physics parameters to help smooth out input data for nicer
// brsuh strokes
let strokeWidth = STROKE_WIDTH_MINIMUM;

let position = new Vector3();
let previousPosition = new Vector3();

let normalQuat = new Quaternion();
let previousNormalQuat = new Quaternion();

let normal = new Vector3(0, 0, 1);
let previousNormal = new Vector3(0, 0, 1);

let velocity = new Vector3();
let previousVelocity = new Vector3();

let acceleration = new Vector3();
// An array to keep track of the past accelerations
let accelerationArray = [];

/**
 * This function returns an object that represents a point in the stroke.
 * The position, normal, velocity and width values are used to help calculate
 * how the stroke will look. They are set by the physics values being
 * calculated every frame inside the updatePhysics function
 * @return {Object}
 */
const getStroke = () => {
  return {
    position: new Vector3(position.x, position.y, position.z),
    normal: new Vector3(normal.x, normal.y, normal.z),
    velocity: new Vector3(velocity.x, velocity.y, velocity.z),
    width: strokeWidth,
  };
};

/**
 * This function is called when the user touches down and starts to draw
 * a stroke
 */
const processDraw = () => {
  // Add the draw point to the current stroke.
  stroke.push(getStroke());

  // Check to see if you have enough points (2) to start drawing a stroke
  if (stroke.length < MINIMUM_STROKE_POINTS) {
    return;
  }

  // Get the last two points in the stroke
  let s0 = stroke[stroke.length - 2];
  let s1 = stroke[stroke.length - 1];

  // Check if the distance between the last two points is bigger
  // than a set amount, this avoids tiny strips in the brush stroke
  if (s0.position.distanceTo(s1.position) < MINIMIM_POINT_DISTANCE) {
    stroke.pop();
    return;
  }

  // Remove the old stroke from the scene so we can regenerate the stroke.
  if (strokes[strokeIndex]) {
    scene.remove(strokes[strokeIndex]);
  }

  // Generate a new stroke and cache it in our array of strokes
  strokes[strokeIndex] = generateStroke(stroke);

  // Add the stroke to the threejs scene for rendering
  scene.add(strokes[strokeIndex]);
};

/**
 * This function is responsible for constantly rendering a brush reticle
 * when the user is not touching down on the screen. This helps to pre-
 * visualize the dynamics of the brush (color, stroke width, etc)
 */
const processDrawBrush = () => {
  // Add the draw point to the current stroke.
  brushStroke.push(getStroke());

  // Don't use positions if they aren't far enough away from the previous point.
  if (brushStroke.length < MINIMUM_BRUSH_POINTS) {
    return;
  }

  // Remove the old brush reticle from the scene so we can regenerate it
  if (brush) {
    brushStroke.shift();
    scene.remove(brush);
  }

  // Get the last two points in the stroke
  let b0 = brushStroke[brushStroke.length - 2];
  let b1 = brushStroke[brushStroke.length - 1];

  // Check if the distance between the last two points is bigger
  // than a set amount, this avoids tiny strips in the brush stroke
  if (b0.position.distanceTo(b1.position) < MINIMIM_POINT_DISTANCE) {
    return;
  }

  // Generate a new stroke and sets it to brush reticle
  brush = generateStroke(brushStroke);

  // Add the brush reticle to the threejs scene for rendering
  scene.add(brush);
};

/**
 * This function calculates the positions, normals, uvs and velocities
 * float32Arrays needed to create a buffer geometry so we can render our brush
 * strokes using threejs (WebGL)
 * @param {Float32Array} strokeData
 * @return {Object}
 */
const generateStroke = strokeData => {
  // Create Float32Arrays of the proper size to hold vertex information
  // Each stroke is rendered by a triangle strip, thus each stroke point yields
  // two verticies, and each vertex contains three (x, y, z) or two
  // floats (u, v) depending on property.
  let positions = new Float32Array(strokeData.length * 2 * 3);
  let normals = new Float32Array(strokeData.length * 2 * 3);
  let uvs = new Float32Array(strokeData.length * 2 * 2);
  let velocities = new Float32Array(strokeData.length * 2 * 3);

  // Create a Vector3 to cache the vertex offset vector
  let v = new Vector3();
  // Create a reference to the last stroke point's velocity
  let lastVelocity;
  // Create two Vector3s to cache the positions of the two vertex positions
  // calculated from the origin stroke position and its physics properties
  let p1 = new Vector3();
  let p2 = new Vector3();
  // Create a variable to keep track of whether the current stroke point's
  // velocity is in the opposite direction of the last point's velocity
  let flip = false;

  // loop through the stroke points and calculate its two emiited vertex
  // offset positions and set their other properties in the Float32Arrays
  // created above
  for (let i = 0; i < strokeData.length; i++) {
    // Get the current stroke point
    let entry = strokeData[i];

    // Calculate the stroke point's offset by using the cross product of the
    // stroke point's normal and its velocity
    v.crossVectors(entry.normal, entry.velocity);
    // Normalize the vector and scale it by the precalculated stroke width
    v.normalize();
    // This width is based on how fast the user was moving the device when the
    // stroke was drawn
    v.multiplyScalar(entry.width);

    // If this isn't the first point check for a velocity flip, otherwise create
    // a new Vector3
    if ( lastVelocity ) {
      // Use the dot product to check whether the current velocity is in the
      // direction as the previous stroke's velocity
      let directionChange = lastVelocity.dot( entry.velocity );
      if ( directionChange < 0 ) {
        flip = !flip;
      }
    } else {
      lastVelocity = new Vector3();
    }
    lastVelocity.copy( entry.velocity );

    // this is used to avoid improper drawing of triangles when the user
    // changes direction of a stroke
    if ( flip ) {
      p1.addVectors(entry.position, v);
      p2.subVectors(entry.position, v);
    } else {
      p1.subVectors(entry.position, v);
      p2.addVectors(entry.position, v);
    }

    // Calculate the offset for the current vertex (i * 2 * 3)
    // Set the positions for the ith and ith + 1 verticies
    let index = i * 2 * 3;
    positions[index] = p1.x;
    positions[index + 1] = p1.y;
    positions[index + 2] = p1.z;
    positions[index + 3] = p2.x;
    positions[index + 4] = p2.y;
    positions[index + 5] = p2.z;

    // Calculate the offset for the current vertex (i * 2 * 3)
    index = i * 2 * 3;
    // Set the normals for the ith and ith + 1 verticies
    normals[index] = entry.normal.x;
    normals[index + 1] = entry.normal.y;
    normals[index + 2] = entry.normal.z;
    normals[index + 3] = entry.normal.x;
    normals[index + 4] = entry.normal.y;
    normals[index + 5] = entry.normal.z;

    // Calculate the offset for the current vertex (i * 2 * 3)
    index = i * 2 * 3;
    // Set the velocities for the ith and ith + 1 verticies
    velocities[index] = entry.velocity.x;
    velocities[index + 1] = entry.velocity.y;
    velocities[index + 2] = entry.velocity.z;
    velocities[index + 3] = entry.velocity.x;
    velocities[index + 4] = entry.velocity.y;
    velocities[index + 5] = entry.velocity.z;


    // Calculate the offset for the current vertex (i * 2 * 3)
    index = i * 2 * 2;
    // Set the uvs for the ith and ith + 1 verticies
    // Each complete stroke has vertex coordinates from (0,0) to (1,1)
    uvs[index] = i / (strokeData.length - 1);
    uvs[index + 1] = 0;
    uvs[index + 2] = i / (strokeData.length - 1);
    uvs[index + 3] = 1;
  }

  // Create a Threejs BufferGeometry
  let geometry = new BufferGeometry();

  /**
   * disposeArray
   */
  function disposeArray() {
    this.array = null; // eslint-disable-line
  }
  // Add attributes to the buffer geometry using the Float32Arrays created
  // above. This will tell our shader pipeline information about each vertex
  // so we can create all types of dynamic strokes & paints
  geometry.addAttribute('position', new BufferAttribute(positions, 3).onUpload(disposeArray));
  geometry.addAttribute('normal', new BufferAttribute(normals, 3).onUpload(disposeArray));
  geometry.addAttribute('uv', new BufferAttribute(uvs, 2).onUpload(disposeArray));
  geometry.addAttribute('velocity', new BufferAttribute(velocities, 3).onUpload(disposeArray)); //eslint-disable-line
  geometry.computeBoundingSphere();

  // Create a Threejs mesh and set its draw mode to triangle strips
  let mesh = new Mesh(geometry, drawMaterial);
  mesh.drawMode = TriangleStripDrawMode;
  return mesh;
};

/**
 * Small utility function to sum the last n frames of acceleration to see if
 * the device was shaken. If the device was shaken, then the last stroke is
 * erased.
 */
const checkForShake = () => {
  // Calculate the current acceleration's magnitude and add it to the
  // acceleration array
  accelerationArray.push(acceleration.length());
  let len = accelerationArray.length;
  // if the accelerationArray has enough frames to calculate whether the user
  // has shaken the device, then check for a shake
  if (len > MINIMIM_ERASE_ENERGY_FRAMES) {
    // Sum the "energy" total by looping through the accelerationArray values
    let energy = 0;
    for (let i = 0; i < len; i++) {
      energy += accelerationArray[i];
    }
    // Check to see if the total energy is greate than a preset amount
    // this amount was calculated via user testing different shake thresholds
    if (energy > MINIMIM_ERASE_ENERGY * MINIMIM_ERASE_ENERGY_FRAMES) {
      // If a shake was detected, clear the accelerationArray so we don't get
      // multiple shakes in a small time frame
      accelerationArray.length = 0;
      // This is the action that happens when the user shakes the device, the
      // app clears or removes the last stroke
      clearLastStroke();
    } else {
      // If the energy wasn't high enough pop off the oldest acceleration value
      accelerationArray.shift();
    }
  }
};


/**
 * Clears all the strokes and essentially lets the user start over
 */
const clearStrokes = () => {
  // If the user if currently drawing, stop
  drawing = false;
  // Clear the current stroke array
  stroke.length = 0;
  // Reset the current stroke index
  strokeIndex = 0;

  // Remove all the threejs mesh strokes from the scene
  let len = strokes.length;
  for ( let i = 0; i < len; i++ ) {
    scene.remove(strokes[i]);
  }
};

/**
 * Clears the last stroke, acts essentially as an UNDO
 */
const clearLastStroke = () => {
  // If the user if currently drawing, stop, and remove the stroke
  if ( drawing ) {
    drawing = false;
    scene.remove(strokes[strokeIndex]);
    stroke.length = 0;
  }
  // Also remove the last drawn stroke
  strokeIndex -= 1;
  scene.remove(strokes[strokeIndex]);
};

/**
 * update physics function, called once per frame. Handles updating and
 * smoothing out rough input data from AR Session
 */
const updatePhysics = () => {
  // Cache previous positions & normals
  previousPosition.copy(position);
  previousNormal.copy(normal);
  previousNormalQuat.copy(normalQuat);
  previousVelocity.copy(velocity);

  // Update Drawing Stroke Position
  getDrawPoint(position);
  position.lerpVectors(previousPosition, position, STROKE_POSITION_EASING);

  normalQuat.slerp(camera.quaternion, STROKE_NORMAL_QUAT_EASING);

  // Update Drawing Stroke Normal
  normal.set(0, 0, 1);
  normal.applyQuaternion(normalQuat);
  normal.normalize();
  normal.lerpVectors(previousNormal, normal, STROKE_NORMAL_EASING);

  // Update velocity
  velocity.subVectors(position, previousPosition);
  velocity.lerpVectors(previousVelocity, velocity, STROKE_VELOCITY_EASING);

  // Update acceleration
  acceleration.subVectors(velocity, previousVelocity);

  // Update Drawing Stroke Width
  strokeWidth = Math3.lerp(strokeWidth, velocity.length() * STROKE_WIDTH_MODIFIER, STROKE_WIDTH_EASING); //eslint-disable-line
  strokeWidth = Math.min( Math.max( strokeWidth, STROKE_WIDTH_MINIMUM ), STROKE_WIDTH_MAXIMUM );
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
  renderer.domElement.addEventListener('touchstart', event => {
    drawing = true;
  });

  // Stop the current draw stroke when the user finishes the touch.
  renderer.domElement.addEventListener('touchend', event => {
    drawing = false;
    stroke.length = 0;
    strokeIndex += 1;
  });

  // Kick off the render loop!
  update();
};
