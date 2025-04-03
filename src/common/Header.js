import html from "../services/DOMConstructor.js";
import ToolBtn from "./ToolBtn.js";
export default function Header() {
  const prefersDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (prefersDarkScheme) {
    document.body.classList.add("dark");
  }

  const handleThemeClick = () => {
    document.body.classList.toggle("dark");
  };

  const svecter = new html("h2").txt("Svecter").build();

  const header = new html("header")
    .cls("header")
    .chld([svecter, ToolBtn("Theme", "clear_day", handleThemeClick)])
    .build();
  return header;
}
