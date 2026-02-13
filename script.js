const form = document.getElementById("formGenerator");
const amountInput = document.getElementById("amount");
const resultBox = document.getElementById("result");
const msg = document.getElementById("msg");
const btnCopy = document.getElementById("btnCopy");

// Tus párrafos (hazlos tuyos; no copies literal de Lipsum)
const PARAGRAPHS = [
  "Lorem ipsum de ejemplo: este texto está pensado para probar el diseño sin depender del contenido final.",
  "Puedes ajustar la cantidad de párrafos y el formato de salida para ver cómo se adapta el contenido.",
  "Este generador usa JavaScript y manipulación del DOM para mostrar resultados sin recargar la página.",
  "El objetivo es practicar eventos, validación básica y el portapapeles del navegador.",
  "Si necesitas más variedad, agrega más párrafos a este arreglo y el generador tendrá más combinaciones."
];

function setMessage(text, type) {
  msg.textContent = text;
  msg.className = ""; // limpia clases
  if (type) msg.classList.add(type);
}

function generateText(amount) {
  const output = [];
  for (let i = 0; i < amount; i++) {
    // Repite tomando del arreglo (cíclico)
    output.push(PARAGRAPHS[i % PARAGRAPHS.length]);
  }
  return output;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const amount = Number(amountInput.value);
  const format = document.querySelector('input[name="format"]:checked').value;

  // Validación
  if (!Number.isInteger(amount) || amount < 1 || amount > 20) {
    setMessage("Ingresa un número válido de párrafos (1 a 20).", "error");
    btnCopy.disabled = true;
    resultBox.innerHTML = `<p class="hint">Aquí aparecerá tu texto generado…</p>`;
    return;
  }

  const paras = generateText(amount);

  // Render según formato
  if (format === "line") {
    resultBox.textContent = paras.join(" ");
  } else {
    resultBox.innerHTML = paras.map(p => `<p>${p}</p>`).join("");
  }

  setMessage("Texto generado correctamente.", "ok");
  btnCopy.disabled = false;
});

btnCopy.addEventListener("click", async () => {
  const textToCopy = resultBox.innerText.trim();

  if (!textToCopy) {
    setMessage("Primero genera texto para poder copiar.", "error");
    return;
  }

  try {
    await navigator.clipboard.writeText(textToCopy);

    const oldText = btnCopy.textContent;
    btnCopy.textContent = "¡Copiado!";
    setMessage("Copiado al portapapeles.", "ok");

    setTimeout(() => {
      btnCopy.textContent = oldText || "Copiar";
    }, 2000);

  } catch (err) {
    setMessage("No se pudo copiar. Intenta manualmente (selecciona y copia).", "error");
  }
});
