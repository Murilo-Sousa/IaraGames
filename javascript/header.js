(() => {
  const nav = document.getElementById("nav");
  if (!nav) return;

  const burger = nav.querySelector(".nav-burger");
  const links = [...nav.querySelectorAll(".nav-link")];
  const indicator = nav.querySelector(".nav-indicator");
  const search = nav.querySelector(".nav-search");
  const input = document.getElementById("nav-search-input");
  const results = document.getElementById("nav-search-results");
  const catsBtn = nav.querySelector(".nav-cats-btn");
  const catsPanel = document.getElementById("nav-cats-panel");
  const mobileQuery = window.matchMedia("(max-width: 1100px)");


  const catalogo = window.IaraCatalogo && window.IaraCatalogo.dados;

  if (!catalogo) {
    console.error("IARA: javascript/catalogo/dados.js precisa carregar antes do header.js; a busca ficará vazia.");
  }

  const GAMES = catalogo ? catalogo.listarJogos() : [];
  const SUGGESTED = catalogo ? catalogo.listarSugeridosBusca() : [];


  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
    updateSpy();
  }


  let activeLink = null;

  function placeIndicator(link) {
    if (!link || mobileQuery.matches) {
      indicator.classList.remove("is-visible");
      return;
    }

    const first = !indicator.classList.contains("is-visible");

    if (first) indicator.style.transition = "none";
    indicator.style.setProperty("--x", `${link.offsetLeft}px`);
    indicator.style.setProperty("--w", `${link.offsetWidth}px`);

    if (first) {
      void indicator.offsetWidth;
      indicator.style.transition = "";
    }

    indicator.classList.add("is-visible");
  }

  function getSections() {
    return links
      .map((link) => ({ link, el: document.getElementById(link.dataset.section) }))
      .filter((item) => item.el);
  }

  let spyQueued = false;

  function updateSpy() {
    if (spyQueued) return;
    spyQueued = true;

    requestAnimationFrame(() => {
      spyQueued = false;

      const sections = getSections();
      const probe = window.innerHeight * 0.35;
      let current = null;
      let currentTop = -Infinity;

      sections.forEach(({ link, el }) => {
        const top = el.getBoundingClientRect().top;
        if (top <= probe && top > currentTop) {
          current = link;
          currentTop = top;
        }
      });

      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && sections.length) current = sections[sections.length - 1].link;

      if (current === activeLink) return;

      activeLink = current;
      links.forEach((link) => {
        link.classList.toggle("is-active", link === current);
        if (link === current) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
      placeIndicator(current);
    });
  }

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => placeIndicator(link));
    link.addEventListener("focus", () => placeIndicator(link));
  });

  nav.querySelector(".nav-links").addEventListener("mouseleave", () => placeIndicator(activeLink));
  nav.querySelector(".nav-links").addEventListener("focusout", () => placeIndicator(activeLink));


  function setDrawer(open) {
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    if (!open) closePanels();
  }

  burger.addEventListener("click", () => setDrawer(!nav.classList.contains("is-open")));

  mobileQuery.addEventListener("change", () => {
    setDrawer(false);
    placeIndicator(activeLink);
  });


  function setPanel(panel, open) {
    panel.classList.toggle("is-open", open);
  }

  function closeCats() {
    setPanel(catsPanel, false);
    catsBtn.setAttribute("aria-expanded", "false");
  }

  function closeResults() {
    setPanel(results, false);
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");
    activeIndex = -1;
  }

  function closePanels() {
    closeCats();
    closeResults();
  }

  catsBtn.addEventListener("click", () => {
    const open = !catsPanel.classList.contains("is-open");
    closeResults();
    setPanel(catsPanel, open);
    catsBtn.setAttribute("aria-expanded", String(open));
  });

  catsPanel.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      closeCats();
      if (mobileQuery.matches) setDrawer(false);
    });
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileQuery.matches) setDrawer(false);
    });
  });

  nav.querySelectorAll(".nav-actions a").forEach((a) => {
    a.addEventListener("click", () => setDrawer(false));
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) setDrawer(false);
    else if (!event.target.closest(".nav-cats")) closeCats();
  });


  let activeIndex = -1;
  let shown = [];

  function normalize(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function highlight(name, query) {
    const frag = document.createDocumentFragment();
    const at = query ? normalize(name).indexOf(query) : -1;

    if (at < 0) {
      frag.append(name);
      return frag;
    }

    const mark = document.createElement("mark");
    mark.textContent = name.slice(at, at + query.length);
    frag.append(name.slice(0, at), mark, name.slice(at + query.length));
    return frag;
  }

  function renderResults() {
    const query = normalize(input.value.trim());
    results.replaceChildren();
    activeIndex = -1;
    input.removeAttribute("aria-activedescendant");

    let title = "Em alta";
    shown = SUGGESTED;

    if (query) {
      shown = GAMES.filter((game) => normalize(game.name).includes(query))
        .sort((a, b) => {
          const aStarts = normalize(a.name).startsWith(query) ? 0 : 1;
          const bStarts = normalize(b.name).startsWith(query) ? 0 : 1;
          return aStarts - bStarts;
        })
        .slice(0, 6);
      title = "Jogos encontrados";
    }

    if (shown.length === 0) {
      const empty = document.createElement("div");
      empty.className = "nav-empty";
      empty.textContent = `Nenhum jogo encontrado para "${input.value.trim()}". Tente outro nome.`;
      results.append(empty);
      return;
    }

    const heading = document.createElement("div");
    heading.className = "nav-panel-title";
    heading.textContent = title;
    results.append(heading);

    shown.forEach((game, i) => {
      const item = document.createElement("a");
      item.className = "nav-result";
      item.href = game.href;
      item.id = `nav-option-${i}`;
      item.setAttribute("role", "option");

      const cover = document.createElement("img");
      cover.src = game.img;
      cover.alt = "";
      cover.loading = "lazy";

      const text = document.createElement("span");
      text.className = "nav-result-text";

      const name = document.createElement("span");
      name.className = "nav-result-name";
      name.append(highlight(game.name, query));

      const meta = document.createElement("span");
      meta.className = "nav-result-meta";
      meta.textContent = game.price || "Em breve na loja";

      const arrow = document.createElement("i");
      arrow.className = "fa-solid fa-arrow-right";

      text.append(name, meta);
      item.append(cover, text, arrow);
      item.addEventListener("mousemove", () => setActive(i, false));
      results.append(item);
    });
  }

  function openResults() {
    closeCats();
    renderResults();
    setPanel(results, true);
    input.setAttribute("aria-expanded", "true");
  }

  function setActive(index, scroll = true) {
    const options = results.querySelectorAll(".nav-result");
    if (options.length === 0) return;

    activeIndex = (index + options.length) % options.length;
    options.forEach((option, i) => option.classList.toggle("is-active", i === activeIndex));
    input.setAttribute("aria-activedescendant", options[activeIndex].id);
    if (scroll) options[activeIndex].scrollIntoView({ block: "nearest" });
  }

  input.addEventListener("focus", openResults);
  input.addEventListener("input", openResults);

  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!results.classList.contains("is-open")) openResults();
      setActive(activeIndex + (event.key === "ArrowDown" ? 1 : -1));
    } else if (event.key === "Enter") {
      const options = results.querySelectorAll(".nav-result");
      const target = options[activeIndex >= 0 ? activeIndex : 0];
      if (target) {
        event.preventDefault();
        window.location.href = target.href;
      }
    } else if (event.key === "Escape") {
      closeResults();
      input.blur();
    }
  });

  results.addEventListener("mousedown", (event) => event.preventDefault());

  search.addEventListener("focusout", (event) => {
    if (!search.contains(event.relatedTarget)) closeResults();
  });


  document.addEventListener("keydown", (event) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;

    if (event.key === "/" && !typing && !document.documentElement.classList.contains("auth-lock")) {
      event.preventDefault();
      if (mobileQuery.matches && !nav.classList.contains("is-open")) setDrawer(true);
      input.focus();
    }

    if (event.key === "Escape") {
      closeCats();
      if (nav.classList.contains("is-open")) {
        setDrawer(false);
        burger.focus();
      }
    }
  });


  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => placeIndicator(activeLink));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => placeIndicator(activeLink));

  window.addEventListener("load", updateSpy);
  onScroll();
})();
