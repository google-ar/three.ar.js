// import { EventEmitter } from 'events';
import { Object3D, Vector3, Matrix4 } from 'three';
/**
 * A class to manage registration and unregistration of anchors
 * for any THREE.Object3D. Anchors are world space and handle updating
 * the position of the object to which one is assigned.
 * AnchorManager emits events pertaining to anchors.
 */
export default class ARAnchorManager /* extends EventEmitter */ {
  constructor(vrDisplay) {
    // super();
    if (!(vrDisplay instanceof VRDisplay) || !vrDisplay.getAnchors) {
      throw new Error("invalid vr display parameter");
    }
    this.vrDisplay_ = vrDisplay;
    this.anchorsToObject3Ds_ = new Map();
    this.object3DsToAnchors_ = new Map();
    this.vrDisplay_.addEventListener('anchorsupdated', 
        event => this.onAnchorsUpdated_(event));
    // This attribute is used to get the scale value from the anchor model
    // matrix but not use it. It is just to avoid garbage collection.
    this.scale_  = new Vector3();
    // This attribute is used to calculate the matrix to be passed to the
    // anchor creation code only using the position and quaternion from the
    // object3d.
    this.matrix_ = new Matrix4();
    return this;
  }
  /**
   * Assign a new anchor to an THREE.Object3D.
   */
  addAnchorForObject3D(object3d) {
    if (!(object3d instanceof Object3D)) {
      throw new Error('invalid object3d trying to add an anchor');
    };
    // Do not allow to create an anchor for an object3d that already has one.
    if (this.object3DsToAnchors_.get(object3d)) {
      return;
    }
    // Calculate the model matrix of the object3d using the position and
    // quaternion of the object.
    this.scale_.set(1, 1, 1);
    this.matrix_.compose(object3d.position, object3d.quaternion, this.scale_);
    // use the world matrix incase the object is a child of a parent.
    // "matrix" is relative to parent, "worldMatrix" is world space.
    const anchor = this.vrDisplay_.addAnchor(this.matrix_.elements);
    // Store the anchor and the object3d in the structure to retrieve them
    // later on.
    this.anchorsToObject3Ds_.set(anchor, object3d);
    this.object3DsToAnchors_.set(object3d, anchor);
    return this;
  }
  /**
   * Delete anchor from the THREE.Object3D.
   */
  removeAnchorForObject3D(object3d) {
    if (!(object3d instanceof Object3D)) {
      throw new Error('invalid object3d trying to remove anchor');
    };
    const anchor = this.object3DsToAnchors_.get(object3d);
    if (!anchor) { 
      return false 
    };
    this.anchorsToObject3Ds_.delete(anchor);
    this.object3DsToAnchors_.delete(object3d);
    this.vrDisplay_.removeAnchor(anchor);
    return true;
  }
  /**
   * Called when any anchors are updated. The updated modelMatrix is
   * set for the THREE.Object3D associated with each updated anchor.
   * An 'object3dsupdated' event is emitted with the updated THREE.Object3Ds.
   */
  onAnchorsUpdated_(event) {
    const updatedObject3Ds = [];
    for (var i = 0; i < event.anchors.length; i++) {
      var anchor = event.anchors[i];
      const object3d = this.anchorsToObject3Ds_.get(anchor);
      if (!object3d) { 
        throw new Error("this should never happen: " +
          "an anchor without the corresponding object3d."); 
      };
      // get the anchor's updated model matrix
      object3d.matrix.fromArray(anchor.modelMatrix);
      // decompose the updated matrix into position, orientation, and scale
      object3d.matrix.decompose(object3d.position,
                                object3d.quaternion,
                                this.scale_);
      updatedObject3Ds.push(object3d);
    }
    // this.emit('object3dsupdated', updatedObject3Ds);
  }
}