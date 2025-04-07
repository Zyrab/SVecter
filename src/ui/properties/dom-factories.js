import html from "../../services/dom-constructor.js";
import createIconText from "../components/icon-text.js";
import createInput from "../components/input.js";
import createIcon from "../components/icon.js";

export function createObjectNameInput(obj) {
  const input = new html("input")
    .val(obj.name)
    .cls("input p-02  w-full")
    .build();
  const chekbox = new html("input").attr({ type: "checkbox" }).build();
  const objNameContainer = new html()
    .cls("flex row gap-05 ph-1 align-center")
    .chld([createIcon("nearby"), chekbox, input])
    .build();
  return objNameContainer;
}

export function createTransformSection(obj) {
  const transforms = [
    { label: "Position", keys: ["x", "y", "z"] },
    { label: "Rotation", keys: ["rx", "ry", "rz"] },
    { label: "Scale", keys: ["sx", "sy", "sz"] },
  ];

  const sectionElements = transforms.map(({ label, keys }) =>
    createTransformRow(
      label,
      keys.map((k, i) => ({
        key: k,
        label: ["X", "Y", "Z"][i], // Always display X Y Z
        value: obj[k],
      }))
    )
  );

  return new html()
    .cls("flex col gap-1")
    .chld([
      createIconText("Transform", "component_exchange", "sec"),
      ...sectionElements,
    ])
    .build();
}

function createTransformRow(sectionLabel, fields) {
  const labelEl = new html("p").txt(sectionLabel).build();

  const inputs = fields.map(({ key, label, value }) =>
    createInput(label, value, key)
  );

  const inputGroup = new html().cls("flex row gap-05").chld(inputs).build();

  return new html()
    .cls("flex just-between gap-02 ph-1")
    .chld([labelEl, inputGroup])
    .build();
}
