(function (global) {
  "use strict";

  var React = global.React;
  if (!React) return;

  var h = React.createElement;
  var Fragment = React.Fragment;

  var PAGINA_VER_MAIS = "/catalogo.html";

  function GameCard(props) {
    var game = props.game;

    return h("div", { className: "product-card" },
      h("a", { href: game.href },
        h("img", { src: game.img, alt: "" }),
        h("div", { className: "product-info" },
          h("span", null, game.name),
          h("span", { className: "price" }, game.price || "Em breve na loja")
        )
      )
    );
  }

  function GameList(props) {
    return h("div", { className: "products-grid" },
      props.games.map(function (game) {
        return h(GameCard, { key: game.id, game: game });
      })
    );
  }

  function CatalogTitle(props) {
    return h("div", { className: "title-row" },
      h("div", { className: "title-text" },
        h("h2", { id: props.titleId },
          props.icon ? h("i", { className: "fa-solid " + props.icon }) : null,
          props.title
        ),
        h("p", null, props.subtitle)
      ),
      props.verMaisHref
        ? h("a", { href: props.verMaisHref, className: "btn-ver-mais" },
            "Ver mais",
            h("i", { className: "fa-solid fa-chevron-right" })
          )
        : null
    );
  }

  function FeaturedGame(props) {
    var game = props.game;
    var priceLabel = game.free ? "gratuito" : game.price;

    return h("div", { className: "previa vitrine-item" },
      h("a", { href: game.href, className: "previa-link vitrine-capa", tabIndex: -1, "aria-hidden": "true" },
        h("div", { className: "previa-midia" },
          h("img", { className: "previa-img", src: game.cover, alt: "Capa de " + game.name }),
          h("img", { className: "previa-gif", "data-src": game.gif, alt: "", decoding: "async" })
        )
      ),
      h("div", { className: "vitrine-detalhes" },
        h("h3", { className: "vitrine-nome" }, game.name),
        h("span", { className: "vitrine-preco" }, game.price),
        h("p", { className: "vitrine-texto" }, game.description),
        h("a", { href: game.href, className: "vitrine-botao", "aria-label": "Ver jogo " + game.name + ", " + priceLabel },
          "Ver jogo",
          h("i", { className: "fa-solid fa-arrow-right" })
        )
      )
    );
  }

  function OfferCard(props) {
    var offer = props.offer;

    return h("div", { className: "ofertas-card" },
      h("a", { href: offer.href },
        h("img", { src: offer.img, alt: "" }),
        h("div", { className: "ofertas-info" },
          h("div", null,
            h("span", null, offer.name),
            h("p", null, offer.discount)
          ),
          h("div", { className: "pricing-oferta" },
            h("span", { className: "ofertas-price-old" }, offer.oldPrice),
            h("span", { className: "ofertas-price" }, offer.price)
          )
        )
      )
    );
  }

  function OfferList(props) {
    return h("div", { className: "ofertas-grid" },
      props.offers.map(function (offer) {
        return h(OfferCard, { key: offer.id, offer: offer });
      })
    );
  }

  function CatalogBlock(props) {
    var block = props.block;

    if (block.tipo === "ofertas") {
      return h("div", { className: "ofertas-block" },
        h("div", { className: "ofertas-title-row" },
          h("h2", null, block.titulo),
          h("p", null, block.subtitulo)
        ),
        h(OfferList, { offers: block.ofertas })
      );
    }

    var verMaisHref = props.verMais === false ? null : PAGINA_VER_MAIS + "?secao=" + encodeURIComponent(block.id);

    return h("div", { className: "products-block" },
      h(CatalogTitle, { title: block.titulo, subtitle: block.subtitulo, icon: block.icone, titleId: block.tituloId, verMaisHref: verMaisHref }),
      block.tipo === "destaque"
        ? h(FeaturedGame, { game: block.jogo })
        : h(GameList, { games: block.jogos })
    );
  }

  function GameCatalog(props) {
    return h(Fragment, null,
      props.sections.map(function (section) {
        var blocks = section.blocos.map(function (block) {
          return h(CatalogBlock, { key: block.id, block: block });
        });

        if (!section.className) return h(Fragment, { key: section.key }, blocks);

        return h("section", {
          key: section.key,
          className: section.className,
          id: section.id,
          "aria-labelledby": section.labelledBy
        }, blocks);
      })
    );
  }

  function CatalogPage(props) {
    var dados = props.dados;
    var blocos = dados.listarBlocos();
    var categoria = props.categoria ? dados.encontrarCategoria(props.categoria) : null;
    var atual = categoria ? null : dados.encontrarBloco(props.secao);

    var bloco = categoria
      ? {
          id: "categoria-" + categoria.id,
          tipo: "grade",
          titulo: categoria.nome,
          subtitulo: categoria.descricao,
          jogos: dados.jogosDaCategoria(categoria.id)
        }
      : atual || {
          id: "todos",
          tipo: "grade",
          titulo: "Todos os jogos",
          subtitulo: "Tudo o que está na loja",
          jogos: dados.listarJogos()
        };

    var filtros = [{ id: "todos", titulo: "Todos" }].concat(blocos.map(function (b) {
      return { id: b.id, titulo: b.titulo };
    }));

    return h(Fragment, null,
      h("nav", { className: "catalogo-filtros", "aria-label": "Filtrar por seção" },
        filtros.map(function (filtro) {
          var ativo = filtro.id === bloco.id;
          return h("a", {
            key: filtro.id,
            href: PAGINA_VER_MAIS + (filtro.id === "todos" ? "" : "?secao=" + encodeURIComponent(filtro.id)),
            className: "catalogo-filtro" + (ativo ? " is-active" : ""),
            "aria-current": ativo ? "page" : undefined
          }, filtro.titulo);
        })
      ),
      h(CatalogBlock, { key: bloco.id, block: bloco, verMais: false })
    );
  }

  global.IaraCatalogo = global.IaraCatalogo || {};
  global.IaraCatalogo.componentes = {
    GameCard: GameCard,
    GameList: GameList,
    FeaturedGame: FeaturedGame,
    OfferCard: OfferCard,
    OfferList: OfferList,
    CatalogBlock: CatalogBlock,
    GameCatalog: GameCatalog,
    CatalogPage: CatalogPage
  };
})(window);
