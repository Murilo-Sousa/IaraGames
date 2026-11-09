(() => {
  const modal = document.getElementById("auth-modal");
  if (!modal) return;

  const dialog = modal.querySelector(".auth-dialog");
  const order = ["login", "cadastro", "preferencias"];
  const views = {
    login: modal.querySelector('[data-auth-view="login"]'),
    cadastro: modal.querySelector('[data-auth-view="cadastro"]'),
    preferencias: modal.querySelector('[data-auth-view="preferencias"]'),
  };

  let currentName = "login";
  let cameFrom = "cadastro";
  let lastFocused = null;
  let resetTimer = null;


  function showView(name, animate) {
    const direction = order.indexOf(name) > order.indexOf(currentName) ? 1 : -1;

    Object.entries(views).forEach(([key, view]) => {
      const active = key === name;
      view.hidden = !active;
      view.classList.remove("is-entering");

      if (active && animate) {
        view.style.setProperty("--auth-dir", `${direction * 28}px`);
        void view.offsetWidth;
        view.classList.add("is-entering");
      }
    });

    dialog.classList.toggle("is-wide", name === "preferencias");
    dialog.setAttribute("aria-labelledby", `auth-title-${name}`);
    dialog.scrollTop = 0;
    currentName = name;
  }

  function currentView() {
    return views[currentName];
  }

  function focusFirstField() {
    const field = currentView().querySelector("input");
    if (field) field.focus();
  }


  function resetForms() {
    modal.querySelectorAll("form").forEach((form) => form.reset());
    modal.querySelectorAll(".auth-field input").forEach((input) => {
      input.classList.remove("input-error", "input-success");
      if (input.dataset.wasPassword) input.type = "password";
    });
    modal.querySelectorAll(".toggle-password").forEach((icon) => {
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
      icon.setAttribute("title", "Mostrar senha");
      icon.setAttribute("aria-label", "Mostrar senha");
    });
  }

  function openModal(name) {
    lastFocused = document.activeElement;

    if (resetTimer) {
      clearTimeout(resetTimer);
      resetTimer = null;
      resetForms();
    }

    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = scrollbar > 0 ? `${scrollbar}px` : "";
    document.documentElement.style.setProperty("--auth-sbw", `${scrollbar}px`);
    document.documentElement.classList.add("auth-lock");

    dialog.classList.add("no-width-anim");
    showView(name, false);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    requestAnimationFrame(() => {
      dialog.classList.remove("no-width-anim");
      focusFirstField();
    });
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("auth-lock");
    document.documentElement.style.removeProperty("--auth-sbw");
    document.body.style.paddingRight = "";

    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }

    resetTimer = setTimeout(() => {
      resetTimer = null;
      resetForms();
      dialog.classList.add("no-width-anim");
      showView("login", false);
    }, 320);
  }


  document.addEventListener("click", (event) => {
    const opener = event.target.closest("[data-auth-open]");

    if (opener) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      event.preventDefault();
      openModal(opener.dataset.authOpen);
      return;
    }

    if (!modal.contains(event.target)) return;

    const switcher = event.target.closest("[data-auth-switch]");
    if (switcher) {
      event.preventDefault();
      showView(switcher.dataset.authSwitch, true);
      focusFirstField();
      return;
    }

    if (event.target.closest("[data-auth-back]")) {
      showView(cameFrom, true);
      focusFirstField();
      return;
    }

    if (event.target.closest("[data-auth-close]")) {
      closeModal();
      return;
    }

    if (event.target.closest(".auth-forgot")) {
      event.preventDefault();
    }
  });


  function tabStops() {
    const items = [
      ...dialog.querySelectorAll('button, a[href], input, [tabindex="0"]'),
    ].filter((el) => el.offsetParent !== null);

    return items.filter((el) => {
      if (el.type !== "radio" || !el.name) return true;
      const group = items.filter((i) => i.type === "radio" && i.name === el.name);
      const checked = group.find((i) => i.checked);
      return checked ? el === checked : el === group[0];
    });
  }

  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      closeModal();
      return;
    }

    if (event.key !== "Tab") return;

    const stops = tabStops();
    if (stops.length === 0) return;

    const first = stops[0];
    const last = stops[stops.length - 1];
    const active = document.activeElement;
    const activeStop = stops.find(
      (el) => el === active || (el.type === "radio" && active.type === "radio" && el.name === active.name)
    );

    if (event.shiftKey && (active === first || !dialog.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (activeStop === last || !dialog.contains(active))) {
      event.preventDefault();
      first.focus();
    }
  });


  function togglePassword(icon) {
    const input = document.getElementById(icon.getAttribute("data-target"));
    if (!input) return;

    if (input.type === "password") {
      input.type = "text";
      input.dataset.wasPassword = "true";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
      icon.setAttribute("title", "Ocultar senha");
      icon.setAttribute("aria-label", "Ocultar senha");
    } else {
      input.type = "password";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
      icon.setAttribute("title", "Mostrar senha");
      icon.setAttribute("aria-label", "Mostrar senha");
    }
  }

  modal.querySelectorAll(".toggle-password").forEach((icon) => {
    icon.addEventListener("click", () => togglePassword(icon));
    icon.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        togglePassword(icon);
      }
    });
  });


  const loginForm = document.getElementById("auth-login-form");
  const cadastroForm = document.getElementById("auth-cadastro-form");
  const prefForm = document.getElementById("auth-pref-form");
  const prefNome = document.getElementById("auth-pref-nome");

  const senha = document.getElementById("cad-senha");
  const confirmarSenha = document.getElementById("cad-confirmar");

  function verificarSenhas() {
    if (confirmarSenha.value === "") {
      confirmarSenha.classList.remove("input-error", "input-success");
      return;
    }

    if (senha.value !== confirmarSenha.value) {
      confirmarSenha.classList.add("input-error");
      confirmarSenha.classList.remove("input-success");
    } else {
      confirmarSenha.classList.remove("input-error");
      confirmarSenha.classList.add("input-success");
    }
  }

  senha.addEventListener("input", verificarSenhas);
  confirmarSenha.addEventListener("input", verificarSenhas);


  function irParaPreferencias(origem, nickname) {
    cameFrom = origem;
    prefNome.textContent = nickname.trim();
    showView("preferencias", true);
    focusFirstField();
  }

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    irParaPreferencias("login", document.getElementById("login-nickname").value);
  });

  cadastroForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (senha.value !== confirmarSenha.value) {
      confirmarSenha.classList.add("input-error");
      confirmarSenha.classList.remove("input-success");
      confirmarSenha.focus();
      alert("As senhas não coincidem.");
      return;
    }

    irParaPreferencias("cadastro", document.getElementById("cad-nickname").value);
  });

  prefForm.addEventListener("submit", (event) => {
    event.preventDefault();
    closeModal();
  });
})();
