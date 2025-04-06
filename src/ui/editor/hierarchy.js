import html from "../../services/DOMConstructor.js";
import createIconText from "../components/icon-text.js";
import createIcon from "../components/icon.js";
import EditorState from "../../state/editor.js";

export default function createHierarchy(objects) {
  let listItems = [];
  let listContainer;

  function handleClick(e) {
    const li = e.target.closest("li");
    const target = e.target;
    if (!li || !target) return;

    const index = parseInt(li.dataset.index);
    const obj = objects[index];

    switch (target.id) {
      case "lock":
        EditorState.toggleLock(obj);
        break;
      case "hide":
        EditorState.toggleVisibility(obj);
        break;
      default:
        EditorState.selectObject(obj);
        break;
    }
  }

  function createLabel(name) {
    return new html()
      .cls("flex align-center gap-02")
      .chld([createIcon("nearby"), name])
      .build();
  }

  function createControls(obj) {
    return new html()
      .cls("flex align-center gap-02 Hcontrols")
      .chld([
        createIcon("near_me", "1rem", "lock"),
        createIcon("visibility", "1rem", "hide"),
      ])
      .build();
  }

  function buildListItem(obj, index) {
    const li = new html("li")
      .id(obj.id)
      .attr({ "data-index": index })
      .chld([createLabel(obj.name), createControls(obj)])
      .build();

    if (obj.selected) li.classList.add("selected");
    return li;
  }

  function updateList() {
    listItems = objects.map((obj, i) => buildListItem(obj, i));
    listContainer.innerHTML = "";
    listItems.forEach((li) => listContainer.appendChild(li));
  }

  function updateListHighlight(selectedId) {
    listItems.forEach((li) => {
      if (li.id === selectedId) {
        li.classList.add("selected");
      } else {
        li.classList.remove("selected");
      }
    });
  }

  function updateIcons() {
    listItems.forEach((li, i) => {
      const obj = objects[i];
      const lockIcon = li.querySelector("#lock");
      const visIcon = li.querySelector("#hide");

      lockIcon.textContent = obj.locked ? "near_me_disabled" : "near_me";
      lockIcon.style.visibility = obj.locked ? "visible" : "";

      visIcon.textContent = obj.visible ? "visibility" : "visibility_off";
      visIcon.style.visibility = obj.visible ? "" : "visible";
    });
  }

  function updateLabel() {
    listItems.forEach((li, i) => {
      const obj = objects[i];
      const label = li.querySelector(".flex.align-center.gap-02");
      if (label) {
        label.innerHTML = ""; // Clear children
        label.appendChild(createIcon("nearby"));
        label.appendChild(document.createTextNode(obj.name));
      }
    });
  }

  // UI setup
  listContainer = new html("ul").build();
  updateList();

  const hierarchyPanel = new html("div")
    .cls("hierarchy-panel")
    .chld([createIconText("Hierarchy", "view_object_track"), listContainer])
    .on({ click: handleClick })
    .build();

  // Register state listeners
  EditorState.events.on("selectionChanged", (obj) =>
    updateListHighlight(obj.id)
  );

  EditorState.events.on("visibilityChanged", updateIcons);
  EditorState.events.on("lockChanged", updateIcons);
  EditorState.events.on("nameChanged", updateLabel);

  return hierarchyPanel;
}
