// systems/DragAndDrop.js

class DragAndDrop {
  constructor(scene, selection) {
    this.scene = scene;
    this.selection = selection;
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
  }

  startDrag(x, y) {
    if (this.selection.selectedObject) {
      this.isDragging = true;
      this.lastMouseX = x;
      this.lastMouseY = y;
    }
  }

  drag(x, y) {
    if (this.isDragging && this.selection.selectedObject) {
      const dx = x - this.lastMouseX;
      const dy = y - this.lastMouseY;
      this.selection.selectedObject.move(dx, dy);
      this.lastMouseX = x;
      this.lastMouseY = y;
    }
  }

  stopDrag() {
    this.isDragging = false;
  }
}

export default DragAndDrop;
