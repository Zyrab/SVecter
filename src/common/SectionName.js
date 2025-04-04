import html from "../services/DOMConstructor.js";
import MSOIcon from "./MSOIcon.js";
export default function SectionName(name, icon) {
  const sectionName = new html("div")
    .cls("flex align-center just-start gap-02 p-02 bg-pre-primary")
    .chld([MSOIcon(icon), new html("h2").txt(name).build()])
    .build();
  return sectionName;
}
