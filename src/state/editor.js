// core/state/EditorState.js
import Selection from "../systems/Selection.js";
import SceneManager from "../core/SceneManager.js";
import Camera from "../core/Camera.js";
import EventEmitter from "../core/events.js";

class EditorState {
  constructor() {
    this.scene = new SceneManager();
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
    if (this.selection.selectedObject) {
      this.selection.selectedObject.selected = false;
    }
    obj.selected = true;
    this.selection.selectedObject = obj;
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
