import html from "../../services/dom-constructor.js";

export default function createButton(text, action) {
  return new html("button")
    .txt(text)
    .cls("p-05 color-primary bg-accent hover-bg-hover pointer")
    .attr({ "data-action": action })
    .build();
}
