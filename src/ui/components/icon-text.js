import html from "../../services/dom-constructor.js";
import createIcon from "./icon.js";
export default function iconText(text, iconName) {
  const iconText = new html("div")
    .cls("flex align-center just-start gap-02 p-02 bg-pre-primary")
    .chld([createIcon(iconName), new html("h2").txt(text).build()])
    .build();
  return iconText;
}
