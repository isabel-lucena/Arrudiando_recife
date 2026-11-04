// =========================================================
// ARRUDIANDO RECIFE — script.js
// Só a roleta precisa de JS: o CSS não consegue sortear nada.
// =========================================================

const wheel = document.getElementById("wheel");
const spinButton = document.getElementById("spin");
const result = document.getElementById("result");

// Mesma ordem das fatias no conic-gradient do CSS (sentido horário, a partir do topo)
const categorias = [
  { nome: "Sorte", frase: "O vento a favor." },
  { nome: "Azar", frase: "Deu ruim, visse?" },
  { nome: "Recurso", frase: "É bom garantir." },
  { nome: "Sabotagem", frase: "Uma carta na manga." },
];

let rotacaoTotal = 0;

spinButton.addEventListener("click", () => {
  spinButton.disabled = true;
  result.textContent = "Girando…";

  // 4 a 6 voltas completas + um ângulo aleatório
  const voltas = 4 + Math.floor(Math.random() * 3);
  rotacaoTotal += voltas * 360 + Math.floor(Math.random() * 360);
  wheel.style.transform = `rotate(${rotacaoTotal}deg)`;

  // Espera o tempo do giro (lido do próprio CSS) e mostra o resultado.
  // Usar um timer em vez do evento "transitionend" garante que o botão
  // nunca fica travado, mesmo se a animação estiver desligada no sistema.
  const duracao = parseFloat(getComputedStyle(wheel).transitionDuration) * 1000 || 0;

  setTimeout(() => {
    const anguloNoPonteiro = (360 - (rotacaoTotal % 360)) % 360;
    const sorteada = categorias[Math.floor(anguloNoPonteiro / 90)];
    result.textContent = `Deu ${sorteada.nome}: ${sorteada.frase}`;
    spinButton.disabled = false;
  }, duracao + 100);
});
