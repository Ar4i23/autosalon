// ─── Эффект «декодирования» заголовка hero ──────────────────
const CHARS = "АБВГКЛМНОПРСТ0123456789#$%&";

export function initScramble(selector = "#scrambleTitle") {
  const el = document.querySelector(selector);
  if (!el) return;

  const target = el.textContent.trim();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  el.textContent = "";
  const start = performance.now();
  const duration = 1500;

  (function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const locked = Math.floor(progress * target.length);

    el.textContent = target
      .split("")
      .map((ch, i) => {
        if (ch === " " || i < locked) return ch;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      })
      .join("");

    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  })(start);
}
