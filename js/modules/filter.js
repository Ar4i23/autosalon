// ─── Фильтр каталога по типу кузова ─────────────────────────
export function initFilters() {
  const wrap = document.querySelector(".catalog");
  if (!wrap) return;

  const buttons = wrap.querySelectorAll("[data-filter]");
  const cards = wrap.querySelectorAll(".card");

  wrap.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;

    buttons.forEach((b) => b.classList.remove("filters__btn--active"));
    btn.classList.add("filters__btn--active");

    const filter = btn.dataset.filter;
    let i = 0;

    cards.forEach((card) => {
      const show = filter === "all" || card.dataset.type === filter;
      card.classList.toggle("card--hidden", !show);

      if (show) {
        card.classList.remove("card--pop");
        void card.offsetWidth; // перезапуск анимации
        card.style.animationDelay = `${i++ * 55}ms`;
        card.classList.add("card--pop");
      }
    });
  });
}
