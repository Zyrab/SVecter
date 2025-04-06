// core/SelectionManager.js

// import Emitter from "./Emitter.js"; // Assuming a simple event emitter class/mixin
class Emitter {
  constructor() {
    this._listeners = {};
  }
  on(event, callback) {
    if (!this._listeners[event]) this._listeners[event] = [];
    this._listeners[event].push(callback);
  }
  emit(event, data) {
    (this._listeners[event] || []).forEach((cb) => cb(data));
  }
  off(event, callback) {
    // Optional: remove listener
    this._listeners[event] = (this._listeners[event] || []).filter(
      (cb) => cb !== callback
    );
  }
}

class SelectionManager extends Emitter {
  constructor() {
    super(); // Initialize emitter if extending
    this.selectedObject = null;
    // If you need multi-select later, this would be an array or Set
    // this.selectedObjects = new Set();
  }

  /**
   * Selects a game object. Handles deselecting the previous object.
   * Pass null to deselect everything.
   * @param {GameObject | null} objectToSelect - The object to select, or null.
   */
  select(objectToSelect) {
    // Prevent unnecessary work if clicking the same object
    if (objectToSelect === this.selectedObject) {
      return;
    }

    // Deselect the currently selected object, if any
    if (this.selectedObject) {
      // Important: Check if the object still exists, e.g., wasn't deleted
      this.selectedObject.deselect(); // GameObject emits 'deselect'
    }

    // Update the internal reference
    this.selectedObject = objectToSelect;

    // Select the new object, if any
    if (this.selectedObject) {
      this.selectedObject.select(); // GameObject emits 'select'
    }

    // Notify listeners that the overall selection has changed
    this.emit("selectionChanged", this.selectedObject);
    console.log("Selection Changed:", this.selectedObject?.name || "none");
  }

  /**
   * Deselects the currently selected object.
   */
  deselect() {
    this.select(null); // Selecting null handles the deselection logic
  }

  /**
   * Gets the currently selected object.
   * @returns {GameObject | null}
   */
  getSelectedObject() {
    return this.selectedObject;
  }

  /**
   * Checks if a specific object is currently selected.
   * @param {GameObject} objectToCheck
   * @returns {boolean}
   */
  isSelected(objectToCheck) {
    return this.selectedObject === objectToCheck;
  }

  // --- Optional: Multi-selection methods ---
  // addToSelection(object) { ... }
  // removeFromSelection(object) { ... }
  // toggleSelection(object) { ... }
  // getSelectedObjects() { return Array.from(this.selectedObjects); }
  // clearSelection() { ... }
}

// Simple Emitter implementation (if not already available)

export default SelectionManager;
