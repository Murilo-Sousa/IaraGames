(function (global) {
  "use strict";

  if (!global.React || !global.ReactDOM) {
    console.error("IARA: React/ReactDOM não foram carregados; a página não será exibida.");
    return;
  }

  var container = document.querySelector("[data-pagina-catalogo]");
  if (!container) return;

  var h = global.React.createElement;
  var CatalogPage = global.IaraCatalogo.componentes.CatalogPage;
  var dados = global.IaraCatalogo.dados;
  var parametros = new URLSearchParams(global.location.search);
  var secao = parametros.get("secao") || "";
  var categoria = parametros.get("categoria") || "";

  var categoriaAtual = dados.encontrarCategoria(categoria);
  var bloco = dados.encontrarBloco(secao);
  document.title = (categoriaAtual ? categoriaAtual.nome : (bloco ? bloco.titulo : "Todos os jogos")) + " | IARA";

  var root = global.ReactDOM.createRoot(container);

  global.ReactDOM.flushSync(function () {
    root.render(h(CatalogPage, { dados: dados, secao: secao, categoria: categoria }));
  });
})(window);
