// ─── Мобильное меню (бургер) + блокировка скролла без сдвига ───
export function initMenu() {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  if (!burger || !nav) return;

  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("nav--open");
    burger.classList.toggle("header__burger--open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    open ? lockScroll() : unlockScroll();
  });

  nav.addEventListener("click", (e) => {
    if (e.target.closest(".nav__link")) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  function close() {
    nav.classList.remove("nav--open");
    burger.classList.remove("header__burger--open");
    burger.setAttribute("aria-expanded", "false");
    unlockScroll();
  }

  /* FIX: блокируем скролл, компенсируя ширину скрытого скроллбара,
     чтобы вьюпорт не расширялся и контент не дёргался */
  function lockScroll() {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  function unlockScroll() {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }
}
