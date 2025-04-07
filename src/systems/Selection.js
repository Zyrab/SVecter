import EditorState from "../state/editor-state.js";

class Selection {
  constructor(scene) {
    this.scene = scene;
    this.selectedObject = null;
  }

  selectObject(obj) {
    if (this.selectedObject === obj) return;

    // Clear previous selection
    if (this.selectedObject) {
      this.selectedObject.selected = false;
    }

    if (obj) {
      obj.selected = true;
    }

    this.selectedObject = obj;
    EditorState.selectObject(obj); // This already emits event
  }

  handleClick(x, y) {
    const obj = this.scene.getObjectAt(x, y);
    this.selectObject(obj);
  }
}

export default Selection;
