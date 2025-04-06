import EditorState from "../state/editor.js";

class Selection {
  constructor(scene) {
    this.scene = scene;
    this.selectedObject = null;
  }

  selectObject(obj) {
    if (this.selectedObject === obj) return;

    // Use EditorState's central selection handler
    if (obj) {
      EditorState.selectObject(obj);
      this.selectedObject = obj;
    }
  }

  handleClick(x, y) {
    const obj = this.scene.getObjectAt(x, y);
    this.selectObject(obj);
  }
}

export default Selection;
