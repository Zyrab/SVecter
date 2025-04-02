// systems/Selection.js

class Selection {
  constructor(scene) {
    this.scene = scene;
    this.selectedObject = null;
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
  }

  selectObject(obj) {
    if (this.selectedObject) {
      this.selectedObject.selected = false;
    }
    this.selectedObject = obj;
    if (this.selectedObject) {
      this.selectedObject.selected = true;
    }
  }

  handleClick(x, y) {
    const obj = this.scene.getObjectAt(x, y);
    this.selectObject(obj);
  }
}

export default Selection;
