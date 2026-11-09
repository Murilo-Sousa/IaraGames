(function (global) {
  "use strict";

  if (!global.React || !global.ReactDOM) {
    console.error("IARA: React/ReactDOM não foram carregados; o catálogo não será exibido.");
    return;
  }

  var h = global.React.createElement;
  var GameCatalog = global.IaraCatalogo.componentes.GameCatalog;
  var dados = global.IaraCatalogo.dados;

  document.querySelectorAll("[data-catalogo]").forEach(function (container) {
    var sections = dados[container.dataset.catalogo];

    if (!sections) {
      console.error("IARA: região de catálogo desconhecida: " + container.dataset.catalogo);
      return;
    }

    var root = global.ReactDOM.createRoot(container);

    global.ReactDOM.flushSync(function () {
      root.render(h(GameCatalog, { sections: sections }));
    });
  });
})(window);
