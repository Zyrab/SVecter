import html from "../../services/DOMConstructor.js";
import EditorState from "../../state/editor.js";
import Renderer from "../../core/Renderer.js";
import InputHandler from "../../core/InputHandler.js";
import createToolbar from "./tool-bar.js";
import createHierarchy from "./hierarchy.js";
import createProperties from "./properties.js";

class ViewPort {
  constructor(app) {
    this.app = app;
    this.gameObjects = [];
    this.container = new html("div").cls("viewport");

    // Left panel (Hierarchy)
    this.left = new html("div").cls("left-container");
    this.updateHierarchy(); // Initialize hierarchy panel

    // Center panel (Canvas)
    this.center = new html("div").cls("center-container");
    this.canvas = new html("canvas").build();
    this.center.chld([createToolbar(), this.canvas]);

    // Right panel (Optional future UI elements)
    this.right = new html("div")
      .chld([createProperties(EditorState)])
      .cls("right-container");

    // Append UI elements
    this.container.chld([
      this.left.build(),
      this.center.build(),
      this.right.build(),
    ]);
    this.app.appendChild(this.container.build());

    // Initialize Renderer & InputHandler
    this.renderer = new Renderer(this.canvas);

    this.inputHandler = new InputHandler(
      this.canvas,
      EditorState.camera,
      EditorState.scene,
      EditorState.selection
    );

    // Update on scene change
    EditorState.events.on("sceneChanged", (newObjects) => {
      this.gameObjects = newObjects;
      this.updateHierarchy();
    });

    // Update loop
    this.loop();
  }

  updateHierarchy() {
    // Clear and update hierarchy panel
    this.left.clear().chld([createHierarchy(this.gameObjects)]);
  }

  loop() {
    requestAnimationFrame(() => this.loop());
    this.renderer.render();
  }
}

export default ViewPort;
