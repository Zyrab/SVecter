import html from "../../services/dom-constructor.js";
import createToolbar from "./tool-bar.js";
import createHierarchy from "../hierarchy/index.js";
import createProperties from "../properties/index.js";
import Render from "../../core/render.js";
import GameObject from "../../core/GameObjects.js";
export default function createViewPort(app) {
  const container = new html().cls("viewport");
  const left = new html().cls("left-container");
  const center = new html().cls("center-container");
  const right = new html().cls("right-container");

  const canvas = new html("canvas").build();
  const div = new html("div").css({ height: "100%" }).chld([canvas]).build();
  left.chld([createHierarchy()]);
  center.chld([createToolbar(), div]);
  right.chld([createProperties()]);

  container.chld([left.build(), center.build(), right.build()]);

  app.appendChild(container.build());
  const render = new Render(canvas);
  render.initRender();

  // test objects
  render.state.scene.addObject(
    new GameObject(100, 100, 80, 80, "red", "Test red")
  );
  render.state.scene.addObject(
    new GameObject(300, 200, 100, 50, "green", "Artilery green")
  );
  render.state.scene.addObject(
    new GameObject(500, 400, 120, 120, "blue", "Water blue")
  );
  render.state.scene.addObject(
    new GameObject(500, 800, 200, 50, "purple", "Artifactory purple")
  );
  render.loop();
}
