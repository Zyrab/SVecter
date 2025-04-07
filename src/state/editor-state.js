// core/state/EditorState.js
import Selection from "../systems/selection.js";
import Scene from "../core/scene.js";
import Camera from "../core/camera.js";
import EventEmitter from "../core/events.js";

class EditorState {
  constructor() {
    this.scene = new Scene();
    this.camera = new Camera();
    this.events = new EventEmitter();
    this.selection = new Selection(this.scene);

    // Hook selection to event system
    this.selection.onChange = (selected) => {
      this.events.emit("selectionChanged", selected);
    };

    // Emit when scene updates
    this.scene.on("objectListUpdated", (newObjects) => {
      this.events.emit("sceneChanged", newObjects);
    });
  }
  selectObject(obj) {
    this.events.emit("selectionChanged", obj);
  }

  toggleVisibility(obj) {
    obj.visible = !obj.visible;
    this.events.emit("visibilityChanged", obj);
  }

  toggleLock(obj) {
    obj.locked = !obj.locked;
    this.events.emit("lockChanged", obj);
  }

  renameObject(obj, newName) {
    obj.name = newName;
    this.events.emit("nameChanged", obj);
  }
}

export default new EditorState();
