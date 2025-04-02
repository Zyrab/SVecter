// PropertiesPanel.js
class PropertiesPanel {
  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("properties-panel");
  }

  update(properties) {
    this.element.innerHTML = ""; // Clear the previous content
    for (let key in properties) {
      const propertyDiv = document.createElement("div");
      propertyDiv.innerText = `${key}: ${properties[key]}`;
      this.element.appendChild(propertyDiv);
    }
  }

  appendTo(container) {
    container.appendChild(this.element);
  }

  show() {
    this.element.style.display = "block";
  }

  hide() {
    this.element.style.display = "none";
  }
}

export default PropertiesPanel;
