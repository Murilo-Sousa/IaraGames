(function (global) {
  "use strict";

  if (!global.React || !global.ReactDOM) {
    console.error("IARA: React/ReactDOM não foram carregados; a página de pagamento não será exibida.");
    return;
  }

  var container = document.querySelector("[data-pagina-resultado]");
  if (!container) return;

  var React = global.React;
  var h = React.createElement;
  var useState = React.useState;
  var useEffect = React.useEffect;

  var dados = global.IaraCatalogo.dados;
  var API = global.IARA_API || "";

  var parametros = new URLSearchParams(global.location.search);
  var idPagamento = parametros.get("session_id") || "";
  var jogoDaUrl = parametros.get("jogo") || "";

  // Estados da tela: verificando | aprovado | pendente | recusado | indisponivel
  function estadoPelaUrl() {
    var resultado = parametros.get("resultado");
    if (resultado === "falha") return "recusado";
    if (resultado === "pendente") return "pendente";
    return "indisponivel";
  }

  // pagamento.status: paid | unpaid | no_payment_required
  // pagamento.sessao: open | complete | expired
  function estadoPeloPagamento(pagamento) {
    if (pagamento.status === "paid" || pagamento.status === "no_payment_required") return "aprovado";
    if (pagamento.sessao === "complete") return "pendente";
    return "recusado";
  }

  var TELAS = {
    verificando: {
      icone: "fa-solid fa-spinner fa-spin",
      titulo: "Confirmando seu pagamento...",
      texto: "Estamos conferindo o status com a Stripe. Isso leva só um instante."
    },
    aprovado: {
      icone: "fa-solid fa-circle-check",
      classe: "is-sucesso",
      titulo: "Pagamento aprovado!",
      texto: "Obrigado pela compra. Guarde o código do pedido abaixo para qualquer dúvida."
    },
    pendente: {
      icone: "fa-solid fa-clock",
      titulo: "Pagamento em análise",
      texto: "Assim que a Stripe confirmar o pagamento, a compra será concluída. Alguns meios de pagamento levam um pouco mais de tempo."
    },
    recusado: {
      icone: "fa-solid fa-circle-xmark",
      classe: "is-falha",
      titulo: "Pagamento não concluído",
      texto: "O pagamento foi recusado ou cancelado. Você pode tentar de novo com outra forma de pagamento."
    },
    indisponivel: {
      icone: "fa-solid fa-circle-question",
      titulo: "Não conseguimos confirmar o pagamento",
      texto: "Se você chegou a pagar, abra esta página de novo em alguns instantes. Caso contrário, é só tentar novamente pela página do jogo."
    }
  };

  function Resultado() {
    var estadoInicial = idPagamento ? "verificando" : estadoPelaUrl();
    var estado = useState(estadoInicial);
    var situacao = estado[0];
    var setSituacao = estado[1];
    var jogoEstado = useState(jogoDaUrl);
    var jogoId = jogoEstado[0];
    var setJogoId = jogoEstado[1];

    // O status vem sempre da Stripe (via servidor), nao do que esta escrito na URL
    useEffect(function () {
      if (!idPagamento) return;

      var ativo = true;

      fetch(API + "/api/pagamento/" + encodeURIComponent(idPagamento))
        .then(function (resposta) {
          return resposta.json().then(function (corpo) {
            if (!resposta.ok) throw new Error(corpo.erro || "Falha ao consultar o pagamento.");
            return corpo;
          });
        })
        .then(function (pagamento) {
          if (!ativo) return;
          setSituacao(estadoPeloPagamento(pagamento));
          if (pagamento.jogoId) setJogoId(pagamento.jogoId);
        })
        .catch(function () {
          if (ativo) setSituacao("indisponivel");
        });

      return function () { ativo = false; };
    }, []);

    var jogo = jogoId ? dados.encontrarJogo(jogoId) : null;
    var tela = TELAS[situacao];
    var linkJogo = jogo ? dados.linkDoJogo(jogo.id) : "/catalogo.html";

    useEffect(function () {
      document.title = tela.titulo.replace("...", "") + " | IARA";
    }, [situacao]);

    return h("main", { className: "resultado" },
      h("section", { className: "resultado-card", "aria-live": "polite" },
        h("i", { className: "resultado-icone " + (tela.classe || "") + " " + tela.icone, "aria-hidden": "true" }),
        h("h1", { className: "resultado-titulo" }, tela.titulo),
        h("p", { className: "resultado-texto" }, tela.texto),

        jogo
          ? h("div", { className: "resultado-jogo" },
              h("img", { src: jogo.img, alt: "" }),
              h("div", null,
                h("strong", null, jogo.name),
                jogo.price ? h("span", null, jogo.price) : null
              )
            )
          : null,

        idPagamento && situacao !== "verificando"
          ? h("p", { className: "resultado-codigo" }, "Código do pedido: " + idPagamento)
          : null,

        situacao !== "verificando"
          ? h("div", { className: "resultado-acoes" },
              situacao === "recusado" || situacao === "indisponivel"
                ? h("a", { className: "resultado-botao is-principal", href: linkJogo }, jogo ? "Tentar novamente" : "Ver o catálogo")
                : h("a", { className: "resultado-botao is-principal", href: "/index.html" }, "Voltar para a loja"),
              situacao === "recusado" || situacao === "indisponivel"
                ? h("a", { className: "resultado-botao", href: "/index.html" }, "Voltar para a loja")
                : h("a", { className: "resultado-botao", href: "/catalogo.html" }, "Ver mais jogos")
            )
          : null
      )
    );
  }

  global.ReactDOM.createRoot(container).render(h(Resultado));
})(window);
