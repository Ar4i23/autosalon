// ─── Предзаполнение формы по кнопкам с data-preset ──────────
export function initPreset() {
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-preset]");
    if (!trigger) return;

    const select = document.getElementById("fModel");
    if (!select) return;

    select.value = trigger.dataset.preset;
    select.dispatchEvent(new Event("input", { bubbles: true }));
  });
}
