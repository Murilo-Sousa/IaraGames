(() => {
  const params = new URLSearchParams(window.location.search);
  const nickname = (params.get("nickname") || "").trim();
  const origem = params.get("origem");

  const nome = document.getElementById("pref-nome");
  if (nome) {
    nome.textContent = nickname;
    if (!nickname && nome.parentElement) {
      nome.parentElement.textContent = "Olá";
    }
  }

  // Voltar leva para a tela de onde a pessoa veio (login ou cadastro)
  const voltar = document.getElementById("pref-voltar");
  if (voltar) {
    voltar.href = origem === "login" ? "/formulario/login.html" : "/formulario/criar conta.html";
  }
})();
