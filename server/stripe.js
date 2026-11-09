// Chamadas minimas a API da Stripe (sem SDK, usando o fetch do Node 18+).
const API = "https://api.stripe.com/v1";

// A Stripe espera os dados como formulario, com colchetes para objetos e listas:
// { line_items: [{ quantity: 1 }] } vira line_items[0][quantity]=1
function codificar(objeto, prefixo, partes) {
  partes = partes || [];

  Object.keys(objeto).forEach(function (chave) {
    const valor = objeto[chave];
    if (valor === undefined || valor === null) return;

    const nome = prefixo ? prefixo + "[" + chave + "]" : chave;

    if (Array.isArray(valor)) {
      valor.forEach(function (item, indice) {
        const nomeItem = nome + "[" + indice + "]";
        if (item !== null && typeof item === "object") codificar(item, nomeItem, partes);
        else partes.push([nomeItem, String(item)]);
      });
    } else if (typeof valor === "object") {
      codificar(valor, nome, partes);
    } else {
      partes.push([nome, String(valor)]);
    }
  });

  return partes;
}

async function chamar(caminho, opcoes) {
  const corpo = opcoes.corpo ? new URLSearchParams(codificar(opcoes.corpo)).toString() : undefined;

  const resposta = await fetch(API + caminho, {
    method: opcoes.metodo || "GET",
    headers: {
      Authorization: "Bearer " + opcoes.chave,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: corpo
  });

  const texto = await resposta.text();
  let json = null;
  try { json = JSON.parse(texto); } catch (erro) { json = null; }

  if (!resposta.ok) {
    const mensagem = json && json.error && json.error.message;
    const erro = new Error(mensagem || "A Stripe respondeu " + resposta.status);
    erro.status = resposta.status;
    erro.detalhe = json && json.error;
    throw erro;
  }
  return json;
}

function criarSessao(sessao, chave) {
  return chamar("/checkout/sessions", { metodo: "POST", corpo: sessao, chave: chave });
}

function buscarSessao(id, chave) {
  return chamar("/checkout/sessions/" + encodeURIComponent(id), { chave: chave });
}

module.exports = { criarSessao, buscarSessao, codificar };
