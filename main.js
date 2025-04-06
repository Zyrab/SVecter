import ViewPort from "./src/ui/editor/ViewPort.js";
import GameObject from "./src/core/GameObjects.js";
import createHeader from "./src/ui/layout/header.js";
import EditorState from "./src/state/editor.js"; // Import EditorState for scene access

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  app.appendChild(createHeader());

  const viewPort = new ViewPort(app);

  // Add sample objects for testing (through EditorState's scene)
  EditorState.scene.addObject(
    new GameObject(100, 100, 80, 80, "red", "Test red")
  );
  EditorState.scene.addObject(
    new GameObject(300, 200, 100, 50, "green", "Artilery green")
  );
  EditorState.scene.addObject(
    new GameObject(500, 400, 120, 120, "blue", "Water blue")
  );
  EditorState.scene.addObject(
    new GameObject(500, 800, 200, 50, "purple", "Artifactory purple")
  );
});
