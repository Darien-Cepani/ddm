export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "ddm-theme";

/** Inline script (stringified) run before paint to avoid theme flash. */
export const themeInitScript = `
(function() {
  try {
    var key = "${THEME_STORAGE_KEY}";
    var stored = localStorage.getItem(key);
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = stored || (prefersDark ? "dark" : "light");
    if (theme === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;
