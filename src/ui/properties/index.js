import html from "../../services/dom-constructor.js";
import createIconText from "../components/icon-text.js";
import EditorState from "../../state/editor-state.js";
import {
  createObjectNameInput,
  createTransformSection,
} from "./dom-factories.js";

import { handleKeyInput } from "./handlers.js";
export default function createProperties() {
  const transformContainer = new html().cls(
    "flex col gap-1 bg-pre-primary h-full"
  );
  function updateProperties(obj) {
    transformContainer.clear();

    if (!obj) return;
    transformContainer.chld([
      createObjectNameInput(obj),
      createTransformSection(obj),
    ]);
  }

  const propertiesPanel = new html()
    .cls("flex col just-start h-full")
    .chld([
      createIconText("Properties", "frame_inspect"),
      transformContainer.build(),
    ])
    .on({ keydown: handleKeyInput })
    .build();

  EditorState.events.on("selectionChanged", updateProperties);

  return propertiesPanel;
}
