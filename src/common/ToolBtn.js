import html from "../services/DOMConstructor.js";

export default function ToolBtn(tool, icon, onClick) {
  const spam = new html("span")
    .cls("material-symbols-outlined")
    .txt(icon)
    .build();
  const tooltip = new html("span").cls("tooltip").txt(tool).build();
  const button = new html("button")
    .cls("tool-btn")
    .chld([spam, tooltip])
    .on("click", onClick)
    .build();
  return button;
}
