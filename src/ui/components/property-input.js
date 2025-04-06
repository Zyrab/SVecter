import html from "../../services/DOMConstructor.js";

export default function createPropertyInput(property) {
  const input = new html("input").cls("property-input").attr(property).build();
  return input;
}
