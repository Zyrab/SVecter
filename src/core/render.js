import Grid from "../systems/Grid.js";
import Input from "./input.js";
import EditorState from "../state/editor-state.js";

class Render {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.grid = new Grid();
    this.state = EditorState;
    this.needsResize = true;

    window.addEventListener("resize", () => {
      this.needsResize = true;
    });
  }
  initRender() {
    this.render();
    this.input = new Input(
      this.canvas,
      this.state.camera,
      this.state.scene,
      this.state.selection
    );
  }
  resize() {
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;
    this.needsResize = false;
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
  loop() {
    requestAnimationFrame(() => this.loop());

    if (this.needsResize) {
      this.resize();
    }

    this.render();
  }
}

export default Render;
