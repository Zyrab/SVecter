import ViewPort from "./editor/ui/ViewPort.js";
import GameObject from "./editor/objects/GameObjects.js";
import Header from "./common/Header.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  app.appendChild(Header());

  const viewPort = new ViewPort(app);

  // Add sample objects for testing
  viewPort.renderer.scene.addObject(
    new GameObject(100, 100, 80, 80, "red", "test-red")
  );
  viewPort.renderer.scene.addObject(
    new GameObject(300, 200, 100, 50, "green", "test-green")
  );
  viewPort.renderer.scene.addObject(
    new GameObject(500, 400, 120, 120, "blue", "test-blue")
  );
  viewPort.renderer.scene.addObject(
    new GameObject(500, 800, 200, 50, "purple", "test-purple")
  );
});
