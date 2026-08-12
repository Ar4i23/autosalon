// ─── Анимированные счётчики статистики ──────────────────────
export function initCounters() {
  const nodes = document.querySelectorAll("[data-count-to]");
  if (!nodes.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.6 },
  );

  nodes.forEach((el) => io.observe(el));

  function animate(el) {
    const to = parseFloat(el.dataset.countTo);
    const decimals = parseInt(el.dataset.countDecimals || "0", 10);
    const suffix = el.dataset.countSuffix || "";
    const duration = 1500;
    const start = performance.now();

    (function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const value = (to * eased).toFixed(decimals);
      el.textContent = Number(value).toLocaleString("ru-RU") + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }
}
