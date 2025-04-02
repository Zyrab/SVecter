import Renderer from "../core/Renderer.js";
import InputHandler from "../core/InputHandler.js";
import Sidebar from "./SideBar.js";
import PropertiesPanel from "./PropertiesPanel.js";
import HierarchyPanel from "./HierarchyPanel.js";

import Controls from "./Controls.js";
class Viewport {
  constructor(container) {
    this.container = container;

    //container to hold canvas and tools
    this.leftContainer = document.createElement("div");
    this.leftContainer.classList.add("left-container");

    this.centerContainer = document.createElement("div");
    this.centerContainer.classList.add("center-container");

    this.rightContainer = document.createElement("div");
    this.rightContainer.classList.add("right-container");

    this.toolsContainer = document.createElement("div");
    this.toolsContainer.classList.add("tools-container");

    this.container.appendChild(this.leftContainer);
    this.container.appendChild(this.centerContainer);
    this.container.appendChild(this.rightContainer);
    this.centerContainer.appendChild(this.toolsContainer);

    this.canvas = document.createElement("canvas");
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";

    this.hierarchyPanel = new HierarchyPanel();
    this.hierarchyPanel.appendTo(this.leftContainer);

    this.sidebar = new Sidebar();
    this.controls = Controls();
    this.propertiesPanel = new PropertiesPanel();

    this.sidebar.appendTo(this.toolsContainer);
    this.toolsContainer.appendChild(this.controls);
    this.centerContainer.appendChild(this.canvas);
    this.propertiesPanel.appendTo(this.rightContainer);

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

export default Viewport;
