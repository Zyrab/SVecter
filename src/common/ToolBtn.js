import html from "../services/DOMConstructor.js";
import MSOIcon from "./MSOIcon.js";
export default function ToolBtn(tool, icon, onClick) {
  const tooltip = new html("span").cls("tooltip").txt(tool).build();
  const button = new html("button")
    .cls("tool-btn")
    .chld([MSOIcon(icon), tooltip])
    .on({ click: onClick })
    .build();
  return button;
}
