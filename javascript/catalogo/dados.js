(function (global) {
  "use strict";

  var COMPRA = "/games/compra.html";

  // Cada jogo aponta para a pagina de compra com o proprio id na URL
  function linkDoJogo(id) {
    return COMPRA + "?id=" + encodeURIComponent(id);
  }

  function aplicarLinks(jogos) {
    jogos.forEach(function (jogo) { jogo.href = linkDoJogo(jogo.id); });
  }

  var sugestoes = [
    { id: "odallus",  name: "Odallus the Dark Call", price: "R$ 10,00", img: "/imgs/produtos/sugestoes/UX/odallus.png" },
    { id: "toren",    name: "Toren",                 price: "R$ 20,00", img: "/imgs/produtos/sugestoes/UX/toren.png" },
    { id: "unsighted",name: "Unsighted",             price: "R$ 20,00", img: "/imgs/produtos/sugestoes/UX/unsighted.png" },
    { id: "horizon",  name: "Horizon Chase Turbo",   price: "R$ 50,00", img: "/imgs/produtos/sugestoes/UX/horizon.png" },
    { id: "arida",    name: "ÁRIDA",                 price: "R$ 25,00", img: "/imgs/produtos/sugestoes/UX/arida.png" }
  ];

  var adicionados = [
    { id: "eternal-cylinder", name: "The Eternal Cylinder",     price: "R$ 22,00", img: "/imgs/produtos/Adicionados Recentemente/1 the eternal cylinder.png" },
    { id: "relic-hunters",    name: "Relic Hunters Legend",     price: "R$ 17,00", img: "/imgs/produtos/Adicionados Recentemente/2 relic.png" },
    { id: "unsighted",        name: "Unsighted",                price: "R$ 20,00", img: "/imgs/produtos/Adicionados Recentemente/3 unsighted.png" },
    { id: "fobia",            name: "Fobia – St. Dinfna Hotel", price: "R$ 50,00", img: "/imgs/produtos/Adicionados Recentemente/fobia.png" },
    { id: "pocket-bravery",   name: "Pocket Bravery",           price: "R$ 50,00", img: "/imgs/produtos/Adicionados Recentemente/pocket.png" }
  ];

  var maisComprados = [
    { id: "odallus",    name: "Odallus the Dark Call",    price: "R$ 10,00", img: "/imgs/produtos/sugestoes/UX/odallus.png" },
    { id: "knights-2",  name: "Knights of Pen & Paper 2", price: "R$ 7,00",                          img: "/imgs/produtos/Mais Comprados/2 Knights.png" },
    { id: "dodgeball",  name: "Dodgeball Academia",       price: "R$ 70,00",                         img: "/imgs/produtos/Mais Comprados/3 Dodgeball.png" },
    { id: "dandy-ace",  name: "Dandy Ace",                price: "R$ 30,00",                         img: "/imgs/produtos/Mais Comprados/dandy.jpg" },
    { id: "kaze",       name: "Kaze and the Wild Masks",       price: "R$ 50,00",                         img: "/imgs/produtos/Mais Comprados/kaze.png" }
  ];

  var melhores = [
    { id: "kukoos",   name: "Kukoos Lost Pets",       price: "R$ 60,00",  img: "/imgs/produtos/melhores/UX/kukos.png" },
    { id: "toren",    name: "Toren",                  price: "R$ 20,00",  img: "/imgs/produtos/melhores/UX/Rectangle 300-1.png" },
    { id: "dandara",  name: "Dandara Trials Of Fear", price: "R$ 10,00",  img: "/imgs/produtos/melhores/UX/Rectangle 301.png" },
    { id: "mullet",   name: "Mullet MadJack",         price: "R$ 50,00",  img: "/imgs/produtos/melhores/UX/mullet.jpg" },
    { id: "midnight", name: "The Midnight Walk",      price: "R$ 100,00", img: "/imgs/produtos/melhores/UX/midnight.png" }
  ];

  var emAlta = {
    id: "aila",
    name: "A.I.L.A",
    price: "R$ 80,00",
    cover: "/imgs/produtos/em alta/aila.png",
    gif: "/gifs/aila.gif",
    description: "Survival horror em primeira pessoa do estúdio brasileiro Pulsatrix. Como testador de jogos, você recebe o kit de A.I.L.A, uma inteligência artificial que cria pesadelos a partir dos seus próprios medos, até o virtual parecer real." };

  var gratuito = {
    id: "relic-hunters-zero",
    name: "Relic Hunters Zero: Remix",
    price: "Gratuito",
    free: true,
    cover: "/imgs/produtos/gratuitos/relic.png",
    gif: "/gifs/relic.gif",
    description: "Um shooter roguelike 2D do estúdio mineiro Rogue Snail. Escolha um dos sete caçadores de relíquias da nave Spaceheart e atire, desvie e abra caminho contra o Império Ducan na corrida pelas relíquias lendárias." };

  var ofertas = [
    { id: "hazel-sky",     name: "Hazel Sky",        discount: "Economize 40%", oldPrice: "R$ 75,00", price: "R$ 45,00", img: "/imgs/produtos/ofertas/UX/Rectangle 300.png" },
    { id: "mark-of-deep",  name: "Mark Of The Deep", discount: "Economize 50%", oldPrice: "R$ 75,00", price: "R$ 45,00", img: "/imgs/produtos/ofertas/UX/Rectangle 300-1.png" },
    { id: "toggles",       name: "Togges",           discount: "Economize 75%", oldPrice: "R$ 75,00", price: "R$ 45,00", img: "/imgs/produtos/ofertas/UX/Rectangle 300-2.png" }
  ];

  var apenasBusca = [
    { id: "chroma-squad",        name: "Chroma Squad",                         price: "R$ 30,00", img: "/imgs/carrossel/chroma.jpg" },
    { id: "momodora",            name: "Momodora",            price: "R$ 20,00", img: "/imgs/carrossel/momodora.jpg" },
    { id: "no-place-for-bravery", name: "No Place For Bravery",                price: "R$ 40,00", img: "/imgs/destaques/bravery.jpg" },
    { id: "9-kings",             name: "9 Kings",                              price: "R$ 35,00", img: "/imgs/destaques/9kings.jpg" },
    { id: "enigma-do-medo",      name: "Enigma do Medo",                       price: "R$ 65,00", img: "/imgs/destaques/enigma.jpg" },
    { id: "retro-machina",       name: "Retro Machina",                        price: "R$ 42,49", img: "/games/img/retro.jpeg" },
    { id: "akane",               name: "Akane",                                price: "R$ 6,99",  img: "/games/img/akane.jpg" },
    { id: "hell-clock",          name: "Hell Clock",                           price: "R$ 37,99", img: "/games/img/clock.webp" }
  ];

  var sugeridosBusca = ["dandy-ace", "mullet", "relic-hunters", "kukoos"];

  [sugestoes, adicionados, maisComprados, melhores, ofertas, apenasBusca].forEach(aplicarLinks);
  aplicarLinks([emAlta, gratuito]);

  global.IaraCatalogo = global.IaraCatalogo || {};
  var dados = {
    produtos: [
      {
        key: "sugestoes",
        className: "display-jogos",
        blocos: [
          { id: "sugestoes", tipo: "grade", titulo: "Sugestões", subtitulo: "Jogos para você conhecer", jogos: sugestoes }
        ]
      },
      {
        key: "em-alta",
        className: "display-jogos vitrine",
        id: "em-alta",
        labelledBy: "alta-titulo",
        blocos: [
          { id: "em-alta", tipo: "destaque", titulo: "Em Alta", tituloId: "alta-titulo", icone: "fa-fire", subtitulo: "Os jogos mais populares do momento", jogo: emAlta }
        ]
      },
      {
        key: "listas",
        className: "display-jogos",
        blocos: [
          { id: "adicionados",    tipo: "grade", titulo: "Adicionados Recentemente", subtitulo: "Explore o que você não pode perder",  jogos: adicionados },
          { id: "mais-comprados", tipo: "grade", titulo: "Mais Comprados",           subtitulo: "Os favoritos da comunidade",          jogos: maisComprados },
          { id: "melhores",       tipo: "grade", titulo: "Melhores Avaliados",       subtitulo: "Jogos que Conquistaram os Jogadores", jogos: melhores }
        ]
      }
    ],

    ofertas: [
      {
        key: "ofertas",
        blocos: [
          { id: "ofertas", tipo: "ofertas", titulo: "Ofertas", subtitulo: "Descontos que estão esperando por você", ofertas: ofertas }
        ]
      }
    ],

    gratuitos: [
      {
        key: "gratuitos",
        className: "display-jogos vitrine",
        id: "gratuitos",
        labelledBy: "gratis-titulo",
        blocos: [
          { id: "gratuitos", tipo: "destaque", titulo: "Gratuitos", tituloId: "gratis-titulo", icone: "fa-gift", subtitulo: "Aproveite jogos incríveis sem gastar nada", jogo: gratuito }
        ]
      }
    ]
  };


  var regioes = ["produtos", "ofertas", "gratuitos"];

  function listarBlocos() {
    var blocos = [];
    regioes.forEach(function (regiao) {
      dados[regiao].forEach(function (secao) {
        secao.blocos.forEach(function (bloco) { blocos.push(bloco); });
      });
    });
    return blocos;
  }

  function encontrarBloco(id) {
    return listarBlocos().filter(function (bloco) { return bloco.id === id; })[0] || null;
  }

  function jogosDoBloco(bloco) {
    if (bloco.tipo === "destaque") {
      var j = bloco.jogo;
      return [{ id: j.id, name: j.name, price: j.price, img: j.cover, href: j.href, free: j.free, description: j.description }];
    }
    if (bloco.tipo === "ofertas") {
      return bloco.ofertas.map(function (o) {
        return { id: o.id, name: o.name, price: o.price, img: o.img, href: o.href };
      });
    }
    return bloco.jogos;
  }

  function listarJogos() {
    var vistos = {};
    var lista = [];
    var todos = [];

    listarBlocos().forEach(function (bloco) { todos = todos.concat(jogosDoBloco(bloco)); });
    todos = todos.concat(apenasBusca);

    todos.forEach(function (jogo) {
      if (vistos[jogo.id]) return;
      vistos[jogo.id] = true;
      lista.push(jogo);
    });
    return lista;
  }

  function listarSugeridosBusca() {
    var todos = listarJogos();
    return sugeridosBusca
      .map(function (id) { return todos.filter(function (jogo) { return jogo.id === id; })[0]; })
      .filter(Boolean);
  }

  // Categorias do menu: cada uma abre o catalogo filtrado (catalogo.html?categoria=<id>)
  var categorias = [
    { id: "acao",       nome: "Ação",       descricao: "Adrenalina e reflexo" },
    { id: "aventura",   nome: "Aventura",   descricao: "Mundos para explorar" },
    { id: "rpg",        nome: "RPG",        descricao: "Histórias e escolhas" },
    { id: "estrategia", nome: "Estratégia", descricao: "Planejamento e tática" }
  ];

  var categoriasDosJogos = {
    "odallus":              ["acao", "aventura"],
    "toren":                ["aventura"],
    "unsighted":            ["acao", "aventura", "rpg"],
    "horizon":              ["acao"],
    "arida":                ["aventura"],
    "aila":                 ["aventura"],
    "eternal-cylinder":     ["aventura"],
    "relic-hunters":        ["acao", "rpg"],
    "fobia":                ["aventura"],
    "pocket-bravery":       ["acao"],
    "knights-2":            ["rpg", "estrategia"],
    "dodgeball":            ["aventura", "rpg"],
    "dandy-ace":            ["acao"],
    "kaze":                 ["acao", "aventura"],
    "kukoos":               ["aventura"],
    "dandara":              ["acao", "aventura"],
    "mullet":               ["acao"],
    "midnight":             ["aventura"],
    "hazel-sky":            ["aventura"],
    "mark-of-deep":         ["acao", "aventura"],
    "toggles":              ["aventura"],
    "relic-hunters-zero":   ["acao"],
    "chroma-squad":         ["estrategia", "rpg"],
    "momodora":             ["acao", "aventura"],
    "no-place-for-bravery": ["acao", "rpg"],
    "9-kings":              ["estrategia"],
    "enigma-do-medo":       ["aventura"],
    "retro-machina":        ["acao", "aventura"],
    "akane":                ["acao"],
    "hell-clock":           ["acao", "rpg"]
  };

  function encontrarCategoria(id) {
    return categorias.filter(function (categoria) { return categoria.id === id; })[0] || null;
  }

  function jogosDaCategoria(id) {
    return listarJogos().filter(function (jogo) {
      return (categoriasDosJogos[jogo.id] || []).indexOf(id) !== -1;
    });
  }

  function encontrarJogo(id) {
    return listarJogos().filter(function (jogo) { return jogo.id === id; })[0] || null;
  }

  dados.categorias = categorias;
  dados.encontrarCategoria = encontrarCategoria;
  dados.jogosDaCategoria = jogosDaCategoria;
  dados.encontrarJogo = encontrarJogo;
  dados.linkDoJogo = linkDoJogo;
  dados.listarBlocos = listarBlocos;
  dados.encontrarBloco = encontrarBloco;
  dados.listarJogos = listarJogos;
  dados.listarSugeridosBusca = listarSugeridosBusca;

  global.IaraCatalogo.dados = dados;
})(window);
