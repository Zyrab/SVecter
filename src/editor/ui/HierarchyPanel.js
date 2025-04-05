import html from "../../services/DOMConstructor.js";
import SectionName from "../../common/SectionName.js";
import MSOIcon from "../../common/MSOIcon.js";

export default function HierarchyPanel(objects, selectionManager) {
  let prevSelectedIndex = null;

  function handleClick(e) {
    const li = e.target.closest("li");
    const target = e.target;
    if (!li || !target) return;

    const index = parseInt(li.dataset.index);
    const obj = objects[index];
    if (target.id === "lock") {
      obj.toggleLock(); // Toggle lock status
      target.textContent = obj.locked ? "near_me_disabled" : "near_me";
      target.style.visibility = obj.locked ? "visible" : "";
      return;
    }

    if (target.id === "hide") {
      obj.toggleVisibility(); // Toggle visibility
      target.textContent = obj.visible ? "visibility" : "visibility_off";
      target.style.visibility = obj.visible ? "" : "visible";
      return;
    }

    if (li.classList.contains("selected")) return;

    // Deselect previous item if any
    if (prevSelectedIndex !== null) {
      const prevObj = objects[prevSelectedIndex];
      prevObj.deselect(); // Deselect previous object
      const prevLi = li.parentElement.children[prevSelectedIndex];
      prevLi.classList.remove("selected");
    }

    // Select the new item
    li.classList.add("selected");
    obj.select(); // Select new object
    prevSelectedIndex = index;
    selectionManager.selectedObject = obj;
  }

  function createLabel(name) {
    return new html()
      .cls("flex align-center gap-02")
      .chld([MSOIcon("nearby"), name])
      .build();
  }

  function createControls() {
    return new html()
      .cls("flex align-center gap-02 Hcontrols")
      .chld([
        MSOIcon("near_me", "1rem", "lock"),
        MSOIcon("visibility", "1rem", "hide"),
      ])
      .build();
  }

  // Create the list items for each object
  const listItems = objects.map((obj, index) =>
    new html("li")
      .id(obj.id)
      .attr({ "data-index": index })
      .chld([createLabel(obj.name), createControls()])
      .build()
  );

  const objectList = new html("ul").chld(listItems).build();

  // Initialize the panel with event handling
  const hierarchyPanel = new html("div")
    .cls("hierarchy-panel")
    .chld([SectionName("Hierarchy", "view_object_track"), objectList])
    .on({ click: handleClick })
    .build();

  // Add event listeners for each object to react to selection and other changes
  objects.forEach((obj) => {
    obj.on("select", (obj) => {
      const li = document.getElementById(obj.id);
      li.classList.add("selected");
      prevSelectedIndex = li.dataset.index;
    });

    obj.on("deselect", (obj) => {
      document.getElementById(obj.id).classList.remove("selected");
    });

    obj.on("visibility-change", (visible) => {
      console.log(`${obj.name} visibility changed: ${visible}`);
      // React to visibility changes
    });

    obj.on("lock-change", (locked) => {
      console.log(`${obj.name} lock status changed: ${locked}`);
      // React to lock changes
    });
  });

  return hierarchyPanel;
}
