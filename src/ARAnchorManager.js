import { Object3D, Vector3, Matrix4, EventDispatcher } from 'three';

/**
 * A class to manage registration and unregistration of anchors
 * for any THREE.Object3D. Anchors are world space and handle updating
 * the position of the object to which one is assigned.
 * AnchorManager emits events pertaining to anchors.
 */
export default class ARAnchorManager extends EventDispatcher {
  /**
   * @param {VRDisplay} vrDisplay
   */
  constructor(vrDisplay) {
    super();
    if (!(vrDisplay instanceof window.VRDisplay)) {
      throw new Error('A correct VRDisplay instance is required to ' +
          'initialize an ARAnchorManager.');
    }
    if (typeof(vrDisplay.getAnchors) !== 'function') {
      throw new Error('VRDisplay does not support anchors. Upgrade ' +
          'to latest AR browser to get anchor support.');
    }
    this.vrDisplay_ = vrDisplay;
    this.anchorsToObject3Ds_ = new Map();
    this.object3DsToAnchors_ = new Map();
    this.vrDisplay_.addEventListener('anchorsupdated',
        event => this.onAnchorsUpdated_(event));
    // This attribute is used to get the scale value from the anchor model
    // matrix but not use it. It is just to avoid garbage collection.
    this.scale_ = new Vector3();
    // This attribute is used to calculate the matrix to be passed to the
    // anchor creation code only using the position and quaternion from the
    // object3d.
    this.matrix_ = new Matrix4();
  }

  /**
   * Assign a new anchor to an THREE.Object3D.
   * @param {THREE.Object3D} object3d A Three Object3D instance to create and
   * manage an anchor for. The current transformation (position/orientation) of
   * the Object3D will be used to create the anchor and this class will keep
   * it up to date with any tracking changes detected by the system.
   * IMPORTANT: The passed Object3D instance should be in world space!
   * @throws Error if:
   * - The given object3d is not an instance of Object3D.
   * @return {ARAnchorManager}
   */
  add(object3d) {
    if (!(object3d instanceof Object3D)) {
      throw new Error('Invalid Object3D trying to add an anchor');
    }
    // Do not allow to create an anchor for an object3d that already has one.
    if (this.object3DsToAnchors_.has(object3d)) {
      return this;
    }
    // If the object has a parent and its parent has a parent, it is very
    // likely that it may not be in world space so warn the developer.
    // NOTE: Commented out for now because if we use anchors for planes in
    // ARPlanes, they are added to a identity main parent object but does not
    // mean they are not in world space. Getting this warning at all times is
    // not optimal.
//    if (object3d.parent && object3d.parent.parent) {
//      console.warn("anchors should be added for Object3D-s in world space");
//    }
    // Calculate the model matrix of the object3d using the position and
    // quaternion of the object.
    this.scale_.set(1, 1, 1);
    this.matrix_.compose(object3d.position, object3d.quaternion, this.scale_);
    const anchor = this.vrDisplay_.addAnchor(this.matrix_.elements);
    // Store the anchor and the object3d in the structure to retrieve them
    // later on.
    this.anchorsToObject3Ds_.set(anchor, object3d);
    this.object3DsToAnchors_.set(object3d, anchor);
    return this;
  }

  /**
   * Delete anchor associated to the THREE.Object3D.
   * @param {THREE.Object3D} object3d The ThreeJS Object3D that has an anchor
   * associated to it and that should be removed.
   * @return {boolean} A flag indicating if the removal of the anchor was
   * successful (true) or not (false, in case there is no anchor for the given
   * Object3D).
   */
  remove(object3d) {
    if (!(object3d instanceof Object3D)) {
      throw new Error('Invalid Object3D trying to remove anchor');
    }
    const anchor = this.object3DsToAnchors_.get(object3d);
    if (!anchor) {
      return false;
    }
    this.anchorsToObject3Ds_.delete(anchor);
    this.object3DsToAnchors_.delete(object3d);
    this.vrDisplay_.removeAnchor(anchor);
    return true;
  }

  /**
   * Called when any anchors are updated. The updated modelMatrix is
   * set for the THREE.Object3D associated with each updated anchor.
   * An 'object3dsupdated' event is emitted with the updated THREE.Object3Ds.
   * @param {VRAnchorEvent} event The anchor event that contains the list of
   * modified anchors.
   */
  onAnchorsUpdated_(event) {
    const updatedObject3Ds = [];
    for (let anchor of event.anchors) {
      const object3d = this.anchorsToObject3Ds_.get(anchor);
      if (!object3d) {
        // It could happen that there are more than one AnchorManager and
        // that create Anchors that reside in the native side and are not
        // handled by all of the AnchorManagers, so let's just continue to
        // see if the updated anchors are managed by this AnchorManager.
        continue;
      }
      // get the anchor's updated model matrix
      object3d.matrix.fromArray(anchor.modelMatrix);
      // decompose the updated matrix into position, orientation, and scale
      object3d.matrix.decompose(object3d.position,
                                object3d.quaternion,
                                this.scale_);
      updatedObject3Ds.push(object3d);
    }
    this.dispatchEvent({ type: 'anchorsupdated', anchors: updatedObject3Ds });
  }
}
