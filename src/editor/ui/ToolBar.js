import html from "../../services/DOMConstructor.js";
import ToolBtn from "../../common/ToolBtn.js";

export default function ToolBar() {
  function handleToolbarClick(e) {
    const target = e.target.closest(".tool-btn");
    if (!target) return;
    const active = document.querySelector(".tool-btn.active");
    if (active) active.classList.remove("active");
    target.classList.add("active");
  }

  const items = tools.map((tool) => {
    return new html("div")
      .cls("toolbar-item")
      .chld(
        tool.map((item) => {
          return ToolBtn(item.name, item.icon);
        })
      )
      .build();
  });

  const container = new html("div")
    .cls("toolbar")
    .chld(items)
    .on({ click: handleToolbarClick })
    .build();
  return container;
}
const tools = [
  [
    { name: "Move tool", icon: "drag_pan" },
    { name: "Hand tool", icon: "pan_tool" },
    { name: "Rotate tool", icon: "cached" },
    { name: "Transform tool", icon: "360" },
    { name: "Scale tool", icon: "aspect_ratio" },
  ],
  [
    { name: "Play", icon: "play_arrow" },
    { name: "Pause", icon: "pause" },
    { name: "Next Step", icon: "skip_next" },
  ],
  [
    { name: "Undo", icon: "undo" },
    { name: "Redo", icon: "redo" },
  ],
];
