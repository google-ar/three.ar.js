# WebVR API extension for smartphone AR

## Overview

Basic smartphone based Augmented Reality (AR) web applications can be enabled with minimal extensions to the [WebVR 1.1 API].

**DISCLAIMER:** By no means is this a web standards proposal for AR on the web. It is only a simple way to provide some basic AR capabilities to experiment with prototype browsers that implement this extension.

This extension mainly focuses on smartphone based AR where there are 3 basic elements that enable AR experiences:

* **Motion tracking**: The device needs to know its exact location and orientation in 3D space. This is called 6 Degrees Of Freedom ([6DOF]) motion tracking.
* **Rendering the pass through camera**: Smartphones allow to render virtual content on top of the reality represented by the feed provided by the camera they have.
* **Basic understanding of the real world**: Motion tracking provides the exact location of the device in the real world but apart from that, the device does not understand much more from it. In order to be able to interact with the real world correctly, some basic understanding is very valuable. Current Smartphone AR technology provides different ways to identify planes in the real world (or even more complex information like meshes or objects like markers or even complete point clouds). This way, virtual objects can be anchored in the real world so they appear to interact with it as a human would expect them to.

## Features

The AR extension to the WebVR API provides basic functionality to expose these features.

### Motion Tracking

Motion tracking is resolved by the WebVR API itself so no extension is needed, just a correct implementation in the browser side to communicate with the underlying AR technology and expose the [6DOF] tracking needed. Please, refer to the [WebVR 1.1 API] documentation or to the 'Using the WebAR API' section below for more information on how to obtain the pose.

### Rendering the pass through camera

If a developer chooses to use a [VRDisplay] instance in their web app that has support for the pass through camera, the user agent will internally render the camera feed and composite it per frame. It is important, though, to know if this compositing is happening and that is why the WebVR extension for AR provides a new flag in the [VRDisplayCapabilities] structure.

```
partial interface VRDisplayCapabilities {
  readonly attribute boolean hasPassThroughCamera;
};
```

A new property has been added to [VRDisplayCapabilities] that indicate the existence of a AR-capable [VRDisplay]. If `hasPassThroughCamera` is true, the device's camera will render underneath the composited display and the web app can accordingly adapt, like not clearing the color buffer per frame, for example, as the camera feed would be cleared, or asking the WebGL context to use alpha transparency.

### Basic understanding of the real world

There are multiple ways to get some information in an AR system about the real world surrounding the device. For now, the WebVR extension for AR exposes one of the simplest possible: throw a ray from the device perspective into the real world and let the app know if there has been a hit against any of the elements the system understands from the real world.

```
partial interface VRDisplay {
  sequence<VRHit> hitTest(float x, float y);
};
```

`VRDisplay.prototype.hitTest` returns an array of 0 or more VRHit instances that represent locations in the real world. This functionality casts the ray from a 2D position and obtains a list of all the hit points in the real world. The `x` and `y` values must be normalized between 0 and 1, with (0, 0) being the upper-left corner of the screen. Also note that if the `x`, `y` values are not normalized, the method will throw an error.

The `VRHit` structure and has a single property, `modelMatrix`.

```
struct VRHit {
  readonly attribute Float32Array modelMatrix;
};
```

The `modelMatrix` property is a 4x4 transformation matrix represented as a Float32Array of size 16, encoding the position and orientation of some object in the real world.

## Using the WebVR extension API for AR

As the extension API is built on top of WebVR, please refer to the [WebVR 1.1 API] for more details and basic knowledge that will be necessary to understand this section. Some of the examples will also use some [three.js] based code for clarity purposes but the same concept could be applied in any other engine or basic webgl based web app.

### Detecting an AR-capable VRDisplay

The WebVR API provides a mechanism to list all the available devices. Here is a code example [LINK] to learn how to detect an AR-capable display specifically.

### Obtaining the camera pose and projection information

The WebVR API provides a mechanism to obtain both the position/orientation of the camera and the correct projection matrix needed to render the virtual elements. Check out this code [LINK] example to learn how this information is retrieved and used.

### Placing a virtual object in the real world
The AR extension on top of WebVR allows to cast a ray from the camera to the real world and obtain a list of hits (if any). This code example [LINK] shows how to make that call and process the resulting information.

[WebVR 1.1 API]: https://w3c.github.io/webvr/spec/1.1/
[WebVR 2.0 API]: https://github.com/w3c/webvr/blob/master/explainer.md
[6DOF]: https://en.wikipedia.org/wiki/Six_degrees_of_freedom
[VRFrameData]: https://w3c.github.io/webvr/spec/1.1/#interface-vrframedata
[VRDisplayCapabilities]: https://w3c.github.io/webvr/spec/1.1/#interface-vrdisplaycapabilities
[VRDisplay]: https://w3c.github.io/webvr/spec/1.1/#interface-vrdisplay
[three.js]: https://threejs.org/


