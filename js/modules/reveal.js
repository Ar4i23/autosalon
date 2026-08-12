// ─── Появление блоков при скролле + липкая шапка ────────────
export function initReveal() {
  // липкая шапка при прокрутке
  const header = document.querySelector(".header");
  const onScroll = () =>
    header.classList.toggle("header--scrolled", window.scrollY > 12);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // reveal-анимации
  const items = document.querySelectorAll("[data-reveal]");
  items.forEach((el) => {
    const delay = el.dataset.revealDelay;
    if (delay) el.style.setProperty("--reveal-delay", delay);
  });

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  items.forEach((el) => io.observe(el));
}
