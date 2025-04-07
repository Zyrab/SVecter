import createViewPort from "./src/ui/editor/view-port.js";
import createHeader from "./src/ui/layout/header.js";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  app.appendChild(createHeader());

  createViewPort(app);
});
