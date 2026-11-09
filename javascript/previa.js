
(() => {
  const itens = document.querySelectorAll(".previa");

  if (!itens.length) return;

  const reduzMovimento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  itens.forEach((item) => {
    const gif = item.querySelector(".previa-gif");

    if (!gif) return;

    function carregar() {
      if (gif.getAttribute("src")) return;

      item.classList.add("is-loading");

      gif.addEventListener(
        "load",
        () => {
          item.classList.remove("is-loading");
          item.classList.add("is-ready");
        },
        { once: true }
      );

      gif.addEventListener(
        "error",
        () => item.classList.remove("is-loading"),
        { once: true }
      );

      gif.src = gif.dataset.src;
    }

    function tocar() {
      if (reduzMovimento) return;

      carregar();
      item.classList.add("is-playing");
    }

    function parar() {
      item.classList.remove("is-playing");
    }

    if (!reduzMovimento) {
      carregar();
    }

    item.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") tocar();
    });

    item.addEventListener("pointerleave", (event) => {
      if (event.pointerType === "mouse") parar();
    });

    item.addEventListener("focusin", (event) => {
      if (event.target.matches(":focus-visible")) tocar();
    });

    item.addEventListener("focusout", (event) => {
      if (!item.contains(event.relatedTarget)) parar();
    });
  });
})();
