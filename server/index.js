const path = require("path");
const crypto = require("crypto");
const express = require("express");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const { buscarJogo, RAIZ } = require("./catalogo");
const stripe = require("./stripe");

const PREFIXO_REFERENCIA = "iara";
const ID_SESSAO = /^cs_(test|live)_[A-Za-z0-9]{10,200}$/;

function configuracao() {
  const baseUrl = (process.env.BASE_URL || "http://localhost:" + (process.env.PORT || 3000)).replace(/\/+$/, "");
  return {
    chave: (process.env.STRIPE_SECRET_KEY || "").trim(),
    baseUrl: baseUrl
  };
}

function chaveValida(chave) {
  return /^(sk|rk)_(test|live)_/.test(chave);
}

function criarApp() {
  const app = express();
  app.disable("x-powered-by");
  app.use(express.json({ limit: "10kb" }));

  // ---------- API ----------

  // Cria o pagamento. O navegador envia so o id do jogo; nome e preco vem do catalogo do servidor.
  app.post("/api/checkout", async function (req, res) {
    const cfg = configuracao();

    if (!cfg.chave) {
      return res.status(500).json({
        erro: "O pagamento ainda não foi configurado no servidor (falta o STRIPE_SECRET_KEY em server/.env)."
      });
    }
    if (!chaveValida(cfg.chave)) {
      return res.status(500).json({
        erro: "O STRIPE_SECRET_KEY em server/.env não parece uma chave secreta da Stripe (ela começa com sk_test_)."
      });
    }

    const jogo = buscarJogo(req.body && req.body.jogoId);
    if (!jogo) return res.status(404).json({ erro: "Jogo não encontrado." });
    if (jogo.gratuito || !jogo.preco || jogo.preco <= 0) {
      return res.status(400).json({ erro: "Este jogo é gratuito e não precisa de pagamento." });
    }

    const retorno = cfg.baseUrl + "/games/resultado.html?jogo=" + encodeURIComponent(jogo.id);

    const sessao = {
      mode: "payment",
      locale: "pt-BR",
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "brl",
          unit_amount: Math.round(jogo.preco * 100),
          product_data: { name: jogo.nome }
        }
      }],
      // {CHECKOUT_SESSION_ID} e trocado pela propria Stripe ao redirecionar
      success_url: retorno + "&resultado=sucesso&session_id={CHECKOUT_SESSION_ID}",
      cancel_url: retorno + "&resultado=falha",
      client_reference_id: PREFIXO_REFERENCIA + ":" + jogo.id + ":" + crypto.randomUUID(),
      metadata: { jogo: jogo.id }
    };

    try {
      const criada = await stripe.criarSessao(sessao, cfg.chave);
      if (!criada || !criada.url) throw new Error("A resposta da Stripe não trouxe o link de pagamento.");
      res.json({ url: criada.url, sessaoId: criada.id });
    } catch (erro) {
      console.error("[checkout] Falha ao criar a sessão:", erro.status || "", erro.message);
      res.status(502).json({ erro: "Não foi possível iniciar o pagamento na Stripe. Tente novamente." });
    }
  });

  // Confere na Stripe o status real de um pagamento (a pagina de retorno nao confia na URL).
  app.get("/api/pagamento/:id", async function (req, res) {
    const cfg = configuracao();

    if (!ID_SESSAO.test(req.params.id)) return res.status(400).json({ erro: "Código do pagamento inválido." });
    if (!cfg.chave) return res.status(500).json({ erro: "O pagamento ainda não foi configurado no servidor." });

    try {
      const sessao = await stripe.buscarSessao(req.params.id, cfg.chave);
      const partes = String(sessao.client_reference_id || "").split(":");
      const veioDaLoja = partes[0] === PREFIXO_REFERENCIA && !!partes[1];

      if (!veioDaLoja) return res.status(404).json({ erro: "Pagamento não encontrado." });

      res.json({
        id: sessao.id,
        // paid | unpaid | no_payment_required
        status: sessao.payment_status,
        // open | complete | expired
        sessao: sessao.status,
        jogoId: partes[1],
        valor: typeof sessao.amount_total === "number" ? sessao.amount_total / 100 : null
      });
    } catch (erro) {
      if (erro.status === 404) return res.status(404).json({ erro: "Pagamento não encontrado." });
      console.error("[pagamento] Falha ao consultar o pagamento:", erro.status || "", erro.message);
      res.status(502).json({ erro: "Não foi possível consultar o pagamento agora." });
    }
  });

  app.use("/api", function (req, res) {
    res.status(404).json({ erro: "Rota não encontrada." });
  });

  // ---------- site ----------

  // O codigo do servidor, as dependencias e o .env nunca sao entregues pelo site
  app.use(function (req, res, next) {
    if (/^\/(server|node_modules|package(-lock)?\.json)(\/|$)/i.test(req.path) || /\/\./.test(req.path)) {
      return res.status(404).end();
    }
    next();
  });

  app.use(express.static(RAIZ, { dotfiles: "ignore" }));

  return app;
}

if (require.main === module) {
  const porta = Number(process.env.PORT) || 3000;
  const cfg = configuracao();

  criarApp().listen(porta, function () {
    console.log("IARA Games rodando em http://localhost:" + porta);
    if (!cfg.chave) console.warn("Atenção: STRIPE_SECRET_KEY não configurado. O botão Comprar não vai funcionar (veja server/.env.example).");
    else if (!chaveValida(cfg.chave)) console.warn("Atenção: o STRIPE_SECRET_KEY não parece uma chave secreta da Stripe (deve começar com sk_test_).");
    else if (/^(sk|rk)_live_/.test(cfg.chave)) console.warn("Atenção: você está usando uma chave de PRODUÇÃO da Stripe. Para testes, use a chave sk_test_.");
  });
}

module.exports = { criarApp };
