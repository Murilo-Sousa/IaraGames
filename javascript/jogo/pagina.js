(function (global) {
  "use strict";

  if (!global.React || !global.ReactDOM) {
    console.error("IARA: React/ReactDOM não foram carregados; a página do jogo não será exibida.");
    return;
  }

  var container = document.querySelector("[data-pagina-jogo]");
  if (!container) return;

  var React = global.React;
  var h = React.createElement;
  var Fragment = React.Fragment;
  var useState = React.useState;
  var useEffect = React.useEffect;
  var useLayoutEffect = React.useLayoutEffect;
  var useRef = React.useRef;

  var dados = global.IaraCatalogo.dados;
  var detalhes = global.IaraJogo.detalhes;

  var ALTURA_RECOLHIDA = 315;
  // Mesmo endereco do site. Para usar um servidor em outro endereco, defina window.IARA_API antes deste script.
  var API = global.IARA_API || "";
  var PAGINA_INICIAL = "/index.html";

  // ---------- dados ----------

  function carregarJogo(id) {
    var base = id ? dados.encontrarJogo(id) : null;
    if (!base) return null;

    var extra = detalhes[id] || {};
    return Object.assign({}, base, extra, { cover: extra.cover || base.img });
  }

  function listarSemelhantes(jogo) {
    if (jogo.similares) {
      return jogo.similares.map(function (item) {
        var doCatalogo = item.id ? dados.encontrarJogo(item.id) : null;
        return doCatalogo
          ? Object.assign({}, item, { name: doCatalogo.name, price: doCatalogo.price })
          : item;
      });
    }

    var todos = dados.listarJogos();
    var posicao = todos.map(function (j) { return j.id; }).indexOf(jogo.id);
    var outros = todos.slice(posicao + 1).concat(todos.slice(0, posicao));

    return outros.slice(0, 5).map(function (j) {
      return { id: j.id, name: j.name, price: j.price, img: j.img };
    });
  }

  function formatarNota(nota) {
    return nota.toFixed(1).replace(".", ",");
  }

  // ---------- navegacao ----------

  // O botao Voltar leva de volta a pagina de onde a pessoa veio (home, catalogo ou outro jogo).
  // Sem origem conhecida, como num link direto, cai na pagina inicial.
  function voltar(evento) {
    var veioDoSite = false;

    try {
      veioDoSite = !!document.referrer && new URL(document.referrer).origin === global.location.origin;
    } catch (erro) {
      veioDoSite = false;
    }

    if (veioDoSite && global.history.length > 1) {
      evento.preventDefault();
      global.history.back();
    }
  }

  // ---------- hooks ----------

  function useNotificacao() {
    var estado = useState(null);
    var aviso = estado[0];
    var setAviso = estado[1];
    var timers = useRef([]);

    function limpar() {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    }

    useEffect(function () { return limpar; }, []);

    function notificar(mensagem) {
      limpar();
      setAviso({ mensagem: mensagem, visivel: false });
      timers.current.push(setTimeout(function () { setAviso({ mensagem: mensagem, visivel: true }); }, 10));
      timers.current.push(setTimeout(function () { setAviso({ mensagem: mensagem, visivel: false }); }, 2500));
      timers.current.push(setTimeout(function () { setAviso(null); }, 2800));
    }

    var elemento = aviso
      ? h("div", { className: "notification" + (aviso.visivel ? " show" : ""), role: "status" }, aviso.mensagem)
      : null;

    return [elemento, notificar];
  }

  // ---------- pecas pequenas ----------

  function Estrelas(props) {
    var estrelas = [];
    for (var i = 1; i <= 5; i++) {
      estrelas.push(h("i", { key: i, className: (i <= props.nota ? "fa-solid" : "fa-regular") + " fa-star" }));
    }
    return h(Fragment, null, estrelas);
  }

  function Paragrafos(props) {
    var itens = [];
    props.textos.forEach(function (texto, i) {
      if (i > 0) {
        itens.push(h("br", { key: "a" + i }), h("br", { key: "b" + i }));
      }
      itens.push(h(Fragment, { key: "t" + i }, texto));
    });
    return h(Fragment, null, itens);
  }

  function BotaoIcone(props) {
    return h("button", {
      type: "button",
      className: "icon-button" + (props.ativo ? " active" : ""),
      "aria-label": props.rotulo,
      "aria-pressed": props.ativo,
      onClick: props.onClick
    }, h("i", { className: props.icone }));
  }

  // ---------- midia ----------

  function Midia(props) {
    var midia = props.midia;
    var aberto = useState(false);
    var expandido = aberto[0];
    var setExpandido = aberto[1];

    var imagens = midia.imagens || [];

    // Com video, ele ocupa o destaque. Sem video, a primeira imagem toma o lugar dele.
    var inicio = midia.video ? 0 : 1;
    var destaque = midia.video ? null : imagens[0];
    var miniaturas = imagens.slice(inicio, inicio + 4);
    var extras = imagens.slice(inicio + 4);

    function imagem(src, indice, lazy) {
      return h("img", {
        key: src,
        src: src,
        alt: "Gameplay " + (indice + 1),
        loading: lazy ? "lazy" : undefined,
        decoding: "async",
        onClick: function () { props.onAbrirImagem({ src: src, alt: "Gameplay " + (indice + 1) }); }
      });
    }

    return h("div", { className: "media-section" },
      h("div", { className: "media-viewport" },
        h("div", { className: "media-track" + (expandido ? " is-open" : ""), id: "media-track" },
          h("div", { className: "media-panel" },
            midia.video
              ? h("div", { className: "media-video" },
                  h("video", {
                    className: "game-video",
                    ref: props.videoRef,
                    autoPlay: true,
                    muted: true,
                    loop: true,
                    playsInline: true,
                    onClick: props.onAbrirVideo
                  }, h("source", { src: midia.video, type: "video/mp4" }))
                )
              : destaque
                ? h("div", { className: "media-video media-featured" }, imagem(destaque, 0, false))
                : null,
            miniaturas.length
              ? h("div", { className: "media-grid" },
                  miniaturas.map(function (src, i) { return imagem(src, inicio + i, false); })
                )
              : null
          ),
          extras.length
            ? h("div", { className: "media-panel media-panel-extra", "aria-hidden": !expandido },
                h("div", { className: "media-grid media-grid-extra" },
                  extras.map(function (src, i) { return imagem(src, inicio + 4 + i, true); })
                )
              )
            : null
        )
      ),
      extras.length
        ? h("button", {
            type: "button",
            className: "media-more" + (expandido ? " is-open" : ""),
            "aria-label": expandido ? "Ver menos mídias" : "Ver mais mídias",
            "aria-expanded": expandido,
            "aria-controls": "media-track",
            onClick: function () { setExpandido(!expandido); }
          }, h("i", { className: "fa-solid fa-chevron-right" }))
        : null
    );
  }

  function ModalImagem(props) {
    var imagem = props.imagem;

    return h("div", {
        className: "image-modal" + (imagem ? " active" : ""),
        onClick: function (evento) { if (evento.target === evento.currentTarget) props.onFechar(); }
      },
      h("img", { src: imagem ? imagem.src : "", alt: imagem ? imagem.alt : "" }),
      h("button", { type: "button", className: "modal-close", "aria-label": "Fechar imagem", onClick: props.onFechar }, "×")
    );
  }

  function ModalVideo(props) {
    var ref = useRef(null);

    useEffect(function () {
      var video = ref.current;
      if (!video) return;

      if (props.aberto) {
        if (props.videoPrincipal.current) video.currentTime = props.videoPrincipal.current.currentTime;
        var promessa = video.play();
        if (promessa && promessa.catch) promessa.catch(function () {});
      } else {
        video.pause();
      }
    }, [props.aberto]);

    return h("div", {
        className: "video-modal" + (props.aberto ? " active" : ""),
        onClick: function (evento) { if (evento.target === evento.currentTarget) props.onFechar(); }
      },
      h("video", { ref: ref, src: props.src, controls: true, muted: true, playsInline: true, preload: "none" }),
      h("button", { type: "button", className: "video-close", "aria-label": "Fechar vídeo", onClick: props.onFechar }, "×")
    );
  }

  // ---------- secoes ----------

  function Detalhes(props) {
    var jogo = props.jogo;
    var textoRef = useRef(null);
    var estadoExpandido = useState(false);
    var expandido = estadoExpandido[0];
    var setExpandido = estadoExpandido[1];
    var estadoAltura = useState(ALTURA_RECOLHIDA);
    var alturaExpandida = estadoAltura[0];
    var setAlturaExpandida = estadoAltura[1];
    var estadoLongo = useState(true);
    var textoLongo = estadoLongo[0];
    var setTextoLongo = estadoLongo[1];

    var paragrafos = jogo.sobre || (jogo.descricao ? [jogo.descricao] : ["Mais detalhes sobre " + jogo.name + " em breve."]);

    var linhas = [
      ["Desenvolvido por", jogo.desenvolvedor],
      ["Data de lançamento", jogo.lancamento],
      ["Tamanho da instalação", jogo.tamanho]
    ].filter(function (linha) { return linha[1]; });

    useLayoutEffect(function () {
      function medir() {
        if (!textoRef.current || expandido) return;
        setTextoLongo(textoRef.current.scrollHeight > ALTURA_RECOLHIDA);
      }
      medir();
      global.addEventListener("resize", medir);
      return function () { global.removeEventListener("resize", medir); };
    }, [jogo.id, expandido]);

    function alternar() {
      if (!expandido && textoRef.current) setAlturaExpandida(textoRef.current.scrollHeight + 70);
      setExpandido(!expandido);
    }

    var altura = !textoLongo ? "auto" : (expandido ? alturaExpandida : ALTURA_RECOLHIDA);

    return h("section", { className: "details-section" },
      h("div", { className: "details-container" },
        h("div", { className: "details-box" + (expandido ? " expanded" : ""), style: { height: altura } },
          h("p", { className: "details-text", ref: textoRef },
            h("strong", null, "O que é " + jogo.name + "?"),
            h("br"), h("br"),
            h(Paragrafos, { textos: paragrafos })
          ),
          textoLongo ? h("div", { className: "fade-overlay" }) : null,
          textoLongo
            ? h("button", { type: "button", className: "read-more", onClick: alternar }, expandido ? "Ver menos" : "Ver mais")
            : null
        ),
        linhas.length
          ? h("aside", { className: "info-lateral" },
              h("div", { className: "topo" }, h("h3", null, "Sobre")),
              h("dl", null,
                linhas.map(function (linha) {
                  return h("div", { className: "item", key: linha[0] },
                    h("dt", { className: "label" }, linha[0]),
                    h("dd", { className: "valor" }, linha[1])
                  );
                })
              )
            )
          : null
      )
    );
  }

  function CaixaRequisitos(props) {
    return h("div", { className: "requirements-box" },
      h("h3", { className: "requirements-title" }, props.titulo),
      h("div", { className: "requirements-divider" }),
      h("dl", { className: "requirements-list" },
        props.itens.map(function (item) {
          return h("div", { key: item[0] },
            h("dt", { className: "req-label" }, item[0]),
            h("dd", { className: "req-value" }, item[1])
          );
        })
      )
    );
  }

  function Requisitos(props) {
    var requisitos = props.requisitos;

    return h("section", { className: "requirements-section" },
      h("div", { className: "requirements-container" },
        requisitos.minimos ? h(CaixaRequisitos, { titulo: "Requisitos mínimos", itens: requisitos.minimos }) : null,
        requisitos.recomendados ? h(CaixaRequisitos, { titulo: "Exigências recomendadas", itens: requisitos.recomendados }) : null
      )
    );
  }

  function Semelhantes(props) {
    if (!props.jogos.length) return null;

    return h("section", { className: "similar-section" },
      h("div", { className: "similar-container" },
        h("h2", { className: "similar-title" }, "Jogos semelhantes"),
        h("ul", { className: "similar-grid" },
          props.jogos.map(function (item) {
            var conteudo = [
              h("figure", { className: "similar-cover", key: "capa" },
                h("img", { src: item.img, alt: item.name })
              ),
              h("div", { className: "similar-info", key: "info" },
                h("span", { className: "similar-name" }, item.name),
                h("span", { className: "similar-price" }, item.price || "Em breve na loja")
              )
            ];

            return h("li", { className: "similar-card", key: item.id || item.name },
              item.id
                ? h("a", { className: "similar-link", href: dados.linkDoJogo(item.id) }, conteudo)
                : conteudo
            );
          })
        )
      )
    );
  }

  function Avaliacao(props) {
    var avaliacao = props.avaliacao;
    var estado = useState(null);
    var reacao = estado[0];
    var setReacao = estado[1];

    function alternar(tipo) {
      setReacao(reacao === tipo ? null : tipo);
    }

    return h("article", { className: "review-card" },
      h("div", { className: "review-top" },
        h("div", { className: "review-user" },
          h("div", { className: "review-avatar" },
            h("img", { src: avaliacao.avatar, alt: avaliacao.usuario })
          ),
          h("div", null,
            h("div", { className: "review-name" },
              avaliacao.usuario,
              h("span", { className: "user-rating" }, h(Estrelas, { nota: avaliacao.nota }))
            ),
            h("div", { className: "review-date" }, avaliacao.data)
          )
        )
      ),
      h("p", { className: "review-text" }, h(Paragrafos, { textos: avaliacao.texto })),
      h("div", { className: "review-actions" },
        h("button", {
          type: "button",
          className: "review-action" + (reacao === "positivo" ? " active" : ""),
          onClick: function () { alternar("positivo"); }
        },
          h("i", { className: "fa-regular fa-thumbs-up" }),
          h("span", null, avaliacao.positivos + (reacao === "positivo" ? 1 : 0))
        ),
        h("button", {
          type: "button",
          className: "review-action" + (reacao === "negativo" ? " active" : ""),
          onClick: function () { alternar("negativo"); }
        },
          h("i", { className: "fa-regular fa-thumbs-down" }),
          h("span", null, avaliacao.negativos + (reacao === "negativo" ? 1 : 0))
        )
      )
    );
  }

  function Avaliacoes(props) {
    var jogo = props.jogo;
    var lista = jogo.avaliacoes || [];

    return h("section", { className: "reviews-section" },
      h("div", { className: "reviews-container" },
        h("div", { className: "reviews-header" },
          h("h2", { className: "reviews-title" }, "Avaliações"),
          jogo.nota
            ? h("div", { className: "reviews-summary" },
                h("i", { className: "fa-solid fa-star" }),
                h("strong", null, formatarNota(jogo.nota)),
                h("span", null, jogo.totalAvaliacoes.toLocaleString("pt-BR") + " avaliações")
              )
            : null
        ),
        lista.length
          ? lista.map(function (avaliacao) { return h(Avaliacao, { key: avaliacao.usuario, avaliacao: avaliacao }); })
          : h("p", { className: "reviews-empty" }, "Este jogo ainda não tem avaliações."),
        lista.length ? h("button", { type: "button", className: "load-more" }, "Carregar mais") : null
      )
    );
  }

  // ---------- pagina ----------

  function JogoNaoEncontrado() {
    return h(Fragment, null,
      h("div", { className: "background" }),
      h("a", { href: PAGINA_INICIAL, className: "back-button", onClick: voltar },
        h("i", { className: "fa-solid fa-chevron-left" }),
        "Voltar"
      ),
      h("main", { className: "content" },
        h("div", { className: "game-not-found" },
          h("h1", null, "Jogo não encontrado"),
          h("p", null, "Não encontramos o jogo que você procurava. Veja o que temos na loja."),
          h("a", { href: "/catalogo.html", className: "buy-button game-not-found-link" }, "Ver catálogo")
        )
      )
    );
  }

  function JogoPagina(props) {
    var jogo = props.jogo;

    var abaEstado = useState("detalhes");
    var aba = abaEstado[0];
    var setAba = abaEstado[1];
    var favoritoEstado = useState(false);
    var favorito = favoritoEstado[0];
    var setFavorito = favoritoEstado[1];
    var carrinhoEstado = useState(false);
    var carrinho = carrinhoEstado[0];
    var setCarrinho = carrinhoEstado[1];
    var imagemEstado = useState(null);
    var imagemAberta = imagemEstado[0];
    var setImagemAberta = imagemEstado[1];
    var videoEstado = useState(false);
    var videoAberto = videoEstado[0];
    var setVideoAberto = videoEstado[1];

    var compraEstado = useState(false);
    var comprando = compraEstado[0];
    var setComprando = compraEstado[1];

    var videoPrincipal = useRef(null);
    var notificacao = useNotificacao();

    useEffect(function () {
      document.title = jogo.name + " | IARA";
    }, [jogo.name]);

    useEffect(function () {
      var video = videoPrincipal.current;
      if (!video) return;
      video.muted = true;
      var promessa = video.play();
      if (promessa && promessa.catch) promessa.catch(function () {});
    }, []);

    useEffect(function () {
      function aoTeclar(evento) {
        if (evento.key !== "Escape") return;
        setImagemAberta(null);
        setVideoAberto(false);
      }
      document.addEventListener("keydown", aoTeclar);
      return function () { document.removeEventListener("keydown", aoTeclar); };
    }, []);

    // Se a pessoa voltar do pagamento pelo botao do navegador, o botao precisa estar livre de novo
    useEffect(function () {
      function aoVoltar(evento) {
        if (evento.persisted) setComprando(false);
      }
      global.addEventListener("pageshow", aoVoltar);
      return function () { global.removeEventListener("pageshow", aoVoltar); };
    }, []);

    // Pede o pagamento ao servidor (que cria o checkout na Stripe) e leva a pessoa ate ele
    function comprar() {
      if (comprando) return;

      if (jogo.free) {
        notificacao[1](jogo.name + " é gratuito, não precisa de pagamento.");
        return;
      }

      setComprando(true);

      fetch(API + "/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jogoId: jogo.id })
      })
        .then(function (resposta) {
          return resposta.json().catch(function () { return {}; }).then(function (corpo) {
            if (!resposta.ok || !corpo.url) {
              var falha = new Error(corpo.erro || "Não foi possível iniciar o pagamento.");
              falha.doServidor = true;
              throw falha;
            }
            return corpo.url;
          });
        })
        .then(function (url) {
          global.location.href = url;
        })
        .catch(function (erro) {
          setComprando(false);
          notificacao[1](
            erro && erro.doServidor
              ? erro.message
              : "Sem conexão com o servidor de pagamento. Abra o site pelo servidor (npm start)."
          );
        });
    }

    function alternarFavorito() {
      var ativo = !favorito;
      setFavorito(ativo);
      notificacao[1](jogo.name + (ativo ? " foi adicionado aos favoritos!" : " foi removido dos favoritos."));
    }

    function alternarCarrinho() {
      var ativo = !carrinho;
      setCarrinho(ativo);
      notificacao[1](jogo.name + (ativo ? " foi adicionado ao carrinho!" : " foi removido do carrinho."));
    }

    function aoTeclarNaAba(destino) {
      return function (evento) {
        if (evento.key === "Enter" || evento.key === " ") {
          evento.preventDefault();
          setAba(destino);
        }
      };
    }

    var partesSubinfo = [];
    if (jogo.desenvolvedor) partesSubinfo.push(h("span", { key: "dev" }, jogo.desenvolvedor));
    if (jogo.nota) {
      partesSubinfo.push(h("div", { className: "rating", key: "nota", "aria-label": jogo.nota + " de 5 estrelas" }, h(Estrelas, { nota: jogo.nota })));
      partesSubinfo.push(h("span", { key: "total" }, jogo.totalAvaliacoes.toLocaleString("pt-BR") + " avaliações"));
    }

    var subinfo = [];
    partesSubinfo.forEach(function (parte, i) {
      if (i > 0) subinfo.push(h("span", { className: "dot", key: "dot" + i }, "•"));
      subinfo.push(parte);
    });

    var rotuloCompra = comprando
      ? "Abrindo o pagamento..."
      : (jogo.free ? "Jogar grátis" : (jogo.price ? "Comprar " + jogo.price : "Em breve na loja"));

    return h(Fragment, null,
      h("div", {
        className: "background",
        style: jogo.fundo ? { "--fundo": "url('" + jogo.fundo + "')" } : undefined
      }),

      h("a", { href: PAGINA_INICIAL, className: "back-button", onClick: voltar },
        h("i", { className: "fa-solid fa-chevron-left" }),
        "Voltar"
      ),

      h("main", { className: "content" },
        h("article", { className: "game-container" },
          h("figure", { className: "game-cover" },
            h("img", { src: jogo.cover, alt: "Capa do jogo " + jogo.name })
          ),

          h("section", { className: "game-info" },
            h("header", { className: "game-header" },
              h("h1", null, jogo.name),
              jogo.tags
                ? h("ul", { className: "game-tags" },
                    jogo.tags.map(function (tag) { return h("li", { key: tag }, tag); })
                  )
                : null
            ),

            subinfo.length ? h("div", { className: "game-subinfo" }, subinfo) : null,

            jogo.descricao ? h("p", { className: "game-description" }, jogo.descricao) : null,

            jogo.midia
              ? h(Midia, {
                  midia: jogo.midia,
                  videoRef: videoPrincipal,
                  onAbrirImagem: setImagemAberta,
                  onAbrirVideo: function () { setVideoAberto(true); }
                })
              : null,

            h("div", { className: "action-buttons" },
              h("button", { type: "button", className: "buy-button", disabled: !jogo.price || comprando, onClick: comprar }, rotuloCompra),
              h(BotaoIcone, { rotulo: "Adicionar ao carrinho", icone: "fa-solid fa-cart-shopping", ativo: carrinho, onClick: alternarCarrinho }),
              h(BotaoIcone, { rotulo: "Adicionar aos favoritos", icone: "fa-solid fa-heart", ativo: favorito, onClick: alternarFavorito })
            )
          )
        )
      ),

      h("nav", { className: "bottom-navigation" },
        h("span", {
          className: aba === "detalhes" ? "active" : "",
          role: "button",
          tabIndex: 0,
          onClick: function () { setAba("detalhes"); },
          onKeyDown: aoTeclarNaAba("detalhes")
        }, "Detalhes"),
        h("span", {
          className: aba === "avaliacoes" ? "active" : "",
          role: "button",
          tabIndex: 0,
          onClick: function () { setAba("avaliacoes"); },
          onKeyDown: aoTeclarNaAba("avaliacoes")
        }, "Avaliações")
      ),

      aba === "detalhes"
        ? h(Fragment, null,
            h(Detalhes, { jogo: jogo }),
            jogo.requisitos ? h(Requisitos, { requisitos: jogo.requisitos }) : null,
            h(Semelhantes, { jogos: listarSemelhantes(jogo) })
          )
        : h(Avaliacoes, { jogo: jogo }),

      h(ModalImagem, { imagem: imagemAberta, onFechar: function () { setImagemAberta(null); } }),
      jogo.midia && jogo.midia.video
        ? h(ModalVideo, {
            src: jogo.midia.video,
            aberto: videoAberto,
            videoPrincipal: videoPrincipal,
            onFechar: function () { setVideoAberto(false); }
          })
        : null,

      notificacao[0]
    );
  }

  var id = new URLSearchParams(global.location.search).get("id");
  var jogo = carregarJogo(id);

  if (!jogo) document.title = "Jogo não encontrado | IARA";

  global.ReactDOM.createRoot(container).render(
    jogo ? h(JogoPagina, { key: jogo.id, jogo: jogo }) : h(JogoNaoEncontrado)
  );
})(window);
