import html from "../../services/dom-constructor.js";
import createIcon from "../components/icon.js";

function createLabel(name) {
  return new html()
    .cls("flex align-center gap-02 Hlabel")
    .chld([createIcon("nearby"), name])
    .build();
}

function createControls() {
  return new html()
    .cls("flex align-center gap-02 Hcontrols")
    .chld([createIcon("near_me", "lock"), createIcon("visibility", "hide")])
    .build();
}

export function createItem(obj, index) {
  return new html("li")
    .id(obj.id)
    .attr({ "data-index": index })
    .chld([createLabel(obj.name), createControls(obj)])
    .build();
}
