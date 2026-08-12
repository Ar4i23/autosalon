// ─── Переключение тёмная / светлая тема ─────────────────────
const STORAGE_KEY = "cobalt-theme";

export function initTheme() {
  const toggle = document.getElementById("themeToggle");
  const html = document.documentElement;

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") {
    html.dataset.theme = saved;
  }
  updateLabel();

  toggle.addEventListener("click", () => {
    html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, html.dataset.theme);
    updateLabel();
  });

  function updateLabel() {
    const dark = html.dataset.theme === "dark";
    toggle.setAttribute(
      "aria-label",
      dark ? "Переключить на светлую тему" : "Переключить на тёмную тему",
    );
  }
}
