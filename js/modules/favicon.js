// ─── Фавиконка: вырезает знак из PNG, фон — прозрачный, без полей ───
export function initFavicon() {
  const link = document.querySelector('link[rel="icon"]');
  if (!link) return;

  const img = new Image();
  img.onload = () => {
    try {
      const url = makeIcon(img);
      if (url) link.href = url; // подменяем PNG на обработанный
    } catch (err) {
      /* canvas недоступен — остаёмся на исходном PNG */
    }
  };
  img.src = link.getAttribute("href");
}

function makeIcon(img) {
  const src = document.createElement("canvas");
  src.width = img.naturalWidth;
  src.height = img.naturalHeight;
  const ctx = src.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, src.width, src.height);
  const data = imageData.data;

  // У оранжевого знака синий канал почти нулевой, у светлого фона — ~250.
  // Одним проходом: фон делаем прозрачным + ищем границы знака.
  let minX = src.width,
    minY = src.height,
    maxX = -1,
    maxY = -1;

  for (let y = 0; y < src.height; y++) {
    for (let x = 0; x < src.width; x++) {
      const i = (y * src.width + x) * 4;
      if (data[i + 2] < 160) {
        // пиксель знака
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      } else {
        data[i + 3] = 0; // фон → прозрачный
      }
    }
  }
  if (maxX < 0) return null;

  ctx.putImageData(imageData, 0, 0);

  // Квадратный тайл 128×128, знак по центру с небольшим «воздухом»
  const w = maxX - minX + 1;
  const h = maxY - minY + 1;
  const side = Math.max(w, h);
  const pad = Math.round(side * 0.1);
  const scale = 128 / (side + pad * 2);

  const out = document.createElement("canvas");
  out.width = out.height = 128;
  const octx = out.getContext("2d");
  octx.imageSmoothingQuality = "high";
  octx.drawImage(
    src,
    minX,
    minY,
    w,
    h, // берём из исходника только знак
    ((side - w) / 2 + pad) * scale, // центрируем в квадрате
    ((side - h) / 2 + pad) * scale,
    w * scale,
    h * scale,
  );

  return out.toDataURL("image/png");
}
