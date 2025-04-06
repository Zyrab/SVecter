import html from "../../services/DOMConstructor.js";
export default function createIcon(iconName, fontSize = "1rem", id = "") {
  const icon = new html("span")
    .cls("material-symbols-outlined")
    .css({ fontSize })
    .id(id)
    .txt(iconName)
    .build();
  return icon;
}
