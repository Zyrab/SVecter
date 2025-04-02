// Sidebar.js
class Sidebar {
  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("sidebar");
  }

  createTools() {
    const tools = [
      { name: "Move tool", icon: "drag_pan" },
      { name: "Hand tool", icon: "pan_tool" },
      { name: "Rotate tool", icon: "cached" },
      { name: "Transform tool", icon: "360" },
      { name: "Scale tool", icon: "aspect_ratio" },
    ];

    tools.forEach((tool) => {
      const toolButton = document.createElement("button");
      toolButton.classList.add("buttons");
      const spanElement = document.createElement("span");
      spanElement.classList.add("material-symbols-outlined");
      spanElement.innerText = tool.icon;
      toolButton.appendChild(spanElement);

      toolButton.addEventListener("click", () =>
        this.handleToolSelection(tool)
      );
      this.element.appendChild(toolButton);
    });
  }

  handleToolSelection(tool) {
    console.log(`${tool.name} selected`);
    // Handle tool selection functionality here (such as changing editor mode)
  }

  appendTo(container) {
    container.appendChild(this.element);
    this.createTools();
  }
}

export default Sidebar;
