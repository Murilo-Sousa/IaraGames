(() => {
  const root = document.querySelector(".destaque");
  if (!root) return;

  const INTERVALO = 6000;

  const track = root.querySelector(".slider-track");
  const originais = [...track.children];
  const total = originais.length;
  const dotsBox = root.querySelector(".slider-dots");
  const semAnimacao = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const cloneFim = originais[0].cloneNode(true);
  const cloneInicio = originais[total - 1].cloneNode(true);
  track.prepend(cloneInicio);
  track.append(cloneFim);

  const slides = [...track.children];

  let pos = 1;
  let ocupado = false;
  let timer = null;
  let fallback = null;
  let pausado = false;

  const real = () => (pos - 1 + total) % total;

  const dots = originais.map((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", `Ir para o jogo ${i + 1}`);
    b.addEventListener("click", () => {
      if (i !== real()) mover(i + 1);
    });
    dotsBox.appendChild(b);
    return b;
  });

  function posicionar(animar) {
    track.style.transition = animar ? "" : "none";
    track.style.transform = `translateX(-${pos * 100}%)`;
    if (!animar) {
      void track.offsetWidth;
      track.style.transition = "";
    }
  }

  function atualizar() {
    slides.forEach((slide, i) => {
      slide.setAttribute("aria-hidden", String(i !== pos));
      slide.tabIndex = i === pos ? 0 : -1;
    });
    dots.forEach((dot, i) => dot.setAttribute("aria-selected", String(i === real())));
  }

  function concluir() {
    clearTimeout(fallback);
    if (pos === 0) pos = total;
    else if (pos === total + 1) pos = 1;
    posicionar(false);
    atualizar();
    ocupado = false;
    agendar();
  }

  function mover(novaPos) {
    if (ocupado) return;
    ocupado = true;
    pos = novaPos;
    atualizar();
    posicionar(!semAnimacao);

    if (semAnimacao) concluir();
    else fallback = setTimeout(concluir, 700);
  }

  track.addEventListener("transitionend", (e) => {
    if (e.target === track && e.propertyName === "transform" && ocupado) concluir();
  });

  function agendar() {
    clearTimeout(timer);
    if (semAnimacao || pausado) return;
    timer = setTimeout(() => mover(pos + 1), INTERVALO);
  }

  root.querySelector(".slider-prev").addEventListener("click", () => mover(pos - 1));
  root.querySelector(".slider-next").addEventListener("click", () => mover(pos + 1));

  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") mover(pos - 1);
    if (e.key === "ArrowRight") mover(pos + 1);
  });

  root.addEventListener("mouseenter", () => ((pausado = true), agendar()));
  root.addEventListener("mouseleave", () => ((pausado = false), agendar()));
  root.addEventListener("focusin", () => ((pausado = true), agendar()));
  root.addEventListener("focusout", () => ((pausado = false), agendar()));

  let inicioX = 0;
  track.addEventListener("touchstart", (e) => (inicioX = e.touches[0].clientX), { passive: true });
  track.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - inicioX;
    if (Math.abs(dx) > 50) mover(pos + (dx < 0 ? 1 : -1));
  });

  posicionar(false);
  atualizar();
  agendar();
})();
