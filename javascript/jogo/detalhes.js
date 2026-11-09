(function (global) {
  "use strict";

  // Detalhes extras de cada jogo, indexados pelo mesmo id usado em catalogo/dados.js.
  // Nome, preco e capa vem do catalogo; aqui entra so o que a pagina do jogo precisa a mais.
  // Todo campo e opcional: a pagina esconde o bloco quando o dado nao existe.
  //
  // Campos aceitos:
  //   cover, tags[], descricao, sobre[] (paragrafos), desenvolvedor, lancamento, tamanho,
  //   nota, totalAvaliacoes, midia { video, imagens[] }, requisitos { minimos[], recomendados[] },
  //   similares[{ id?, name, price, img }], avaliacoes[]

  var AVATARES = {
    "Lucas": "bidu", "Mariana": "magali", "Rafael": "cebolinha", "André": "chico",
    "Beatriz": "monica", "Gustavo": "cascao", "Pedro": "franjinha", "Thiago": "monicao",
    "Felipe": "xaveco", "Carol": "monica", "Bruna": "magali", "Davi": "cascao",
    "Larissa": "magali", "Henrique": "xaveco", "Julia": "monica", "Vinícius": "cebolinha",
    "Camila": "monica", "Rodrigo": "franjinha", "Fernanda": "magali", "Gabriel": "chico",
    "Leandro": "monicao", "Isabela": "monica", "Mateus": "bidu", "Renata": "magali",
    "Bruno": "cascao", "Aline": "monica", "Diego": "xaveco", "Patrícia": "magali",
    "Caio": "cebolinha", "Sofia": "monica"
  };

  // Monta uma avaliacao: o avatar vem do nome do usuario
  function rev(usuario, nota, data, positivos, negativos, texto) {
    return {
      usuario: usuario,
      avatar: "/imgs/preferencias/" + AVATARES[usuario] + ".jpg",
      nota: nota,
      data: data,
      positivos: positivos,
      negativos: negativos,
      texto: texto
    };
  }

  // Monta a lista de requisitos, pulando o que nao foi informado
  function req(so, cpu, ram, gpu, dx, disco, nota) {
    return [
      ["Sistema operacional", so],
      ["Processador", cpu],
      ["Memória", ram],
      ["Placa de vídeo", gpu],
      ["DirectX", dx],
      ["Armazenamento", disco],
      ["Observação", nota]
    ].filter(function (item) { return item[1]; });
  }

  var detalhes = {
    "dandy-ace": {
      cover: "/games/img/capa.webp",
      tags: ["Ação", "Isométrico", "Rogue-Like"],
      desenvolvedor: "Mad Mimic",
      lancamento: "28/09/2021",
      tamanho: "1.53 GB",
      nota: 4,
      totalAvaliacoes: 1421,
      descricao: "Dandy Ace é um jogo de ação extravagante, que segue um fabuloso mágico buscando combinar e usar suas cartas mágicas.",
      sobre: [
        "Dandy Ace é um roguelike com uma experiência de combate dinâmico e extravagante que segue um mágico fabuloso buscando combinar e usar suas cartas mágicas enquanto luta e saqueia para derrotar o Ilusionista de olhos verdes, Lele, que o aprisionou em um espelho amaldiçoado.",
        "Enquanto batalha pelo palácio que sempre muda de Lele, combine diferentes cartas com mais de mil possibilidades, cada uma com seus próprios estilos de jogo e poderes.",
        "Cada partida oferece novos desafios e combinações para os jogadores explorarem à medida que chegam mais perto de Lele.",
        "Jogue como Dandy Ace, o incrível herói, e sobreviva aos desafios do palácio extravagante, luxuoso e em constante mudança criado para derrotá-lo, cheio de criaturas bizarras e chefes ultrajantes. Encontre todas as cartas mágicas, reúna fragmentos de espelho e ouro e obtenha ajuda de seus assistentes e aliados não convencionais."
      ],
      midia: {
        video: "/games/video/gameplay.mp4",
        imagens: [
          "/games/img/gameplay1.jpg",
          "/games/img/gameplay2.jpg",
          "/games/img/gameplay3.jpg",
          "/games/img/gameplay4.jpg",
          "/games/img/gameplay5.jpg",
          "/games/img/gameplay6.jpg",
          "/games/img/gameplay7.jpg",
          "/games/img/gameplay8.jpg",
          "/games/img/gameplay9.jpg",
          "/games/img/gameplay10.jpg"
        ]
      },
      requisitos: {
        minimos: [
          ["Sistema operacional", "Windows 7+"],
          ["Processador", "Intel i5+"],
          ["Memória", "2 GB de RAM"],
          ["Placa de vídeo", "Nvidia 450 GTS / Radeon HD 5750 or better"],
          ["DirectX", "Versão 9.0"],
          ["Armazenamento", "3 GB de espaço disponível"]
        ],
        recomendados: [
          ["Sistema operacional", "Windows 10"],
          ["Processador", "Intel i5+"],
          ["Memória", "4 GB de RAM"],
          ["Placa de vídeo", "Nvidia GTX 460 / Radeon HD 7800 or better"],
          ["DirectX", "Versão 9.0"],
          ["Armazenamento", "3 GB de espaço disponível"]
        ]
      },
      similares: [
        { id: "unsighted",     name: "Unsighted",             price: "R$ 20,00", img: "/games/img/unsighted.jpeg" },
        { id: "retro-machina", name: "Retro Machina",         price: "R$ 42,49", img: "/games/img/retro.jpeg" },
        { id: "akane",         name: "Akane",                 price: "R$ 6,99",  img: "/games/img/akane.jpg" },
        { id: "relic-hunters", name: "Relic Hunters: Legend", price: "R$ 17,00", img: "/games/img/relic.jpeg" },
        { id: "hell-clock",    name: "Hell Clock",            price: "R$ 37,99", img: "/games/img/clock.webp" }
      ],
      avaliacoes: [
        {
          usuario: "Lucas", avatar: "/imgs/preferencias/bidu.jpg", nota: 5, data: "Há 2 dias", positivos: 24, negativos: 2,
          texto: [
            "Viciei feio nisso aqui, papo reto",
            "comecei só pra testar e quando vi já tava horas tentando fazer build diferente com as cartas, sempre aparece alguma combinação quebrada que muda totalmente o jeito de jogar",
            "o jogo é rápido, bonito, a trilha encaixa bem e o combate é gostoso demais de ficar spammando até dar tudo certo",
            "não é nem questão de ser perfeito, é só muito divertido mesmo. aquele tipo de jogo que você fala “só mais uma run” e perde a noite"
          ]
        },
        {
          usuario: "Mariana", avatar: "/imgs/preferencias/magali.jpg", nota: 3, data: "Há 1 semana", positivos: 18, negativos: 1,
          texto: [
            "Dandy Ace até tenta ser estiloso, mas o jogo não te puxa muito. A história é meio whatever, os personagens não grudam e eu não senti muita vontade de continuar avançando, mesmo com a gameplay funcionando.",
            "Não é um jogo ruim, só falta aquele “gancho” que faz você pensar “só mais uma run”. Acabei largando sem nem perceber."
          ]
        },
        {
          usuario: "Rafael", avatar: "/imgs/preferencias/cebolinha.jpg", nota: 4, data: "Há 2 semanas", positivos: 31, negativos: 4,
          texto: [
            "Dandy Ace é bem gostosinho de jogar. O sistema de cartas deixa cada run diferente e dá vontade de testar combinações novas o tempo todo.",
            "O problema é que depois de algumas horas começa a ficar meio repetitivo, e não tem o mesmo impacto que outros roguelikes maiores.",
            "Mesmo assim, tem estilo, é divertido e vale a pena, ainda mais sendo BR."
          ]
        },
        {
          usuario: "André", avatar: "/imgs/preferencias/chico.jpg", nota: 5, data: "Há 1 mês", positivos: 42, negativos: 3,
          texto: [
            "Excelente jogo para passar algumas horas. A mistura de ação, exploração e cartas funciona muito bem."
          ]
        }
      ]
    },

    // Detalhes pesquisados nas paginas oficiais e lojas de cada jogo (desenvolvedora, lancamento,
    // espaco em disco e requisitos de PC). As notas e as avaliacoes dos usuarios sao ficticias.

    "odallus": {
      tags: ["Metroidvania", "Ação", "Retrô"],
      desenvolvedor: "JoyMasher",
      lancamento: "15/07/2015",
      tamanho: "100 MB",
      nota: 4.4,
      totalAvaliacoes: 1286,
      descricao: "Metroidvania em 8 bits inspirado em Ghosts'n Goblins, Demon's Crest e Castlevania, em que um guerreiro cansado de lutar volta a empunhar a espada para resgatar o filho das trevas.",
      sobre: [
        "Os antigos deuses esqueceram esta terra, e a escuridão avança recolhendo almas humanas para o seu exército. Odallus: The Dark Call é um jogo clássico de exploração e ação que bebe em Ghosts'n Goblins, Demon's Crest e Castlevania.",
        "Você controla Haggis, um guerreiro cansado das batalhas que precisa pegar a espada mais uma vez para salvar o filho.",
        "São oito fases abertas à exploração, chefes enormes, mais de 50 tipos de inimigos, gráficos retrô de 8 bits e mais de 8 horas de jogo. Ao terminar a campanha, você libera o Modo Veterano, bem mais difícil."
      ],
      requisitos: {
        minimos: req("Windows Vista", "Intel Core 2 Duo 2.1 GHz ou equivalente", "2 GB de RAM", "256 MB de VRAM dedicada", "Versão 9.0", "100 MB de espaço disponível")
      },
      avaliacoes: [
        rev("Lucas", 5, "Há 3 dias", 31, 1, ["Dificuldade na medida certa, daquelas que te fazem querer tentar de novo.", "Os gráficos de 8 bits e a trilha lembram demais os jogos de console da infância, e os chefes são enormes e muito bem desenhados."]),
        rev("Mariana", 4, "Há 2 semanas", 17, 2, ["Gostei bastante do clima sombrio e da exploração. A movimentação é meio dura em alguns trechos, mas nada que estrague a experiência."]),
        rev("Rafael", 5, "Há 1 mês", 24, 0, ["Joguei até o fim em dois dias. O Modo Veterano é para quem gosta de sofrer, recomendo muito."])
      ]
    },

    "toren": {
      tags: ["Aventura", "Fantasia", "Quebra-cabeças"],
      desenvolvedor: "Swordtales",
      lancamento: "12/05/2015",
      tamanho: "3 GB",
      nota: 3.6,
      totalAvaliacoes: 842,
      descricao: "Aventura de fantasia sombria e quebra-cabeças em que Moonchild precisa escalar a misteriosa torre Toren, numa jornada solitária em busca do seu propósito.",
      sobre: [
        "Toren é a primeira aventura da desenvolvedora brasileira Swordtales, com clima de conto de fadas poético e um mundo misterioso e atemporal.",
        "Você é Moonchild, uma jovem destinada a subir a torre conhecida como Toren, em uma jornada solitária e cheia de desafios, puzzles e criaturas.",
        "A campanha é curta, algo em torno de 2 a 3 horas, e foi lançada para PC e PlayStation 4."
      ],
      requisitos: {
        minimos: req("Windows 7 ou 8", "Dual core de 2 GHz", "2 GB de RAM", "Intel HD 3000 ou GeForce GT 8600", "Versão 9.0c", "3 GB de espaço disponível"),
        recomendados: req("Windows 7 ou 8.1", "Intel Core i5-750 ou AMD Phenom II X4 955", "4 GB de RAM", "GeForce GTX 480 ou Radeon HD 5870 (1 GB de VRAM)", "Versão 11", "3 GB de espaço disponível")
      },
      avaliacoes: [
        rev("Beatriz", 4, "Há 5 dias", 14, 3, ["A direção de arte é linda e a história tem um clima de conto de fadas bem diferente. Dá para zerar em uma tarde."]),
        rev("Gustavo", 3, "Há 3 semanas", 9, 4, ["Tem boas ideias, mas as mecânicas ficam repetitivas e o final me deixou com vontade de mais. Ainda assim, vale pela atmosfera."]),
        rev("Thiago", 4, "Há 2 meses", 11, 2, ["Bem curtinho, só que marcante. Jogo para quem gosta de explorar com calma e sem pressa."])
      ]
    },

    "unsighted": {
      tags: ["Metroidvania", "Ação RPG", "Pixel art"],
      desenvolvedor: "Studio Pixel Punk",
      lancamento: "30/09/2021",
      tamanho: "1.5 GB",
      nota: 4.7,
      totalAvaliacoes: 2310,
      descricao: "Ação e exploração em pixel art numa metrópole cyberpunk, em que cada momento conta e você decide quem salvar antes que o tempo acabe.",
      sobre: [
        "UNSIGHTED é um RPG de ação com visual pixel art colorido, estreia do Studio Pixel Punk, estúdio brasileiro. A história se passa em Arcadia, uma cidade cyberpunk habitada por autômatos.",
        "Você controla Alma, uma andróide, e o tempo está correndo: cada momento importa, e é você quem decide quem vai salvar e quem vai deixar virar um Unsighted.",
        "Há muitas armas, de corpo a corpo até ataques à distância, exploração não linear e a possibilidade de jogar sozinho ou em cooperativo. Além da história, tem os modos Boss Rush e Dungeon Raid."
      ],
      requisitos: {
        minimos: req("Windows 7", "Intel Core 2 Duo E6750", "4 GB de RAM", "GeForce 8800 GT (512 MB) ou Radeon 4870 (512 MB)", "Versão 10", "1500 MB de espaço disponível")
      },
      avaliacoes: [
        rev("Carol", 5, "Há 2 dias", 52, 1, ["Que jogo incrível. A história me pegou de jeito e o combate é muito bom, cada arma tem sua graça.", "A pressão do tempo deixa tudo mais tenso, e eu ainda assim quis explorar cada cantinho."]),
        rev("Pedro", 5, "Há 1 semana", 38, 2, ["Metroidvania brasileiro que merece muito mais atenção. A trilha e a arte são lindas e o co-op é um bônus enorme."]),
        rev("Bruna", 4, "Há 1 mês", 21, 3, ["Adorei, mas o sistema de tempo pode estressar no começo. Depois que você pega o ritmo, o jogo flui bem."])
      ]
    },

    "horizon": {
      tags: ["Corrida", "Arcade", "Retrô"],
      desenvolvedor: "Aquiris Game Studio",
      lancamento: "15/05/2018",
      tamanho: "800 MB",
      nota: 4.6,
      totalAvaliacoes: 1975,
      descricao: "Corrida arcade inspirada nos clássicos dos anos 80 e 90, com visual da era 16 bits e trilha de Barry Leitch.",
      sobre: [
        "Horizon Chase Turbo é um jogo de corrida arcade inspirado em clássicos como Out Run, Lotus Turbo Challenge e Top Gear, direto e cheio de velocidade.",
        "O visual lembra a geração 16 bits sem deixar de ser moderno, e a trilha é assinada por Barry Leitch, compositor de Lotus Turbo Challenge, Top Gear e Rush.",
        "Tem multiplayer local com tela dividida em todos os modos, modo fantasma competitivo online e rankings entre amigos e global."
      ],
      requisitos: {
        minimos: req("Windows 7 ou superior", "Intel Core 2 Duo 2.0 GHz ou melhor", "2 GB de RAM", "Intel HD Graphics 4000 ou melhor", "Versão 9.0c", "800 MB de espaço disponível")
      },
      avaliacoes: [
        rev("Davi", 5, "Há 4 dias", 44, 1, ["Nostalgia pura. Parece que eu voltei para as tardes de Top Gear no console, só que com gráficos lindos e uma trilha sensacional."]),
        rev("Larissa", 5, "Há 2 semanas", 27, 0, ["Jogo com os amigos na tela dividida e a gente passa horas sem perceber. Simples de aprender e difícil de largar."]),
        rev("Henrique", 4, "Há 1 mês", 15, 2, ["Muito divertido, só achei algumas pistas repetitivas depois de um tempo. Mesmo assim, ótimo custo-benefício."])
      ]
    },

    "arida": {
      tags: ["Aventura", "Sobrevivência", "Narrativa"],
      desenvolvedor: "Aoca Game Lab",
      lancamento: "15/08/2019",
      tamanho: "2 GB",
      nota: 4.4,
      totalAvaliacoes: 693,
      descricao: "Aventura narrativa com exploração e sobrevivência no sertão brasileiro do século XIX, acompanhando a jovem Cícera em meio à seca.",
      sobre: [
        "ÁRIDA: Backland's Awakening é uma aventura focada na história, com elementos de exploração e sobrevivência, ambientada no sertão brasileiro do século XIX.",
        "Você acompanha Cícera, uma jovem que precisa enfrentar a seca para explorar as regiões mais áridas, juntar recursos, criar itens, ajudar os moradores e descobrir pistas sobre o paradeiro dos pais.",
        "É o primeiro de três jogos sobre a jornada da personagem, com visual pintado à mão e um elenco de sertanejos com diálogos marcantes."
      ],
      requisitos: {
        minimos: req("Windows 8", "Dual core de 2.6 GHz", "6 GB de RAM", "GeForce GTX 750 Ti", "Versão 11", "2 GB de espaço disponível")
      },
      avaliacoes: [
        rev("Fernanda", 5, "Há 1 semana", 29, 0, ["Que delícia ver o sertão contado assim, com tanto carinho. Os personagens e a arte feita à mão são o ponto alto."]),
        rev("Gabriel", 4, "Há 3 semanas", 16, 1, ["A história é bonita e emocionante. O ritmo é calmo, então vale ir sem pressa e curtir o caminho."]),
        rev("Isabela", 4, "Há 2 meses", 12, 2, ["Esperava um pouco mais de desafio na sobrevivência, mas o clima e a ambientação compensam bastante."])
      ]
    },

    "aila": {
      tags: ["Terror", "Primeira pessoa", "Sobrevivência"],
      desenvolvedor: "Pulsatrix Studios",
      lancamento: "25/11/2025",
      tamanho: "35 GB",
      nota: 4.0,
      totalAvaliacoes: 1104,
      descricao: "Terror em primeira pessoa em que você testa os cenários de uma IA que usa os seus maiores medos para criar pesadelos.",
      sobre: [
        "A.I.L.A é um jogo de terror em primeira pessoa num futuro próximo cheio de tecnologia imersiva. Você é o único testador de uma inteligência artificial fictícia revolucionária.",
        "Cada teste leva a um cenário de horror diferente, como hospitais abandonados e rituais de culto, criados para explorar seus maiores medos, enquanto a linha entre o virtual e o real vai desaparecendo.",
        "Também há quebra-cabeças para exercitar a mente. Foi feito pela Pulsatrix Studios, de São Paulo, mesma equipe de Fobia St. Dinfna Hotel, com Unreal Engine 5."
      ],
      requisitos: {
        minimos: req("Windows 10 (64 bits)", "Intel Core i5-10600K ou AMD Ryzen 5 2600", "16 GB de RAM", "GeForce GTX 1660 Ti (6 GB) ou Radeon RX Vega 64 (8 GB)", null, "35 GB de espaço disponível"),
        recomendados: req("Windows 11 (64 bits)", "Intel Core i7-12700K ou AMD Ryzen 7 5800X3D", "16 GB de RAM", "GeForce RTX 3070 (8 GB) ou Radeon RX 6800 (16 GB)", null, "35 GB de espaço disponível")
      },
      avaliacoes: [
        rev("Rodrigo", 4, "Há 3 dias", 33, 4, ["Dei uns bons sustos. A ideia de cenários diferentes a cada teste deixa tudo imprevisível, e os gráficos são muito bons."]),
        rev("Camila", 5, "Há 1 semana", 26, 1, ["Terror brasileiro de primeira. Os puzzles estão bem encaixados e o clima de tensão não larga um segundo."]),
        rev("Vinícius", 3, "Há 3 semanas", 13, 5, ["Bonito e assustador, mas alguns trechos são meio repetitivos e o jogo pede um PC mais parrudo para rodar bem."])
      ]
    },

    "eternal-cylinder": {
      tags: ["Sobrevivência", "Mundo aberto", "Aventura"],
      desenvolvedor: "ACE Team",
      lancamento: "13/10/2022",
      tamanho: "9 GB",
      nota: 4.2,
      totalAvaliacoes: 588,
      descricao: "Sobrevivência de mundo aberto surreal em que você evolui por mutações enquanto foge de um cilindro gigante que esmaga tudo.",
      sobre: [
        "The Eternal Cylinder é um jogo de aventura e sobrevivência em mundo aberto, surreal e cheio de criaturas estranhas, criado pelos chilenos da ACE Team, de Zeno Clash e Rock of Ages.",
        "Você nasce como um Trebhum, criatura que evolui por mutações, em um planeta perigoso onde um enorme cilindro antigo esmaga tudo pelo caminho.",
        "Descubra dezenas de mutações para superar quebra-cabeças, explorar novos biomas e sobreviver. A campanha leva cerca de 12 horas."
      ],
      requisitos: {
        minimos: req("Windows 7 (64 bits)", "Intel Core i5-4460 3.2 GHz", "8 GB de RAM", "GeForce GTX 770 (2 GB)", "Versão 11", "9 GB de espaço disponível"),
        recomendados: req("Windows 10 (64 bits)", "Intel Core i5-7600", "16 GB de RAM", null, "Versão 11", null)
      },
      avaliacoes: [
        rev("Mateus", 5, "Há 6 dias", 22, 1, ["Nunca vi nada igual. O mundo é estranho e lindo ao mesmo tempo, e as mutações dão muita liberdade para resolver os problemas."]),
        rev("Renata", 4, "Há 2 semanas", 15, 2, ["Muito criativo. Dá um pouco de dor de cabeça no início para entender as mecânicas, mas depois fica viciante."]),
        rev("Bruno", 4, "Há 1 mês", 10, 3, ["Ideia genial e direção de arte única. Só senti falta de um pouco mais de orientação no começo."])
      ]
    },

    "relic-hunters": {
      tags: ["Looter shooter", "Ação", "Cooperativo"],
      desenvolvedor: "Rogue Snail",
      lancamento: "14/08/2025",
      tamanho: "4 GB",
      nota: 4.1,
      totalAvaliacoes: 1432,
      descricao: "Looter shooter RPG de visão superior, rápido e cheio de loot, para jogar sozinho ou em cooperativo de até 4 jogadores.",
      sobre: [
        "Relic Hunters Legend é um looter shooter RPG de visão superior, da Rogue Snail, estúdio brasileiro, em que você coleta armas poderosas, melhora habilidades e enfrenta inimigos em combates intensos.",
        "Dá para jogar sozinho ou em cooperativo de até 4 pessoas, com vários sistemas de endgame e mais de 100 horas de jogo.",
        "Chegou à versão 1.0 em 14/08/2025, depois de passar pelo acesso antecipado desde 25/09/2023. É preciso estar conectado à internet para jogar."
      ],
      requisitos: {
        minimos: req("Windows 10", "Intel Core i3-2125 ou AMD FX-4350", "8 GB de RAM", "GeForce GT 730 (1 GB) ou Radeon HD 7570 (1 GB)", null, "4 GB de espaço disponível"),
        recomendados: req("Windows 10", "Intel Core i5-7600 ou AMD Ryzen 5 2600", "8 GB de RAM", null, null, null)
      },
      avaliacoes: [
        rev("Aline", 5, "Há 2 dias", 36, 2, ["Jogar em quatro com os amigos é a melhor parte. Cada personagem tem um estilo próprio e o loot nunca para de vir."]),
        rev("Diego", 4, "Há 2 semanas", 19, 3, ["Muito divertido e com visual bem carismático. Tem bastante coisa para fazer no endgame, só precisa de internet o tempo todo."]),
        rev("Patrícia", 4, "Há 1 mês", 14, 2, ["Combate fluido e cheio de ação. Gostei da pegada de comunidade do estúdio, sempre ouvindo os jogadores."])
      ]
    },

    "fobia": {
      tags: ["Terror psicológico", "Sobrevivência", "Quebra-cabeças"],
      desenvolvedor: "Pulsatrix Studios",
      lancamento: "28/06/2022",
      tamanho: "10 GB",
      nota: 4.0,
      totalAvaliacoes: 1520,
      descricao: "Survival horror em primeira pessoa num hotel decadente, com uma câmera que conecta linhas do tempo e revela os segredos de um culto.",
      sobre: [
        "Treze Trilhas abriga o Hotel St. Dinfna, um local decadente envolto em boatos de desaparecimentos misteriosos e atividade paranormal.",
        "Em Fobia, você explora o hotel em diferentes linhas do tempo, usando uma câmera enigmática que conecta realidades paralelas para descobrir os segredos escondidos entre as paredes, e conhece a história sombria de um culto fanático.",
        "O jogo mistura exploração, quebra-cabeças e combate, e foi desenvolvido pela Pulsatrix Studios, estúdio brasileiro."
      ],
      requisitos: {
        minimos: req("Windows 7 ou superior (64 bits)", "Intel Core i3 9100 ou AMD Ryzen 3 2300X", "4 GB de RAM", "GeForce GTX 960 (4 GB) ou Radeon RX 6400 (4 GB)", "Versão 11", "10 GB de espaço disponível"),
        recomendados: req("Windows 7 ou superior (64 bits)", "Intel Core i5 8600 ou AMD Ryzen 5 3600X", "8 GB de RAM", "GeForce GTX 1060 (6 GB) ou Radeon RX 580 (8 GB)", "Versão 12", "10 GB de espaço disponível")
      },
      avaliacoes: [
        rev("Caio", 5, "Há 4 dias", 41, 3, ["A ideia da câmera mudando o tempo do cenário é muito boa. O hotel é um personagem à parte, cheio de segredos."]),
        rev("Sofia", 4, "Há 2 semanas", 23, 4, ["Climão pesado do início ao fim, os sustos funcionam. Alguns puzzles me travaram um pouco, mas é parte da graça."]),
        rev("Leandro", 3, "Há 2 meses", 11, 6, ["Atmosfera excelente, mas o combate é o ponto mais fraco. Vale mais pela história e pela exploração."])
      ]
    },

    "pocket-bravery": {
      tags: ["Luta", "Pixel art", "Arcade"],
      desenvolvedor: "Statera Studio",
      lancamento: "31/08/2023",
      tamanho: "16 GB",
      nota: 4.5,
      totalAvaliacoes: 874,
      descricao: "Jogo de luta 2D em pixel art inspirado nos clássicos da era NeoGeo Pocket Color, com elenco original e sistema elemental.",
      sobre: [
        "Pocket Bravery é um jogo de luta 2D inspirado nos clássicos dos anos 90, como Street Fighter, Fatal Fury e The King of Fighters, e nos jogos do NeoGeo Pocket Color.",
        "Tem um elenco variado de personagens originais, cores vibrantes e um sistema de combate pensado para jogadores de alto nível, mas acessível para quem está começando.",
        "O Ichor, energia elemental de cada lutador, permite ataques elementais com características diferentes e novas possibilidades de ataque e defesa. Foi feito pela Statera Studio e publicado pela PQube."
      ],
      requisitos: {
        minimos: req("Windows 10", "Intel Core i3-540 3.06 GHz ou AMD Phenom II X2 550 3.1 GHz", "4 GB de RAM", "GeForce GT 620 (1 GB) ou Radeon HD 6570", null, "16 GB de espaço disponível"),
        recomendados: req("Windows 10 ou superior", "Intel Core i7-4790", null, "GeForce GTX 970 (4 GB)", null, null)
      },
      avaliacoes: [
        rev("Felipe", 5, "Há 3 dias", 34, 1, ["Parece um jogo de fliperama que saiu do tempo. Os personagens são carismáticos e o sistema de Ichor deixa as lutas bem estratégicas."]),
        rev("Julia", 4, "Há 2 semanas", 20, 2, ["Muito bonito e divertido de jogar com amigos. Para iniciantes, o tutorial ajuda bastante a pegar os conceitos."]),
        rev("Gabriel", 5, "Há 1 mês", 28, 0, ["Excelente jogo de luta nacional. A jogabilidade é fluida, a trilha é ótima e dá para ver o carinho em cada detalhe."])
      ]
    },

    "knights-2": {
      tags: ["RPG", "Por turnos", "Retrô"],
      desenvolvedor: "Kyy Games",
      lancamento: "20/10/2015",
      nota: 4.2,
      totalAvaliacoes: 965,
      descricao: "RPG por turnos em pixel art cheio de humor, que brinca com as mesas de RPG de papel e caneta e com referências da cultura pop.",
      sobre: [
        "Knights of Pen & Paper 2 é um RPG por turnos de estilo retrô em pixel art, cheio de perigo, intriga, morte e testes de resistência.",
        "O mundo é de cavalaria, luta de classes e muitas referências pop fora do comum, contado como uma mesa de RPG de papel e caneta.",
        "Tem atalhos personalizáveis e suporte a controle. Foi desenvolvido pela Kyy Games, que assumiu o projeto dos criadores originais, a Behold Studios, e é publicado pela Paradox Interactive."
      ],
      requisitos: {
        minimos: req("Windows XP ou superior", "2 GHz ou mais", "1 GB de RAM")
      },
      avaliacoes: [
        rev("Davi", 5, "Há 1 semana", 30, 1, ["As piadas são ótimas e a mecânica de mesa de RPG é muito bem pensada. Rio sozinho jogando."]),
        rev("Camila", 4, "Há 3 semanas", 16, 2, ["Divertido e viciante, perfeito para jogar no celular ou no PC em sessões curtas. A progressão é boa."]),
        rev("Thiago", 4, "Há 2 meses", 12, 3, ["Gostei bastante do humor e das referências. Depois de muitas horas ele repete um pouco, mas continua simpático."])
      ]
    },

    "dodgeball": {
      tags: ["RPG esportivo", "Aventura", "Humor"],
      desenvolvedor: "Pocket Trap",
      lancamento: "05/08/2021",
      nota: 4.6,
      totalAvaliacoes: 812,
      descricao: "RPG esportivo em que o calouro Otto treina para se tornar o maior campeão de queimada, em partidas com estilo de jogo de luta.",
      sobre: [
        "Dodgeball Academia é um RPG esportivo estrelado por Otto, um calouro que sonha em dominar as quadras e fora delas.",
        "A história é dividida em oito capítulos, com amizades, rivais e partidas de queimada com estilo de jogo de luta, além de um sistema de evolução de grupo bem personalizável.",
        "Explore o campus da academia, descubra segredos escondidos e enfrente um amigo no modo versus local. É do estúdio Pocket Trap, de Ninjin: Clash of Carrots."
      ],
      requisitos: {
        minimos: req("Windows 10 (64 bits)", "Intel Core i5 de 8ª geração", "4 GB de RAM", "Gráficos integrados Intel", "Versão 11")
      },
      avaliacoes: [
        rev("Larissa", 5, "Há 5 dias", 28, 0, ["Quem diria que queimada daria um RPG tão bom? Os personagens são muito engraçados e a história prende."]),
        rev("Henrique", 5, "Há 2 semanas", 21, 1, ["Combate dinâmico e cheio de estilo. O modo versus local é ótimo para jogar com amigos."]),
        rev("Rodrigo", 4, "Há 1 mês", 13, 2, ["Muito divertido do começo ao fim. A última parte da campanha me pareceu um pouco puxada, mas nada grave."])
      ]
    },

    "kaze": {
      tags: ["Plataforma", "Pixel art", "Ação"],
      desenvolvedor: "PixelHive",
      lancamento: "26/03/2021",
      tamanho: "600 MB",
      nota: 4.7,
      totalAvaliacoes: 1388,
      descricao: "Plataforma 2D inspirado nos clássicos dos anos 90, com pixel art quadro a quadro e desafios que exigem precisão.",
      sobre: [
        "Kaze and the Wild Masks é um jogo de plataforma 2D inspirado nos clássicos dos anos 90, com pixel art moderna feita quadro a quadro e cenários coloridos.",
        "Quando as Ilhas de Cristal são amaldiçoadas, Kaze precisa salvar o amigo Hogo enfrentando vegetais enfurecidos. Encontre as Máscaras Selvagens para liberar os poderes dos guardiões lendários e dominar terra, ar e mar.",
        "A jogabilidade é fluida, mas desafiadora, com muitos colecionáveis. A campanha leva cerca de 5 a 7 horas, e a trilha foi composta por Paulo Bohrer, da PixelHive."
      ],
      requisitos: {
        minimos: req("Windows 7 ou superior", "Intel Core i3 M380", "4 GB de RAM", "Intel HD 5000", "Versão 10", "600 MB de espaço disponível")
      },
      avaliacoes: [
        rev("Mateus", 5, "Há 3 dias", 47, 1, ["Lembra muito Donkey Kong Country, e isso é um elogio enorme. Pixel art linda e controles perfeitos."]),
        rev("Bruna", 5, "Há 2 semanas", 32, 0, ["As máscaras dão uma variedade ótima às fases. Desafiador na medida, nunca injusto."]),
        rev("André", 4, "Há 1 mês", 18, 2, ["Muito bom! Algumas fases mais avançadas exigem bastante precisão, mas o jogo é gostoso demais de jogar."])
      ]
    },

    "kukoos": {
      tags: ["Plataforma 3D", "Cooperativo", "Aventura"],
      desenvolvedor: "Petit Fabrik",
      lancamento: "06/12/2022",
      tamanho: "10 GB",
      nota: 4.0,
      totalAvaliacoes: 347,
      descricao: "Plataforma 3D fofo e colorido para jogar sozinho ou em cooperativo local, em que os Kukoos precisam recuperar os pets que ficaram agressivos.",
      sobre: [
        "Num planeta coberto de água, os Kukoos vivem na única ilha, onde fica a grande árvore Kukoo.",
        "Depois que um experimento para deixar os bichos de estimação mais obedientes dá errado, cabe aos Kukoos encontrar os pets agora agressivos e restaurar a harmonia da árvore.",
        "É um jogo de plataforma 3D com puzzles, com cooperativo local de até 4 jogadores. Moedas desbloqueiam fases extras, e dá para rejogar com pets diferentes para descobrir novos segredos."
      ],
      requisitos: {
        minimos: req("Windows 8.1 ou 10 (64 bits)", "Intel Core i5-4570 3.2 GHz ou AMD FX-8350", "8 GB de RAM", "GeForce GTX 970 ou Radeon RX 480", "Versão 11", "10 GB de espaço disponível"),
        recomendados: req("Windows 10 (64 bits)", "Intel Core i7-4770K ou AMD Ryzen 5 1500X", null, null, null, null)
      },
      avaliacoes: [
        rev("Isabela", 5, "Há 1 semana", 19, 0, ["Jogamos em quatro aqui em casa e foi uma delícia. Visual fofo, fases criativas e uma ótima pedida para família."]),
        rev("Pedro", 4, "Há 3 semanas", 11, 1, ["Simpático e bem feito. Brilha no cooperativo, sozinho fica um pouco menos empolgante."]),
        rev("Fernanda", 3, "Há 2 meses", 6, 3, ["Bonitinho e divertido, mas a câmera às vezes atrapalha nas partes de plataforma. Vale pelo co-op."])
      ]
    },

    "dandara": {
      tags: ["Metroidvania", "Plataforma", "Pixel art"],
      desenvolvedor: "Long Hat House",
      lancamento: "06/02/2018",
      tamanho: "1 GB",
      nota: 4.3,
      totalAvaliacoes: 1640,
      descricao: "Metroidvania 2D em que a gravidade não segue as regras: Dandara salta entre superfícies de sal num mundo à beira do colapso.",
      sobre: [
        "Dandara: Trials of Fear Edition é um metroidvania 2D com pixel art desenhada à mão, em que as leis da gravidade não valem e você salta entre superfícies de sal.",
        "O mundo do Sal está à beira do colapso e Dandara desperta para trazer liberdade e equilíbrio a um universo sem direção.",
        "A edição Trials of Fear acrescenta três novas áreas, um novo chefe, novos poderes e mecânicas, músicas inéditas, um final secreto e mais foco na história. Recomenda-se jogar com controle."
      ],
      requisitos: {
        minimos: req("Windows XP", "Processador de 1.8 GHz", "4 GB de RAM", "GeForce GT 220 ou Radeon HD 8400", null, "1 GB de espaço disponível")
      },
      avaliacoes: [
        rev("Gustavo", 5, "Há 4 dias", 39, 2, ["O sistema de pular entre as superfícies é diferente de tudo. Demora um pouco para acostumar, mas depois é viciante."]),
        rev("Carol", 4, "Há 2 semanas", 25, 3, ["Arte e trilha lindas, e uma protagonista marcante. Alguns chefes são bem difíceis, mas dá para ir aprendendo."]),
        rev("Leandro", 4, "Há 1 mês", 17, 2, ["Metroidvania criativo e com identidade brasileira forte. Recomendo jogar com controle."])
      ]
    },

    "mullet": {
      tags: ["FPS", "Roguelite", "Anime"],
      desenvolvedor: "HAMMER95",
      lancamento: "15/05/2024",
      tamanho: "5 GB",
      nota: 4.8,
      totalAvaliacoes: 3012,
      descricao: "FPS frenético com visual de anime clássico, em que cada inimigo derrubado devolve tempo à sua vida.",
      sobre: [
        "MULLET MADJACK é um shooter de ação em primeira pessoa que coloca você dentro de um anime clássico dos anos 80 e 90, cheio de neon e de velocidade.",
        "Em 2090, a humanidade só sobrevive com uma dose de dopamina a cada 10 segundos. Derrubar inimigos devolve tempo à sua vida, então o segredo é nunca parar de se mover.",
        "Escolha sua arma favorita e chegue ao último andar, tentando bater o seu melhor tempo. A campanha tem cenas animadas em estilo anime antigo e opções de acessibilidade, como desativar o tremor de câmera."
      ],
      requisitos: {
        minimos: req("Windows 10", "2.4 GHz", "8 GB de RAM", "GeForce 970", null, "5 GB de espaço disponível"),
        recomendados: req("Windows 10", "4 GHz", "16 GB de RAM", "GeForce 1060", null, "5 GB de espaço disponível")
      },
      avaliacoes: [
        rev("Lucas", 5, "Há 2 dias", 88, 2, ["Estilo absurdo, jogabilidade insana. É difícil parar de jogar, sempre quero tentar mais uma vez para bater meu tempo."]),
        rev("Vinícius", 5, "Há 1 semana", 61, 1, ["As cutscenes em anime velho e a trilha dão todo o clima. Um dos melhores shooters que joguei nos últimos anos."]),
        rev("Mariana", 4, "Há 1 mês", 33, 4, ["Muito legal e super viciante, mas é rápido demais para quem não está acostumado. Vale praticar um pouco."])
      ]
    },

    "midnight": {
      tags: ["Aventura", "Terror", "Stop-motion"],
      desenvolvedor: "MoonHood",
      lancamento: "08/05/2025",
      tamanho: "18 GB",
      nota: 4.5,
      totalAvaliacoes: 1227,
      descricao: "Aventura de fantasia sombria feita em argila e animada em stop motion, ao lado de uma criatura-lanterna.",
      sobre: [
        "The Midnight Walk é uma aventura de fantasia sombria construída em argila de verdade e animada em stop motion, do estúdio MoonHood, formado por gente de Lost in Random e Fe.",
        "Você faz amizade com Potboy, uma criatura-lanterna perdida, e ilumina o caminho por um mundo de maravilhas e terror, driblando monstros com astúcia e admirando os detalhes da paisagem.",
        "Dá para jogar com controle numa tela comum ou em realidade virtual."
      ],
      requisitos: {
        minimos: req("Windows 10", "Intel Core i7-6700K", "16 GB de RAM", "GeForce GTX 1070 (8 GB)", null, "18 GB de espaço disponível", "Requisitos para a versão em tela comum (sem RV)")
      },
      avaliacoes: [
        rev("Bruna", 5, "Há 5 dias", 53, 1, ["É como entrar numa maquete viva. A arte em argila é de cair o queixo e a relação com o Potboy é emocionante."]),
        rev("Rafael", 5, "Há 2 semanas", 37, 2, ["Um dos jogos mais bonitos que já vi. O clima é de conto sombrio, e a trilha sonora ajuda muito."]),
        rev("Aline", 4, "Há 1 mês", 19, 4, ["Beleza e emoção de sobra. A jogabilidade é simples, mas o visual compensa. Joguei de uma vez só."])
      ]
    },

    "hazel-sky": {
      tags: ["Aventura", "Plataforma", "Narrativa"],
      desenvolvedor: "Coffee Addict Studio",
      lancamento: "20/07/2022",
      tamanho: "12 GB",
      nota: 3.9,
      totalAvaliacoes: 418,
      descricao: "Aventura sentimental sobre um jovem engenheiro que conserta máquinas voadoras e enfrenta o próprio destino.",
      sobre: [
        "Hazel Sky é uma aventura sentimental sobre um jovem engenheiro diante do seu destino e dos seus desejos.",
        "Conserte máquinas voadoras improvisadas e pule, escale, balance e deslize por um mundo bonito e misterioso, descobrindo verdades e fatos curiosos sobre o povo de Gideon.",
        "A trilha conta com músicas da banda Dazie Mae. O jogo é da Coffee Addict Studio, publicado pela Neon Doctrine."
      ],
      requisitos: {
        minimos: req("Windows 7, 8 ou 10 (64 bits)", "Intel Core i5-2300 2.8 GHz", "8 GB de RAM", "GeForce GTX 550 Ti (2 GB)", "Versão 11", "12 GB de espaço disponível"),
        recomendados: req("Windows 7, 8 ou 10 (64 bits)", "Intel Core i7-4790 3.6 GHz", "8 GB de RAM", "GeForce GTX 760 (3 GB)", "Versão 11", "12 GB de espaço disponível")
      },
      avaliacoes: [
        rev("Sofia", 4, "Há 1 semana", 16, 2, ["História bonita e delicada, com personagens que a gente se apega. O visual é uma graça."]),
        rev("Diego", 4, "Há 3 semanas", 10, 3, ["Gostei muito do clima e da música. A plataforma às vezes é imprecisa, mas o conjunto agrada."]),
        rev("Patrícia", 3, "Há 2 meses", 7, 4, ["É bonito, mas o ritmo é lento demais em alguns momentos. Indico para quem curte narrativas calmas."])
      ]
    },

    "mark-of-deep": {
      tags: ["Metroidvania", "Souls-like", "Piratas"],
      desenvolvedor: "Mad Mimic",
      lancamento: "24/01/2025",
      tamanho: "5 GB",
      nota: 3.8,
      totalAvaliacoes: 536,
      descricao: "Metroidvania souls-like isométrico de tema pirata, com combate deliberado e uma ilha amaldiçoada para explorar.",
      sobre: [
        "Mark of the Deep é um metroidvania souls-like em visão isométrica, com tema pirata, em que você desvenda os segredos de uma ilha amaldiçoada.",
        "O combate é deliberado e a exploração deixa você traçar o próprio caminho, adaptar planos e ampliar seu repertório de habilidades.",
        "É da Mad Mimic, estúdio de São Paulo e criador de Dandy Ace, com publicação da Light Up Games."
      ],
      requisitos: {
        minimos: req("Windows 10 ou superior", "Dual core de 2.4 GHz", "4 GB de RAM", "GeForce GT 430 ou Radeon HD 7470 (1 GB de VRAM)", "Versão 10", "5 GB de espaço disponível")
      },
      avaliacoes: [
        rev("Henrique", 4, "Há 4 dias", 18, 3, ["Tema pirata com souls-like deu certo. O mapa é cheio de segredos e os chefes têm padrões interessantes."]),
        rev("Isabela", 4, "Há 2 semanas", 11, 2, ["Gostei da exploração e do visual. Rodou bem no meu PC simples, e o preço é justo."]),
        rev("Caio", 3, "Há 1 mês", 8, 5, ["Bom jogo, mas senti uma curva de dificuldade meio irregular. Vale a pena para fãs do gênero."])
      ]
    },

    "toggles": {
      tags: ["Quebra-cabeças", "Plataforma 3D", "Aventura"],
      desenvolvedor: "Regular Studio",
      lancamento: "07/12/2022",
      tamanho: "4 GB",
      nota: 4.0,
      totalAvaliacoes: 302,
      descricao: "Plataforma 3D com quebra-cabeças, colorido e charmoso, em que você empilha blocos vivos para salvar a galáxia.",
      sobre: [
        "Togges é um puzzle-platformer 3D charmoso e colorido: embarque em aventuras, empilhe adoráveis blocos vivos e resolva quebra-cabeças pelo cosmos para salvar a galáxia das ameaças do Vazio.",
        "Supere desafios combinando as cores dos Togges e as habilidades de cada uma.",
        "O jogo foi desenvolvido pela Regular Studio e publicado pela Thunderful Publishing. Tem suporte total a controle."
      ],
      requisitos: {
        minimos: req("Windows 7", "Intel i5 de 2ª geração", "8 GB de RAM", "GeForce GTX 780", "Versão 11", "4 GB de espaço disponível"),
        recomendados: req("Windows 10", "Intel i5 de 2ª geração", null, "GeForce GTX 1060", "Versão 12", "4 GB de espaço disponível")
      },
      avaliacoes: [
        rev("Renata", 5, "Há 6 dias", 15, 1, ["Fofo demais! Os puzzles ficam cada vez mais criativos e os mundos têm cores lindas."]),
        rev("Thiago", 4, "Há 3 semanas", 9, 2, ["Bem divertido, principalmente para jogar com criança. Alguns mundos ficam grandes demais, mas é gostoso explorar."]),
        rev("Davi", 3, "Há 2 meses", 5, 3, ["A ideia é muito boa e o visual é lindo, só achei a câmera um pouco incômoda em alguns momentos."])
      ]
    },

    "relic-hunters-zero": {
      tags: ["Twin-stick shooter", "Ação", "Gratuito"],
      desenvolvedor: "Rogue Snail",
      lancamento: "18/08/2015",
      tamanho: "150 MB",
      nota: 4.5,
      totalAvaliacoes: 2284,
      descricao: "Shooter twin-stick de visão superior, rápido e gratuito, em que você enfrenta o Império Ducan com armas pequenas e fofas.",
      sobre: [
        "Relic Hunters Zero: Remix é uma versão remasterizada do sucesso gratuito com mais de um milhão de jogadores, sobre explodir patos e tartarugas espaciais do mal com armas pequenas e fofas.",
        "É rápido, tático e muito gostoso de jogar: desbloqueie novas armas, personagens e relíquias para vencer o Comandante Ducan e frustrar os planos de conquista universal do Império Ducan.",
        "Tem cooperativo local e é um jogo gratuito da Rogue Snail, estúdio brasileiro."
      ],
      requisitos: {
        minimos: req("Windows 10", "Intel i3 de 3ª geração ou AMD FX-4100", "4 GB de RAM", "GeForce série 7 ou Radeon série R7", null, "150 MB de espaço disponível", "Gráficos integrados, como Intel Graphics, não são suportados")
      },
      avaliacoes: [
        rev("Gabriel", 5, "Há 3 dias", 62, 1, ["Não acredito que é grátis. Combate gostoso, personagens carismáticos e um loot que não para."]),
        rev("Larissa", 5, "Há 2 semanas", 41, 0, ["Joguei com meu irmão no co-op local e foi uma festa. Fácil de aprender e viciante."]),
        rev("Felipe", 4, "Há 1 mês", 24, 2, ["Muito bom, principalmente por ser de graça. Recomendo para qualquer um que goste de atirar em tudo o que se move."])
      ]
    },

    "chroma-squad": {
      tags: ["RPG tático", "Estratégia", "Pixel art"],
      desenvolvedor: "Behold Studios",
      lancamento: "30/04/2015",
      tamanho: "250 MB",
      nota: 4.6,
      totalAvaliacoes: 1731,
      descricao: "Estratégia por turnos sobre um grupo de dublês que cria a própria série de heróis, numa carta de amor a Power Rangers e aos tokusatsu.",
      sobre: [
        "Chroma Squad é uma carta de amor a Power Rangers, aos tokusatsu e às séries japonesas da nossa infância.",
        "Um grupo de dublês larga o estúdio de TV para criar a própria série: escale o elenco, melhore o estúdio, construa mechas de papelão e fita adesiva e, quando as câmeras ligarem, comande cinco heróis de macacão colorido em combates por turnos.",
        "Tem pixel art muito bem animada, trilha chiptune e editor de episódios. É da Behold Studios, estúdio brasileiro."
      ],
      requisitos: {
        minimos: req("Windows XP ou superior (64 bits)", "2000 MHz", "512 MB de RAM", "Placa compatível com Direct3D/OpenGL, mínimo de 128 MB", "Versão 9.0c", "250 MB de espaço disponível")
      },
      avaliacoes: [
        rev("Pedro", 5, "Há 4 dias", 58, 1, ["Um dos jogos mais criativos que já joguei. A mistura de gestão de estúdio com tática é genial."]),
        rev("Camila", 5, "Há 2 semanas", 40, 0, ["Para quem cresceu vendo Changeman e Power Rangers, é emocionante. As piadas e as referências são ótimas."]),
        rev("André", 4, "Há 1 mês", 22, 3, ["Divertidíssimo e carismático. Algumas missões ficam mais longas, mas o jogo nunca perde a graça."])
      ]
    },

    "momodora": {
      tags: ["Metroidvania", "Ação", "Pixel art"],
      desenvolvedor: "Bombservice",
      lancamento: "03/03/2016",
      tamanho: "200 MB",
      nota: 4.7,
      totalAvaliacoes: 2055,
      descricao: "Plataforma de ação 2D com combos, esquivas e magias, numa terra amaldiçoada à beira da extinção.",
      sobre: [
        "Momodora: Reverie Under the Moonlight leva você por uma terra amaldiçoada, à beira da extinção, onde o mal se espalha, os mortos se levantam e a corrupção reina.",
        "É o quarto jogo da série Momodora, de ação e plataforma 2D, com combos corpo a corpo, esquiva e uma enorme variedade de itens e feitiços para usar contra os inimigos.",
        "Você controla Kaho, uma sacerdotisa. O jogo é da Bombservice, com publicação da PLAYISM, e o visual em pixel art é um dos mais elogiados da série."
      ],
      requisitos: {
        minimos: req("Windows 7", "2 GHz", "2 GB de RAM", "1 GB (com suporte a Pixel Shader)", null, "200 MB de espaço disponível")
      },
      avaliacoes: [
        rev("Beatriz", 5, "Há 2 dias", 64, 1, ["Pixel art lindíssima e combate gostoso demais. Cada chefe me fez suar, e a sensação de vitória é incrível."]),
        rev("Rodrigo", 5, "Há 2 semanas", 45, 2, ["Um dos melhores metroidvanias que já joguei. É curto, polido e muito bem feito."]),
        rev("Mateus", 4, "Há 1 mês", 26, 3, ["Excelente. Só acho que alguns pontos de salvamento poderiam ser mais próximos dos chefes."])
      ]
    },

    "no-place-for-bravery": {
      tags: ["RPG de ação", "Souls-like", "Pixel art"],
      desenvolvedor: "Glitch Factory",
      lancamento: "22/09/2022",
      tamanho: "2 GB",
      nota: 4.0,
      totalAvaliacoes: 729,
      descricao: "RPG de ação 2D de visão superior, com combate brutal inspirado em Sekiro, sobre um velho guerreiro em busca da filha.",
      sobre: [
        "No Place for Bravery é um RPG de ação 2D de visão superior, em pixel art, com combate brutal e inspirações em jogos como Sekiro: Shadows Die Twice.",
        "Você é Thorn, um velho guerreiro que viaja pelo mundo de Dewr atrás da filha perdida, em uma jornada de redenção. Esquive, aparei e golpeie seu caminho até a verdade.",
        "Foi feito pela brasileira Glitch Factory e publicado pela Ysbryd Games."
      ],
      requisitos: {
        minimos: req("Windows 10 (64 bits)", "Dual core de 2.8 GHz", "4 GB de RAM", null, null, "2 GB de espaço disponível")
      },
      avaliacoes: [
        rev("Gustavo", 4, "Há 5 dias", 24, 3, ["A narrativa é pesada e emocionante. O combate exige atenção, e vencer um chefe dá muita satisfação."]),
        rev("Julia", 4, "Há 3 semanas", 17, 2, ["A arte pintada à mão é muito bonita e a trilha combina com o clima. Não é um jogo para quem quer relaxar."]),
        rev("Bruno", 3, "Há 2 meses", 9, 5, ["História ótima, mas a dificuldade e a falta de explicações em algumas mecânicas me desanimaram um pouco."])
      ]
    },

    "9-kings": {
      tags: ["Roguelike", "Estratégia", "Construção de reino"],
      desenvolvedor: "Sad Socket",
      lancamento: "23/05/2025",
      tamanho: "500 MB",
      nota: 4.7,
      totalAvaliacoes: 2490,
      descricao: "Roguelike rápido de construção de reino, em que seu exército luta sozinho e você apoia lançando pedras e comprando cartas.",
      sobre: [
        "9 Kings é um roguelike de construção de reino, rápido e viciante, em que você faz o seu império crescer e enfrenta batalhas enormes contra reis rivais poderosos.",
        "Seu exército luta sozinho, e você o apoia lançando pedras nos inimigos e sacando cartas aleatórias do baralho. Combine construções, unidades, feitiços e posicionamento em milhares de builds.",
        "Está em acesso antecipado desde 23/05/2025. É da Sad Socket, com publicação da Hooded Horse."
      ],
      requisitos: {
        minimos: req("Windows 10 (64 bits)", "Intel Core i5-750 ou AMD Phenom II X4 965", "4 GB de RAM", "GeForce GT 630 (2 GB) ou Radeon HD 6670 (2 GB)", "Versão 11", "500 MB de espaço disponível"),
        recomendados: req("Windows 10 (64 bits)", "Intel Core i5-3570 ou AMD FX-8300", "8 GB de RAM", "GeForce GTX 650 (2 GB) ou Radeon HD 7750 (2 GB)", "Versão 12", "500 MB de espaço disponível")
      },
      avaliacoes: [
        rev("Lucas", 5, "Há 2 dias", 77, 2, ["Comecei para testar e quando vi já era madrugada. Cada partida tem uma build diferente e as combinações são absurdas."]),
        rev("Carol", 5, "Há 1 semana", 52, 1, ["Simples de entender e difícil de largar. O toque de lançar pedra nos inimigos é muito satisfatório."]),
        rev("Diego", 4, "Há 1 mês", 29, 4, ["Ótimo para partidas rápidas. Em níveis fáceis fica meio previsível, mas as dificuldades maiores resolvem isso."])
      ]
    },

    "enigma-do-medo": {
      tags: ["Investigação", "Terror", "Pixel art 3D"],
      desenvolvedor: "Dumativa",
      lancamento: "28/11/2024",
      tamanho: "25 GB",
      nota: 4.8,
      totalAvaliacoes: 2976,
      descricao: "Jogo de investigação e suspense em que a detetive paranormal Mia procura o pai desaparecido dentro do Perímetro.",
      sobre: [
        "Em Enigma do Medo, você é Mia, uma detetive paranormal que procura o pai desaparecido dentro do Perímetro, um lugar que não existe.",
        "Investigue pistas como um detetive de verdade, com um sistema imersivo de inspeção, e desvende o mistério do Culto do Medo, grupo ligado ao desaparecimento de vários agentes da Ordo Realitas, enquanto derrota monstros que tentam impedir você.",
        "O visual mistura pixel art e 3D, com trilha dinâmica que se adapta ao que acontece. A história é independente e surgiu do universo de Ordem Paranormal, desenvolvida pela Dumativa em parceria com o youtuber Cellbit e financiada no Catarse."
      ],
      requisitos: {
        minimos: req("Windows 10 ou superior", "Intel Core i3-530 ou AMD A6-3650", "8 GB de RAM", "GeForce 9600 GT ou Radeon HD 6570", "Versão 9.0c", "25 GB de espaço disponível"),
        recomendados: req("Windows 11 ou superior", null, null, null, null, "25 GB de espaço disponível")
      },
      avaliacoes: [
        rev("Mariana", 5, "Há 2 dias", 96, 2, ["Estou apaixonada. A investigação é imersiva, a trilha sonora muda com o clima e a Mia é uma protagonista incrível."]),
        rev("Vinícius", 5, "Há 1 semana", 71, 1, ["Jogo nacional de altíssimo nível. Os puzzles fazem você pensar de verdade e os sustos pegam de surpresa."]),
        rev("Renata", 5, "Há 1 mês", 48, 3, ["Mesmo sem conhecer o universo de Ordem Paranormal, dá para aproveitar tudo. Terror e mistério na medida certa."])
      ]
    },

    "retro-machina": {
      tags: ["Ação", "Aventura", "Quebra-cabeças"],
      desenvolvedor: "Orbit Studio",
      lancamento: "12/05/2021",
      tamanho: "10 GB",
      nota: 4.3,
      totalAvaliacoes: 638,
      descricao: "Aventura de ação num mundo abandonado pelos humanos, onde só restou uma cidade habitada por robôs.",
      sobre: [
        "Retro Machina apresenta um futuro que pertence ao passado: é um jogo de ação para um jogador, ambientado num mundo abandonado pelos humanos e deixado apenas para os robôs.",
        "Só existe uma cidade no planeta, habitada exclusivamente por máquinas. Da região subterrânea às ruas douradas de Endeavour, a última cidade, sua jornada atravessa uma região cheia de desafios, novos robôs e mistérios para explorar.",
        "Mistura combate, quebra-cabeças e exploração, e foi desenvolvido pela Orbit Studio, com publicação da SuperGG.com."
      ],
      requisitos: {
        minimos: req("Windows 7 ou superior", "Intel Core i3 ou AMD FX 6300, 2 GHz ou mais", "8 GB de RAM", "GeForce GT 1030 ou Radeon RX 550", "Versão 11", "10 GB de espaço disponível"),
        recomendados: req("Windows 10 ou superior", "Intel Core i5 ou AMD Ryzen 3", "8 GB de RAM", "GeForce GTX 1050 ou Radeon RX 560", "Versão 11", "10 GB de espaço disponível")
      },
      avaliacoes: [
        rev("Gabriel", 5, "Há 5 dias", 21, 1, ["O visual retrofuturista é lindo e a ambientação com robôs me conquistou. Combina combate e puzzle de um jeito bem equilibrado."]),
        rev("Isabela", 4, "Há 3 semanas", 14, 2, ["Muito bonito e com boa história. A câmera atrapalha um pouco em alguns trechos, mas a experiência vale a pena."]),
        rev("Mateus", 4, "Há 2 meses", 9, 3, ["Gostei das ideias e do clima de mundo abandonado. Joguei até o fim em poucas sessões e fiquei com vontade de mais."])
      ]
    },

    "akane": {
      tags: ["Ação", "Cyberpunk", "Arcade"],
      desenvolvedor: "Ludic Studios",
      lancamento: "10/09/2018",
      tamanho: "200 MB",
      nota: 4.4,
      totalAvaliacoes: 1514,
      descricao: "Slasher arcade em arena, em que uma samurai enfrenta a yakuza nas ruas de neon da Mega-Tóquio de 2121.",
      sobre: [
        "Em 2121, sem nenhuma rota de fuga, Akane se prepara para a batalha final nas ruas de neon e chuva da Mega-Tóquio. Akane é um slasher arcade em arena.",
        "Você controla uma samurai que precisa derrubar o maior número possível de yakuza, cortando e atirando numa luta de vida ou morte em que um golpe basta para eliminar o inimigo.",
        "O visual traz sprites com luzes e sombras, pedestres e anúncios de neon que dão vida ao cenário. O jogo é de adultos, com violência, sangue e desmembramento."
      ],
      requisitos: {
        minimos: req("Windows Vista, 7, 8, 8.1 ou 10", "Intel Core 2 Duo 2.4 GHz ou equivalente", "2 GB de RAM", "GeForce 8600 GT ou equivalente", null, "200 MB de espaço disponível", "Resolução mínima de 1280 x 720"),
        recomendados: req("Windows Vista, 7, 8, 8.1 ou 10", "Intel Core i5 3.3 GHz ou equivalente", "4 GB de RAM", "GeForce GTX 560 Ti ou equivalente (1 GB de VRAM)", null, "200 MB de espaço disponível")
      },
      avaliacoes: [
        rev("Diego", 5, "Há 2 dias", 49, 2, ["Curtinho e intenso. Cada rodada é pura adrenalina, e o visual neon na chuva é demais."]),
        rev("Sofia", 4, "Há 2 semanas", 27, 3, ["Fácil de pegar e difícil de dominar. Perfeito para uma partida rápida quando sobra um tempinho."]),
        rev("Caio", 4, "Há 1 mês", 18, 4, ["Muito estiloso e viciante, mas o conteúdo é enxuto. Por esse preço, vale demais."])
      ]
    },

    "hell-clock": {
      tags: ["Roguelike", "RPG de ação", "Fantasia sombria"],
      desenvolvedor: "Rogue Snail",
      lancamento: "22/07/2025",
      tamanho: "2 GB",
      nota: 4.4,
      totalAvaliacoes: 1873,
      descricao: "Roguelike e ARPG com loot sem fim, numa versão de fantasia sombria da Guerra de Canudos.",
      sobre: [
        "Hell Clock combina roguelike e ARPG: crie builds poderosas com loot sem fim, atravesse masmorras e libere poderes sobre-humanos numa releitura de fantasia sombria da Guerra de Canudos, no Brasil.",
        "No século XIX, Canudos virou refúgio de milhares de pessoas. Quando o povo desafiou a nova República, enfrentou uma retaliação brutal. Em Hell Clock, o poder de reescrever esse desfecho está nas suas mãos.",
        "Há uma campanha completa em três atos e um sistema de endgame, o Ascension, para quem busca desafio máximo, com o Modo Inferno. Foi feito pela Rogue Snail e publicado pela Mad Mushroom."
      ],
      requisitos: {
        minimos: req("Windows 10", "Intel Core i5 2500 ou AMD FX-4350", "8 GB de RAM", "GeForce GTX 1060 ou Radeon RX 580 (6 GB de VRAM)", "Versão 11", "2 GB de espaço disponível"),
        recomendados: req("Windows 10", "Intel Core i5 6500 ou AMD Ryzen 3 1200", "16 GB de RAM", "GeForce RTX 3060 ou Radeon RX 6600 XT (6 GB ou mais de VRAM)", "Versão 11", "2 GB de espaço disponível")
      },
      avaliacoes: [
        rev("Lucas", 5, "Há 3 dias", 66, 2, ["Ambientação brasileira sensacional. O combate é frenético, as builds são variadas e o loot nunca para."]),
        rev("Mariana", 5, "Há 2 semanas", 44, 1, ["Trazer Canudos para um jogo assim foi uma ideia genial. A arte é linda e a trilha combina com o clima pesado."]),
        rev("Rafael", 4, "Há 1 mês", 25, 3, ["Viciante, daqueles de dizer só mais uma partida. O endgame tem bastante coisa, só exige um PC razoável."])
      ]
    }
  };

  // Planos de fundo e capturas de gameplay, em games/img/<id>/ (fundo.* e gameplayN.*).
  // A pagina usa ate 10 imagens: com mais de 5 aparece a seta de "ver mais".
  var galerias = {
    "9-kings": { fundo: "fundo.webp", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg", "gameplay6.jpg", "gameplay7.jpg", "gameplay8.jpg", "gameplay9.jpg", "gameplay10.jpg"] },
    "aila": { fundo: "fundo.avif", imagens: ["gameplay1.avif", "gameplay2.avif", "gameplay3.avif", "gameplay4.avif", "gameplay5.avif", "gameplay6.avif", "gameplay7.avif", "gameplay8.avif", "gameplay9.avif"] },
    "akane": { fundo: "fundo.jpg", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg"] },
    "arida": { fundo: "fundo.webp", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg", "gameplay6.jpg"] },
    "chroma-squad": { fundo: "fundo.avif", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg", "gameplay6.jpg", "gameplay7.jpg", "gameplay8.jpg"] },
    "dandara": { fundo: "fundo.jpg", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg", "gameplay6.jpg", "gameplay7.jpg", "gameplay8.jpg", "gameplay9.jpg", "gameplay10.jpg"] },
    "dodgeball": { fundo: "fundo.webp", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg", "gameplay6.jpg", "gameplay7.jpg"] },
    "enigma-do-medo": { fundo: "fundo.webp", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg", "gameplay6.jpg", "gameplay7.jpg", "gameplay8.jpg", "gameplay9.jpg", "gameplay10.jpg"] },
    "eternal-cylinder": { fundo: "fundo.webp", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg", "gameplay6.jpg", "gameplay7.jpg", "gameplay8.jpg", "gameplay9.jpg", "gameplay10.jpg"] },
    "fobia": { fundo: "fundo.webp", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg", "gameplay6.jpg", "gameplay7.jpg", "gameplay8.jpg", "gameplay9.jpg"] },
    "hazel-sky": { fundo: "fundo.jpg", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg", "gameplay6.jpg", "gameplay7.jpg", "gameplay8.jpg", "gameplay9.jpg", "gameplay10.jpg"] },
    "hell-clock": { fundo: "fundo.jpg", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg", "gameplay6.jpg", "gameplay7.jpg", "gameplay8.jpg", "gameplay9.jpg", "gameplay10.jpg"] },
    "horizon": { fundo: "fundo.webp", imagens: ["gameplay1.webp", "gameplay2.webp", "gameplay3.webp", "gameplay4.webp", "gameplay5.webp"] },
    "kaze": { fundo: "fundo.avif", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg", "gameplay6.jpg", "gameplay7.jpg", "gameplay8.jpg", "gameplay9.jpg", "gameplay10.jpg"] },
    "knights-2": { fundo: "fundo.webp", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg", "gameplay6.jpg", "gameplay7.jpg", "gameplay8.jpg", "gameplay9.jpg", "gameplay10.jpg"] },
    "kukoos": { fundo: "fundo.webp", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg"] },
    "mark-of-deep": { fundo: "fundo.jpeg", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg", "gameplay6.jpg", "gameplay7.jpg", "gameplay8.jpg", "gameplay9.jpg", "gameplay10.jpg"] },
    "midnight": { fundo: "fundo.avif", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg"] },
    "momodora": { fundo: "fundo.webp", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg"] },
    "mullet": { fundo: "fundo.jpg", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg", "gameplay6.jpg", "gameplay7.jpg", "gameplay8.jpg", "gameplay9.jpg", "gameplay10.jpg"] },
    "no-place-for-bravery": { fundo: "fundo.webp", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg", "gameplay6.jpg", "gameplay7.jpg", "gameplay8.jpg", "gameplay9.jpg", "gameplay10.jpg"] },
    "odallus": { fundo: "fundo.jpeg", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg", "gameplay6.jpg", "gameplay7.jpg", "gameplay8.jpg", "gameplay9.jpg", "gameplay10.jpg"] },
    "pocket-bravery": { fundo: "fundo.avif", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg", "gameplay6.jpg", "gameplay7.jpg", "gameplay8.jpg", "gameplay9.jpg", "gameplay10.jpg"] },
    "relic-hunters": { fundo: "fundo.jpeg", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg", "gameplay6.jpg", "gameplay7.jpg", "gameplay8.jpg", "gameplay9.jpg", "gameplay10.jpg"] },
    "relic-hunters-zero": { fundo: "fundo.webp", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg", "gameplay6.jpg", "gameplay7.jpg", "gameplay8.jpg", "gameplay9.jpg", "gameplay10.jpg"] },
    "retro-machina": { fundo: "fundo.avif", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg", "gameplay6.jpg", "gameplay7.jpg", "gameplay8.jpg", "gameplay9.jpg", "gameplay10.jpg"] },
    "toggles": { fundo: "fundo.webp", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg", "gameplay6.jpg", "gameplay7.jpg", "gameplay8.jpg", "gameplay9.jpg", "gameplay10.jpg"] },
    "toren": { fundo: "fundo.webp", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg", "gameplay6.jpg"] },
    "unsighted": { fundo: "fundo.webp", imagens: ["gameplay1.jpg", "gameplay2.jpg", "gameplay3.jpg", "gameplay4.jpg", "gameplay5.jpg"] }
  };

  Object.keys(galerias).forEach(function (id) {
    var pasta = "/games/img/" + id + "/";
    var galeria = galerias[id];

    detalhes[id].fundo = pasta + galeria.fundo;
    detalhes[id].midia = {
      imagens: galeria.imagens.map(function (arquivo) { return pasta + arquivo; })
    };
  });

  global.IaraJogo = global.IaraJogo || {};
  global.IaraJogo.detalhes = detalhes;
})(window);
