import html from "../services/DOMConstructor.js";

export default function MSOIcon(icon, fontSize = "1rem") {
  const spam = new html("span")
    .cls("material-symbols-outlined")
    .css({ fontSize })
    .txt(icon)
    .build();
  return spam;
}
