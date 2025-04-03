import Selection from "../systems/Selection.js";
import DragAndDrop from "../systems/DragAndDrop.js";

class InputHandler {
  constructor(canvas, camera, scene) {
    this.canvas = canvas;
    this.camera = camera;
    this.selection = new Selection(scene);
    this.dragAndDrop = new DragAndDrop(scene, this.selection);
    this.initEventListeners();
  }

  initEventListeners() {
    this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
    this.canvas.addEventListener("mousemove", (e) => this.onMouseMove(e));
    this.canvas.addEventListener("mouseup", () => this.onMouseUp());
    this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
    this.canvas.addEventListener("wheel", (e) => this.onWheel(e));
    this.canvas.addEventListener("click", (e) => this.onClick(e));
  }

  getMousePosition(e) {
    const rect = this.canvas.getBoundingClientRect();
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    const x = (sx - this.camera.x) / this.camera.zoom;
    const y = (sy - this.camera.y) / this.camera.zoom;
    return { x, y, sx, sy };
  }

  onMouseDown(e) {
    const { x, y } = this.getMousePosition(e);
    this.selection.handleClick(x, y);

    if (this.selection.selectedObject) {
      this.dragAndDrop.startDrag(x, y);
    } else {
      this.camera.startDrag(e.clientX, e.clientY);
    }
  }

  onMouseMove(e) {
    const { x, y } = this.getMousePosition(e);

    if (this.dragAndDrop.isDragging) {
      this.dragAndDrop.drag(x, y);
    } else if (this.camera.isDragging) {
      this.camera.drag(e.clientX, e.clientY);
    }
  }

  onMouseUp() {
    this.dragAndDrop.stopDrag();
    this.camera.stopDrag();
  }

  onWheel(e) {
    const { x, y, sx, sy } = this.getMousePosition(e);

    this.camera.zoomAt(x, y, sx, sy, e.deltaY);
    e.preventDefault();
  }

  onClick(e) {
    const { x, y } = this.getMousePosition(e);
    this.selection.handleClick(x, y);
  }
}

export default InputHandler;
