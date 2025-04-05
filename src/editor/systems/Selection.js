// systems/Selection.js

class Selection {
  constructor(scene) {
    this.scene = scene;
    this.selectedObject = null;
  }

  selectObject(obj) {
    if (this.selectedObject) {
      this.selectedObject.deselect();
    }
    this.selectedObject = obj;
    if (this.selectedObject) {
      this.selectedObject.select();
    }
  }
  handleClick(x, y) {
    const obj = this.scene.getObjectAt(x, y);
    this.selectObject(obj);
  }
}

export default Selection;
