import html from "../../services/DOMConstructor.js";

export default function createProperties(EditorState) {
  // Register state listeners
  function createProperty(name, props) {
    const ps = ["x", "y", "z"];
    const text = new html("text").txt(name).build();
    const label = (text) => new html("label").txt(text).build();
    const input = (value) =>
      new html("input").cls("input flex").val(value).build();
    const inputs = new html()
      .cls("flex gap-05")
      .chld([
        ps.map((p) =>
          new html()
            .cls("flex row gap-02")
            .chld([label(p), input(props[p])])
            .build()
        ),
      ])
      .build();

    const div = new html()
      .cls("flex row just-between")
      .chld([text, inputs])
      .cls(" ")
      .build();
    return div;
  }
  const nameDiv = new html()
    .cls("flex just-between p-02 gap-1")
    .chld([new html("h2").txt("Properties").build()])
    .build();
  const properties = new html()
    .chld([nameDiv, createProperty("position", { x: 5, y: 8, z: 55 })])
    .build();

  EditorState.events.on("selectionChanged", (obj) => updateProperties(obj.id));
  return properties;
}
