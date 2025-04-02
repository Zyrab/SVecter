// Toolbar.js
import ToolBtn from "../../common/ToolBtn.js";
import html from "../../services/DOMConstructor.js";
export default function Controls() {
  const controls = [
    { name: "Play", icon: "play_arrow" },
    { name: "Pause", icon: "pause" },
    { name: "Next Step", icon: "skip_next" },
  ];

  const buttons = controls.map((control) => {
    return ToolBtn(control.name, control.icon);
  });

  const container = new html("div").cls("toolbar").chld(buttons).build();
  return container;
}
