 window.onload = function() {
     var vrDisplay, vrControls, arView;
     var canvas, camera, scene, renderer;
     var BOX_DISTANCE = 1.5;
     var BOX_SIZE = 0.25;
     var BOX_QUANTITY = 6;
     var boxesAdded = false;


     Flipsnap('.flipsnap', {
         distance: 230,
         transitionDuration: 1000
     });

     /**
      * Use the `getARDisplay()` utility to leverage the WebVR API
      * to see if there are any AR-capable WebVR VRDisplays. Returns
      * a valid display if found. Otherwise, display the unsupported
      * browser message.
      */
     THREE.ARUtils.getARDisplay().then(function(display) {
         if (display) {
             vrDisplay = display;
             init();
         } else {
             THREE.ARUtils.displayUnsupportedMessage();
         }
     });

     function init() {
         // Setup the three.js rendering environment
         renderer = new THREE.WebGLRenderer({ alpha: true });
         renderer.setPixelRatio(window.devicePixelRatio);
         renderer.setSize(window.innerWidth, window.innerHeight);
         renderer.autoClear = false;
         canvas = renderer.domElement;
         document.body.appendChild(canvas);
         scene = new THREE.Scene();

         // Creating the ARView, which is the object that handles
         // the rendering of the camera stream behind the three.js
         // scene
         arView = new THREE.ARView(vrDisplay, renderer);

         // The ARPerspectiveCamera is very similar to THREE.PerspectiveCamera,
         // except when using an AR-capable browser, the camera uses
         // the projection matrix provided from the device, so that the
         // perspective camera's depth planes and field of view matches
         // the physical camera on the device.
         camera = new THREE.ARPerspectiveCamera(
             vrDisplay,
             60,
             window.innerWidth / window.innerHeight,
             vrDisplay.depthNear,
             vrDisplay.depthFar
         );

         // VRControls is a utility from three.js that applies the device's
         // orientation/position to the perspective camera, keeping our
         // real world and virtual world in sync.
         vrControls = new THREE.VRControls(camera);

         // Bind our event handlers
         window.addEventListener('resize', onWindowResize, false);

         // Kick off the render loop!
         update();

         addBoxes();
         loadModels();
     }

     /**
      * The render loop, called once per frame. Handles updating
      * our scene and rendering.
      */
     function update() {
         // Update our camera projection matrix in the event that
         // the near or far planes have updated
         camera.updateProjectionMatrix();

         // Update our perspective camera's positioning
         vrControls.update();

         // for(var i = 0,len = cubes.length; i < len; i++){
         //    cubes[i].position.set(Math.cos(angle) * BOX_DISTANCE, camera.position.y - 0.25, Math.sin(angle) * BOX_DISTANCE);
         // }

         //models_obj && models_obj.position.set(Math.cos(Math.PI / 4) * 10, camera.position.y - 0.25, -Math.sin(Math.PI / 4) * 10);

         // Render the device's camera stream on screen
         arView.render();

         // Render our three.js virtual scene
         renderer.clearDepth();
         renderer.render(scene, camera);

         // Kick off the requestAnimationFrame to call this function
         // on the next frame
         requestAnimationFrame(update);
     }

     /**
      * On window resize, update the perspective camera's aspect ratio,
      * and call `updateProjectionMatrix` so that we can get the latest
      * projection matrix provided from the device
      */
     function onWindowResize() {
         camera.aspect = window.innerWidth / window.innerHeight;
         camera.updateProjectionMatrix();
         renderer.setSize(window.innerWidth, window.innerHeight);
     }

     /**
      * Once we have position information applied to our camera,
      * create some boxes at the same height as the camera
      */
     var cubes = [];

     function addBoxes() {
         // Create some cubes around the origin point
         for (var i = 0; i < BOX_QUANTITY; i++) {
             var angle = Math.PI * 2 * (i / BOX_QUANTITY);
             var geometry = new THREE.BoxGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE);
             var material = new THREE.MeshNormalMaterial();
             var cube = new THREE.Mesh(geometry, material);
             cube.position.set(Math.cos(angle) * BOX_DISTANCE, camera.position.y - 0.25, Math.sin(angle) * BOX_DISTANCE);

             cubes.push(cube);
             scene.add(cube);
         }

         // Flip this switch so that we only perform this once
         boxesAdded = true;
     }

     var models_obj;

     function loadModels() {
         var mtlLoader = new THREE.MTLLoader();
         mtlLoader.setPath('models/chris/');
         mtlLoader.load('chris.mtl', function(materials) {
             materials.preload();


             var objLoader = new THREE.OBJLoader();
             objLoader.setMaterials(materials);
             objLoader.load('models/chris/chris.obj', function(obj) {

                 // object.traverse(function(child) {
                 //     if (child instanceof THREE.Mesh) {
                 //         // child.material.map = texture;
                 //     }
                 // });

                 models_obj = obj;
                 models_obj.scale.set(0.1, 0.1, 0.1);
                 models_obj.position.set(Math.cos(0.2) * BOX_DISTANCE, camera.position.y - 0.25, Math.sin(0.2) * BOX_DISTANCE);
                 scene.add(models_obj);

             }, function() {

             }, function() {});
         })
     }



     alert(Math.random());

 }