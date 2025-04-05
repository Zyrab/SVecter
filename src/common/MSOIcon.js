import html from "../services/DOMConstructor.js";

export default function MSOIcon(icon, fontSize = "1rem", id = "") {
  const spam = new html("span")
    .cls("material-symbols-outlined")
    .css({ fontSize })
    .id(id)
    .txt(icon)
    .build();
  return spam;
}
