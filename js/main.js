// ─── Точка входа: собирает и запускает все модули ───────────
import { initTheme } from "./modules/theme.js";
import { initMenu } from "./modules/menu.js";
import { initScramble } from "./modules/scramble.js";
import { initReveal } from "./modules/reveal.js";
import { initCounters } from "./modules/counter.js";
import { initFilters } from "./modules/filter.js";
import { initPreset } from "./modules/preset.js";
import { initForm } from "./modules/form.js";
import { initFavicon } from "./modules/favicon.js";

document.addEventListener("DOMContentLoaded", () => {
  initFavicon();
  initTheme();
  initMenu();
  initScramble();
  initReveal();
  initCounters();
  initFilters();
  initPreset();
  initForm();
});
