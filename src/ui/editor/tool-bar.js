import html from "../../services/DOMConstructor.js";
import creteIconButton from "../components/icon-button.js";

export default function craeteToolbar() {
  function handleToolbarClick(e) {
    const target = e.target.closest(".tool-btn");
    if (!target) return;
    const active = document.querySelector(".tool-btn.active");
    if (active) active.classList.remove("active");
    target.classList.add("active");
  }

  const items = tools.map((tool) => {
    return new html("div")
      .cls("flex row just-center align-center gap-02")
      .chld(
        tool.map((item) => {
          return creteIconButton(item.name, item.icon);
        })
      )
      .build();
  });

  const toolBar = new html("div")
    .cls("flex just-between align-center p-02 bg-pre-primary")
    .chld(items)
    .on({ click: handleToolbarClick })
    .build();
  return toolBar;
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
