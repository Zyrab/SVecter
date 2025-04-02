import Camera from "./Camera.js";
import SceneManager from "./SceneManager.js";
import Grid from "../systems/Grid.js";

class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.camera = new Camera();
    this.scene = new SceneManager();
    this.grid = new Grid();
    this.resize();

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
    this.grid.draw(this.ctx, this.camera, this.canvas);
    this.camera.applyTransform(this.ctx);
    this.scene.draw(this.ctx);
    this.ctx.restore();
  }
}

export default Renderer;
