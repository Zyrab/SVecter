import html from "../../services/DOMConstructor.js";
import SectionName from "../../common/SectionName.js";

export default function HierarchyPanel(objs) {
  const objects = objs.map((obj) => {
    return new html("li").txt(obj.name).build();
  });
  const objectList = new html("ul").chld(objects).build();
  const hierarchyPanel = new html("div")
    .cls("hierarchy-panel")
    .chld([SectionName("Hierarchy", "view_object_track"), objectList])
    .build();
  return hierarchyPanel;
}
