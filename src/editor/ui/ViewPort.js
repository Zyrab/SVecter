import html from "../../services/DOMConstructor.js";

import Renderer from "../core/Renderer.js";
import InputHandler from "../core/InputHandler.js";
import ToolBar from "./ToolBar.js";
class ViewPort {
  constructor(app) {
    this.app = app;
    this.container = new html("div").cls("viewport");
    this.left = new html("div").cls("left-container");
    this.center = new html("div").cls("center-container");
    this.right = new html("div").cls("right-container");

    this.canvas = new html("canvas").build();
    this.center.chld([ToolBar(), this.canvas]);
    this.container.chld([
      this.left.build(),
      this.center.build(),
      this.right.build(),
    ]);
    this.app.appendChild(this.container.build());

    this.renderer = new Renderer(this.canvas);
    this.camera = this.renderer.camera;
    this.inputHandler = new InputHandler(
      this.canvas,
      this.camera,
      this.renderer.scene
    );
    this.loop();
  }

  loop() {
    requestAnimationFrame(() => this.loop());
    this.renderer.render();
  }
}

export default ViewPort;
