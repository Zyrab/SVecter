// HierarchyPanel.js
class HierarchyPanel {
  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("hierarchy-panel");

    this.title = document.createElement("h2");
    this.title.innerText = "Hierarchy";
    this.element.appendChild(this.title);
  }

  update(objects) {
    this.element.innerHTML = ""; // Clear the previous content
    objects.forEach((obj) => {
      const objDiv = document.createElement("div");
      objDiv.innerText = obj.name;
      objDiv.style.cursor = "pointer";
      objDiv.addEventListener("click", () => this.handleObjectSelect(obj));
      this.element.appendChild(objDiv);
    });
  }

  handleObjectSelect(obj) {
    console.log(`${obj.name} selected`);
    // Handle object selection (maybe highlight or show in properties panel)
  }

  appendTo(container) {
    container.appendChild(this.element);
  }
}

export default HierarchyPanel;
