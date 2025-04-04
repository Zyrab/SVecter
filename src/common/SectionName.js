import html from "../services/DOMConstructor.js";

export default function SectionName(name, icon) {
  const span = new html("span")
    .cls("material-symbols-outlined")
    .css({ fontSize: "1rem" })
    .txt(icon)
    .build();
  const sectionName = new html("div")
    .cls("section-name")
    .chld([span, new html("h2").txt(name).build()])
    .build();
  return sectionName;
}
