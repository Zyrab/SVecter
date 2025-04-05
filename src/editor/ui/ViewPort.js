import html from "../../services/DOMConstructor.js";

import Renderer from "../core/Renderer.js";
import InputHandler from "../core/InputHandler.js";
import Selection from "../systems/Selection.js";

import ToolBar from "./ToolBar.js";
import HierarchyPanel from "./HierarchyPanel.js";

class ViewPort {
  constructor(app) {
    this.app = app;
    this.gameObjects = [];
    this.container = new html("div").cls("viewport");

    // Left panel (Hierarchy)
    this.hierarchyPanel = new html("div").cls("left-container");
    this.updateHierarchyPanel(); // Initialize hierarchy panel

    // Center panel (Canvas)
    this.center = new html("div").cls("center-container");
    this.canvas = new html("canvas").build();
    this.center.chld([ToolBar(), this.canvas]);

    // Right panel (Optional future UI elements)
    this.right = new html("div").cls("right-container");

    // Append UI elements
    this.container.chld([
      this.hierarchyPanel.build(),
      this.center.build(),
      this.right.build(),
    ]);
    this.app.appendChild(this.container.build());

    // Initialize Renderer & InputHandler
    this.renderer = new Renderer(this.canvas);

    this.selection = new Selection(this.renderer.scene);

    this.inputHandler = new InputHandler(
      this.canvas,
      this.renderer.camera,
      this.renderer.scene,
      this.selection
    );
    this.renderer.scene.on("objectListUpdated", (newObjects) => {
      this.gameObjects = newObjects;
      this.updateHierarchyPanel();
    });

    // Update loop
    this.loop();
  }

  updateHierarchyPanel() {
    // Clear and update hierarchy panel
    this.hierarchyPanel
      .clear()
      .chld([HierarchyPanel(this.gameObjects, this.selection)]);
  }

  loop() {
    requestAnimationFrame(() => this.loop());
    this.renderer.render();
  }
}

export default ViewPort;
