// Le o catalogo do site (javascript/catalogo/dados.js) para que o servidor use sempre o preco
// oficial do jogo, e nunca um valor enviado pelo navegador.
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const RAIZ = path.resolve(__dirname, "..");

function carregarDados() {
  const codigo = fs.readFileSync(path.join(RAIZ, "javascript", "catalogo", "dados.js"), "utf8");
  const contexto = {};
  contexto.window = contexto;
  vm.createContext(contexto);
  vm.runInContext(codigo, contexto);
  return contexto.IaraCatalogo.dados;
}

const dados = carregarDados();

// "R$ 1.234,56" -> 1234.56 | "Gratuito" -> null
function precoEmNumero(texto) {
  const encontrado = /(\d[\d.]*,\d{2})/.exec(String(texto || ""));
  if (!encontrado) return null;
  const numero = Number(encontrado[1].replace(/\./g, "").replace(",", "."));
  return Number.isFinite(numero) ? numero : null;
}

function buscarJogo(id) {
  const jogo = typeof id === "string" ? dados.encontrarJogo(id) : null;
  if (!jogo) return null;

  const preco = precoEmNumero(jogo.price);
  return {
    id: jogo.id,
    nome: jogo.name,
    preco: preco,
    gratuito: !!jogo.free || /gratuit/i.test(jogo.price || "") || preco === 0
  };
}

module.exports = { buscarJogo, precoEmNumero, RAIZ };
