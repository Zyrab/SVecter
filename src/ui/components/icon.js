import html from "../../services/dom-constructor.js";
export default function createIcon(iconName, action = "", fontSize = "1rem") {
  const icon = new html("span")
    .cls("material-symbols-outlined")
    .css({ fontSize })
    .attr({ "data-action": action })
    .txt(iconName)
    .build();
  return icon;
}
