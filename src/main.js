import Viewport from "./editor/ui/ViewPort.js";
import GameObject from "./editor/objects/GameObjects.js";

document.addEventListener("DOMContentLoaded", () => {
  const viewportContainer = document.getElementById("editor-container");
  const viewport = new Viewport(viewportContainer);

  // Add sample objects
  viewport.renderer.scene.addObject(new GameObject(100, 100, 80, 80, "red"));
  viewport.renderer.scene.addObject(new GameObject(300, 200, 100, 50, "green"));
  viewport.renderer.scene.addObject(new GameObject(500, 400, 120, 120, "blue"));
});
