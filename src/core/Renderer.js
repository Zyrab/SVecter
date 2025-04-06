import Grid from "../systems/Grid.js";
import EditorState from "../state/editor.js";

class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.grid = new Grid();
    this.resize();
    // Subscribe to changes from EditorState
    EditorState.events.on("selectionChanged", (selectedObject) => {
      this.selection = selectedObject;
    });
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;
    this.render();
  }

  clear() {
    this.ctx.resetTransform();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render() {
    this.clear();
    this.ctx.save();
    this.grid.draw(this.ctx, EditorState.camera, this.canvas);
    EditorState.camera.applyTransform(this.ctx);
    EditorState.scene.draw(this.ctx);
    this.ctx.restore();
  }
}

export default Renderer;
