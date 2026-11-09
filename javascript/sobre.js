const jogosSobre = document.querySelectorAll(".jogos-disclaimer .jogo");

function ativarJogo(alvo) {
  jogosSobre.forEach((jogo) => {
    jogo.classList.toggle("is-active", jogo === alvo);
  });
}

jogosSobre.forEach((jogo) => {
  jogo.addEventListener("mouseenter", () => ativarJogo(jogo));
  jogo.addEventListener("focus", () => ativarJogo(jogo));

  jogo.addEventListener("click", (event) => {
    if (!jogo.classList.contains("is-active")) {
      event.preventDefault();
      ativarJogo(jogo);
    }
  });
});
