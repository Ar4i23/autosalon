// ─── Форма заявки: валидация в реальном времени ─────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zа-я]{2,}$/i;
const NAME_RE = /^[a-zа-яё\s'-]{2,40}$/i;

const validators = {
  name(value) {
    const v = value.trim();
    if (!v) return "Укажите имя";
    if (!NAME_RE.test(v)) return "Только буквы, от 2 символов";
    return "";
  },
  phone(value) {
    const digits = value.replace(/\D/g, "");
    if (!digits) return "Укажите номер телефона";
    if (digits.length < 11) return "Введите номер полностью";
    return "";
  },
  email(value) {
    const v = value.trim();
    if (!v) return ""; // необязательное поле
    if (!EMAIL_RE.test(v)) return "Некорректный email";
    return "";
  },
  model(value) {
    return value ? "" : "Выберите услугу";
  },
};

export function initForm() {
  const form = document.getElementById("orderForm");
  if (!form) return;

  const submitBtn = document.getElementById("formSubmit");
  const hint = document.getElementById("formHint");
  const success = document.getElementById("formSuccess");
  const resetBtn = document.getElementById("formReset");
  const consent = document.getElementById("fConsent");
  const consentError = document.getElementById("consentError");
  const formGrid = form.querySelector(".form__grid");
  const formFooter = form.querySelector(".form__footer");

  const fields = [...form.querySelectorAll("[data-field]")].filter(
    (f) => validators[f.dataset.field],
  );

  fields.forEach(({ dataset }) => {
    const input = form.elements[dataset.field];
    if (dataset.field === "phone")
      input.addEventListener("input", () => formatPhone(input));
    input.addEventListener("input", () => validateField(dataset.field));
  });
  consent.addEventListener("change", () => {
    validateConsent();
    updateSubmit();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const allValid = fields.every((f) => !validateField(f.dataset.field));
    const consentOk = !validateConsent();

    if (allValid && consentOk) {
      formGrid.hidden = true; // теперь корректно скрывается
      formFooter.hidden = true;
      success.hidden = false; // показывается только после отправки
      console.log("Заявка:", Object.fromEntries(new FormData(form)));
    } else {
      form.classList.remove("form--shake");
      void form.offsetWidth;
      form.classList.add("form--shake");
    }
  });

  resetBtn.addEventListener("click", () => {
    form.reset();
    fields.forEach((f) => {
      const group = f.closest(".field");
      group.classList.remove("field--error", "field--valid");
      group.querySelector(".field__error").textContent = "";
    });
    consentError.textContent = "";
    formFooter.classList.remove("form__footer--error");
    formFooter.hidden = false;
    success.hidden = true;
    formGrid.hidden = false;
    updateSubmit();
  });

  /* ── внутренние функции ── */
  function validateField(name) {
    const group = form.querySelector(`[data-field="${name}"]`);
    const input = form.elements[name];
    const errorEl = group.querySelector(".field__error");
    const message = validators[name](input.value);

    group.classList.toggle("field--error", Boolean(message));
    group.classList.toggle(
      "field--valid",
      !message && input.value.trim() !== "",
    );
    errorEl.textContent = message;
    updateSubmit();
    return message;
  }

  function validateConsent() {
    const message = consent.checked ? "" : "Нужно согласие на обработку данных";
    consentError.textContent = message;
    formFooter.classList.toggle("form__footer--error", Boolean(message));
    updateSubmit();
    return message;
  }

  function updateSubmit() {
    const ok =
      fields.every(
        (f) =>
          !validators[f.dataset.field](form.elements[f.dataset.field].value),
      ) && consent.checked;
    submitBtn.disabled = !ok;
    hint.textContent = ok
      ? "Всё готово — отправляйте!"
      : "Заполните обязательные поля";
    hint.classList.toggle("form__hint--ready", ok);
  }

  function formatPhone(input) {
    let d = input.value.replace(/\D/g, "");
    if (d.startsWith("8")) d = "7" + d.slice(1);
    if (d && !d.startsWith("7")) d = "7" + d;
    d = d.slice(0, 11);

    let out = "";
    if (d.length) out = "+7";
    if (d.length > 1) out += ` (${d.slice(1, 4)}`;
    if (d.length >= 5) out += `) ${d.slice(4, 7)}`;
    if (d.length >= 8) out += `-${d.slice(7, 9)}`;
    if (d.length >= 10) out += `-${d.slice(9, 11)}`;
    input.value = out;
  }

  updateSubmit();
}
