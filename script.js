// =========================================================
// ARRUDIANDO RECIFE — script.js
// =========================================================

// ---------- 1. Lógica da Roleta ----------
const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spin");
const result = document.getElementById("result");

const categorias = [
  { nome: "Sorte", frase: "O vento a favor." },
  { nome: "Azar", frase: "Deu ruim, visse?" },
  { nome: "Recurso", frase: "É bom garantir." },
  { nome: "Sabotagem", frase: "Uma carta na manga." },
];

let rotacaoTotal = 0;

if (spinButton && wheel) {
  spinButton.addEventListener("click", () => {
    spinButton.disabled = true;
    result.textContent = "Girando…";

    const voltas = 4 + Math.floor(Math.random() * 3);
    rotacaoTotal += voltas * 360 + Math.floor(Math.random() * 360);
    wheel.style.transform = `rotate(${rotacaoTotal}deg)`;

    const duracao = parseFloat(getComputedStyle(wheel).transitionDuration) * 1000 || 0;

    setTimeout(() => {
      const anguloNoPonteiro = (360 - (rotacaoTotal % 360)) % 360;
      const sorteada = categorias[Math.floor(anguloNoPonteiro / 90)];
      result.textContent = `Deu ${sorteada.nome}: ${sorteada.frase}`;
      spinButton.disabled = false;
    }, duracao + 100);
  });
}

// ---------- 2. Lógica do Modo Escuro ----------
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

// Carrega preferência do usuário do localStorage
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
  if (themeIcon) themeIcon.textContent = "☀️";
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDarkMode = document.body.classList.contains("dark-mode");

    if (themeIcon) {
      themeIcon.textContent = isDarkMode ? "☀️" : "🌙";
    }

    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  });
}
