import html from "../../services/dom-constructor.js";
import createIconText from "../components/icon-text.js";
import createButton from "../components/button.js";
import EditorState from "../../state/editor-state.js";
import { createItem } from "./dom-factories.js";
import {
  handleClick,
  updateIcons,
  updateLabel,
  updateListHighlight,
} from "./hendlers.js";

export default function createHierarchy() {
  function updateList(objects) {
    list.clear().chld([objects.map((obj, i) => createItem(obj, i))]);
  }

  const list = new html("ul");

  const hierarchy = new html("div")
    .cls("hierarchy-panel")
    .chld([
      createIconText("Hierarchy", "view_object_track"),
      list.build(),
      createButton("Add new", "add"),
    ])
    .on({ click: handleClick })
    .build();

  EditorState.events.on("sceneChanged", updateList);
  EditorState.events.on("selectionChanged", updateListHighlight);
  EditorState.events.on("visibilityChanged", updateIcons);
  EditorState.events.on("lockChanged", updateIcons);
  EditorState.events.on("nameChanged", updateLabel);

  return hierarchy;
}
