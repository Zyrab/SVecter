import EditorState from "../../state/editor-state.js";
import GameObject from "../../core/game-object.js";
let prevSelectedId = null;
export function handleClick(e) {
  const li = e.target.closest("li");
  const button = e.target.closest("button");

  const target = e.target;
  if (li || button) {
    const index = parseInt(li?.dataset?.index);
    const obj = EditorState.scene.objects[index];
    switch (target.dataset.action) {
      case "lock":
        EditorState.toggleLock(obj);
        break;
      case "hide":
        EditorState.toggleVisibility(obj);
        break;
      case "add":
        EditorState.scene.addObject(
          new GameObject(0, 0, 100, 100, "red", "Test red")
        );
        break;
      default:
        EditorState.selection.selectObject(obj);
        break;
    }
  }
}

export function updateListHighlight(obj) {
  const selectedId = obj ? obj.id : null;
  if (selectedId === prevSelectedId) return;
  if (prevSelectedId)
    document.getElementById(prevSelectedId).classList.remove("selected");
  prevSelectedId = selectedId;
  selectedId && document.getElementById(selectedId).classList.add("selected");
}

export function updateIcons(obj) {
  const li = document.getElementById(obj.id);
  if (!li) return;

  const lockIcon = li.querySelector('[data-action="lock"]');
  const visIcon = li.querySelector('[data-action="hide"]');

  if (lockIcon) {
    lockIcon.textContent = obj.locked ? "near_me_disabled" : "near_me";
    lockIcon.style.visibility = obj.locked ? "visible" : "";
  }

  if (visIcon) {
    visIcon.textContent = obj.visible ? "visibility" : "visibility_off";
    visIcon.style.visibility = obj.visible ? "" : "visible";
  }
}

export function updateLabel(obj) {
  const li = document.getElementById(obj.id);
  if (!li) return;
  const label = li.querySelector(".Hlabel");
  if (label) {
    label.textContent = obj.name;
  }
}
