import html from "../../services/DOMConstructor.js";
import creteIconButton from "../components/icon-button.js";
export default function Header() {
  const prefersDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (prefersDarkScheme) {
    document.body.classList.add("dark");
  }

  const handleThemeSwithch = () => {
    document.body.classList.toggle("dark");
  };

  const svecter = new html("h2").txt("Svecter").build();

  const header = new html("header")
    .chld([svecter, creteIconButton("Theme", "clear_day", handleThemeSwithch)])
    .build();
  return header;
}
