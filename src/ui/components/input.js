import html from "../../services/dom-constructor.js";

export default function createInput(name, value, id) {
  const input = new html("input")
    .attr({ type: "text" })
    .val(value)
    .cls("input flex w-5")
    .id(id)
    .build();

  const label = new html("label")
    .txt(name)
    .cls("flex row gap-02")
    .chld([input])
    .build();

  return label;
}
