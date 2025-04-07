import EditorState from "../../state/editor-state.js";
export function handleKeyInput(e) {
  const target = e.target.closest("input");
  const object = EditorState.selection.selectedObject;
  if (!target || !object) return;
  const id = target.id;
  const value = target.value;
  object[id] = value;
  console.log(id, value, object[id]);
  console.log(object);
}
