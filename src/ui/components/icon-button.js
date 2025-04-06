import html from "../../services/DOMConstructor.js";
import createIcon from "./icon.js";
export default function creteIconButton(toolTipText, iconName, onClick) {
  const tooltip = new html("span").cls("tooltip").txt(toolTipText).build();
  const button = new html("button")
    .cls("tool-btn")
    .chld([createIcon(iconName), tooltip])
    .on({ click: onClick })
    .build();
  return button;
}
