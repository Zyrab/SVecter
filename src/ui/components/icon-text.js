import html from "../../services/dom-constructor.js";
import createIcon from "./icon.js";
export default function iconText(text, iconName, type = "tab", active = false) {
  const types = {
    tab: `${active ? "bg-primary" : "bg-pre-primary"} gap-02 p-02`,
    sec: "bg-primary gap-05 ph-1",
  };
  const iconText = new html("div")
    .cls(`flex align-center just-start hover-bg-hover pointer ${types[type]}`)
    .chld([createIcon(iconName), new html("h2").txt(text).build()])
    .build();
  return iconText;
}
