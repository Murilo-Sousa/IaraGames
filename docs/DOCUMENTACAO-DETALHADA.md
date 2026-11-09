# 🎮 Iara Games

Protótipo de uma plataforma brasileira de distribuição de jogos digitais, desenvolvido em grupo com foco em **experiência do usuário, identidade visual e interatividade front-end**.

O projeto começou como uma interface estática construída com **HTML e CSS**, ganhou interatividade com **JavaScript e manipulação do DOM (Document Object Model)** e, na fase mais recente, passou a ter a página de cada jogo feita em **React**, um catálogo filtrado por categorias e uma **API de pagamento real (Stripe Checkout)** servida por um back-end em **Node.js e Express**.

---

## 👥 Integrantes

* Leonardo Franco Arakaki
* Murilo de Melo Sousa
* Samuel Liasch Alves
* Walisson Souza dos Santos

---

## 📌 Sobre o projeto

O **Iara Games** é um protótipo de plataforma de distribuição de jogos digitais voltada ao público brasileiro.

A proposta é conectar a comunidade nacional de jogadores a um catálogo de títulos, dando destaque especial a jogos desenvolvidos por criadores brasileiros ou por equipes com forte presença brasileira.

O projeto busca unir a linguagem visual de grandes plataformas de distribuição digital, como **Steam, Epic Games, Nintendo eShop e PlayStation Store**, com uma identidade visual própria inspirada na cultura brasileira, na lenda da Iara e em elementos relacionados às águas e à natureza brasileira.

---

## 💡 Proposta

O Iara Games foi pensado para funcionar como um mediador entre jogadores e publicadoras de jogos digitais, oferecendo uma experiência de descoberta, navegação e visualização de produtos.

A interface foi desenvolvida considerando padrões encontrados em plataformas consolidadas de distribuição de jogos, mantendo uma organização baseada em:

* Carrossel de jogos em destaque;
* Vitrines de produtos;
* Categorias, que abrem o catálogo filtrado;
* Ofertas;
* Página individual de cada jogo, com galeria, requisitos e jogos semelhantes;
* Avaliações de usuários;
* Sistema de favoritos;
* Carrinho;
* Compra com pagamento pela Stripe;
* Login e cadastro;
* Personalização de preferências.

Além da estrutura visual, o projeto passou a responder às ações do usuário em tempo real e, na fase mais recente, a **vender de verdade** (em modo de teste) por meio de uma API de pagamento.

---

## 🗂️ Estrutura do projeto

```text
iaragames/
├── index.html                 Página inicial
├── catalogo.html              Catálogo (todos os jogos, seções e categorias)
├── global.css
├── css/                       Estilos de cada parte do site
├── formulario/                Login, cadastro e preferências (versão em página)
├── games/
│   ├── compra.html            Página do jogo (React), aberta por ?id=<id>
│   ├── resultado.html         Retorno do pagamento (React)
│   ├── img/<id>/              Plano de fundo e capturas de gameplay de cada jogo
│   └── video/                 Vídeo de gameplay (Dandy Ace)
├── javascript/
│   ├── carrossel.js, header.js, previa.js, sobre.js
│   ├── login.js, cadastro.js, auth-modal.js, preferencias.js
│   ├── catalogo/              Dados do catálogo e página do catálogo (React)
│   └── jogo/                  Página do jogo, detalhes dos jogos e resultado (React)
├── server/                    API de pagamento (Node.js e Express)
│   ├── index.js, stripe.js, catalogo.js
│   └── .env.example
├── imgs/ e gifs/              Imagens do site
├── package.json
└── README.md
```

---

# 🎨 Identidade Visual

A identidade do Iara Games procura unir elementos da natureza brasileira com referências do universo gamer.

O logotipo combina a representação de uma **Vitória-Régia** com o símbolo de desligar, criando uma forma associada à letra **G**, enquanto um elemento lateral representa o **I**.

A Vitória-Régia também aparece como referência visual em elementos da interface, reforçando a associação da marca com as águas brasileiras e com a figura folclórica da Iara.

![Logotipo do Iara Games](imgs/readme/logotipo.png)

---

## 🧠 UX: Experiência do Usuário

O design da plataforma foi inspirado em padrões de interfaces de lojas digitais de jogos.

Durante o desenvolvimento, foram analisadas plataformas como:

* Steam;
* Epic Games Store;
* Nintendo eShop;
* PlayStation Store.

Um dos principais objetivos foi manter uma navegação contínua entre os diferentes blocos da página, facilitando a descoberta de novos jogos sem criar grandes espaços vazios ou concentrar toda a atenção em apenas um elemento.

As vitrines também seguem proporções próximas aos padrões utilizados no mercado de distribuição digital, facilitando a apresentação dos jogos e mantendo consistência visual entre diferentes produtos.

Com a implementação do JavaScript, a experiência foi ampliada para permitir que o usuário interaja diretamente com diversos elementos da interface sem precisar recarregar a página.

---

# 🔤 Tipografia

As fontes utilizadas no projeto são:

### Anton

Utilizada principalmente em títulos e elementos de maior destaque.

A tipografia possui uma aparência forte e blocada, contribuindo para a identidade visual da plataforma e criando maior impacto nos títulos.

### Fira Sans

Utilizada em textos menores e informações complementares.

A fonte possui uma aparência mais neutra e confortável para leitura, mantendo uma boa relação com a Anton e contribuindo para a acessibilidade da interface.

---

# ⚙️ Funcionalidades

O projeto possui interatividade feita com **JavaScript e manipulação do DOM** (home, carrossel, navegação, formulários e login em pop-up) e telas feitas em **React** (catálogo, página do jogo e retorno do pagamento).

Os principais arquivos JavaScript são:

```text
javascript/
├── carrossel.js            Carrossel de banners
├── header.js               Navbar fixa, busca e categorias
├── previa.js, sobre.js     Prévia em GIF e seção Sobre
├── login.js, cadastro.js   Formulários (mostrar senha e validação)
├── auth-modal.js           Login, cadastro e preferências em pop-up
├── preferencias.js         Nome e botão Voltar da página de preferências
├── catalogo/
│   ├── dados.js            Catálogo, categorias e links de cada jogo
│   ├── componentes.js      Componentes React do catálogo
│   └── montar.js, pagina.js
└── jogo/
    ├── pagina.js           Página do jogo (React)
    ├── detalhes.js         Detalhes, galerias e avaliações de cada jogo
    └── resultado.js        Retorno do pagamento (React)
```

---

## 🎞️ 1. Carrossel de banners

**Página:** `index.html`
**Arquivo:** `javascript/carrossel.js`

O carrossel da página inicial passou a ser totalmente interativo.

### Funcionalidades

* Título de seção "Em destaque" no mesmo estilo dos demais títulos do site;
* Banner à esquerda e informações ao lado direito (gêneros em etiquetas, título, traço laranja e descrição);
* O lado direito do banner se funde com o painel, que tem um tom escuro tirado da própria arte de cada jogo (variável `--tint` em cada slide);
* Banner e informações formam um único link; ao passar o mouse a imagem amplia levemente e o traço sob o título cresce;
* Setas anterior/próximo fora do banner (no celular ficam abaixo, ao lado das bolinhas);
* Bolinhas clicáveis, com a ativa alongada;
* Rotação infinita: do último slide vai direto para o primeiro (e vice-versa), sem passar pelos demais;
* Rotação automática a cada 6 segundos, pausada ao passar o mouse ou focar no carrossel;
* Navegação por teclado (← →) e por toque (deslizar o dedo);
* Respeita `prefers-reduced-motion`.

Arquivos: `css/carrossel.css`, `javascript/carrossel.js` e a seção `.destaque` do `index.html`.

### Como visualizar

1. Abra `index.html`;
2. Localize o carrossel principal;
3. Clique nas setas laterais;
4. Clique nas bolinhas abaixo do banner;
5. Teste a navegação até o último slide e avance novamente para verificar o loop infinito.

---

## 🖼️ 2. Galeria de mídia em tela cheia

**Página:** `games/compra.html`
**Arquivos:** `javascript/jogo/pagina.js` e `javascript/jogo/detalhes.js`

A página dos jogos recebeu um sistema de visualização ampliada para imagens e vídeos.

### Funcionalidades

* Ampliação das imagens em modal;
* Visualização do vídeo em destaque;
* Galeria de mídias;
* Seta para exibir mais mídias, que só aparece quando o jogo tem mais de 5 imagens (a galeria mostra até 10);
* Sem vídeo, a primeira imagem ocupa o destaque;
* Fechamento pelo botão `×`;
* Fechamento ao clicar fora da mídia;
* Fechamento utilizando a tecla `Esc`.

A página do jogo é montada em React a partir do parâmetro `id` da URL (por exemplo, `?id=toren`), usando os dados de `javascript/jogo/detalhes.js`.

### Como visualizar

1. Abra `games/compra.html?id=dandy-ace` (troque o `id` para ver outro jogo);
2. Localize a seção de mídias do jogo;
3. Clique em uma das imagens;
4. Observe a abertura da imagem em tela cheia;
5. Clique em **"Ver mais mídias"**;
6. Pressione `Esc` para fechar.

---

## ⭐ 3. Abas e avaliações interativas

**Página:** `games/compra.html`
**Arquivos:** `javascript/jogo/pagina.js` e `javascript/jogo/detalhes.js`

A página do jogo possui uma navegação por abas entre informações do produto e avaliações.

### Funcionalidades

* Aba **"Detalhes"**;
* Aba **"Avaliações"**;
* Alteração dinâmica do conteúdo exibido;
* Sistema de curtir avaliações;
* Sistema de não curtir avaliações;
* Contadores atualizados em tempo real;
* Botões de curtir e não curtir mutuamente exclusivos;
* Expansão e recolhimento da descrição do jogo.

As avaliações de cada jogo vêm de `javascript/jogo/detalhes.js` e são renderizadas em React.

### Como visualizar

1. Abra `games/compra.html?id=dandy-ace` (troque o `id` para ver outro jogo);
2. Localize a navegação entre **"Detalhes"** e **"Avaliações"**;
3. Clique em **"Avaliações"**;
4. Clique no botão de curtir ou não curtir de uma avaliação;
5. Observe a alteração imediata do contador;
6. Clique novamente para remover a interação;
7. Teste também o botão **"Ver mais"** na descrição do jogo.

---

# 🧱 Catálogo, categorias e página do jogo (React)

## 🗃️ Catálogo e categorias

**Página:** `catalogo.html`
**Arquivos:** `javascript/catalogo/dados.js`, `componentes.js` e `pagina.js`

O catálogo reúne as vitrines do site e aceita filtros pela URL:

* `catalogo.html`: todos os jogos (30);
* `catalogo.html?secao=<id>`: uma seção da home (por exemplo, `ofertas`);
* `catalogo.html?categoria=<id>`: uma categoria do menu (`acao`, `aventura`, `rpg` ou `estrategia`).

O menu **Categorias** da navegação leva direto para esses filtros. Cada jogo pertence a uma ou mais categorias, definidas em `dados.js`.

### Como visualizar

1. Abra a página inicial e clique em **Categorias** na navegação;
2. Escolha uma categoria e confira a lista de jogos;
3. Clique em **Ver todos os jogos** para abrir o catálogo completo.

---

## 🎮 Página de cada jogo

**Página:** `games/compra.html?id=<id>`

Cada jogo abre a própria página, montada em React a partir do `id` da URL. Ela reúne capa e plano de fundo próprios, tags, desenvolvedora, nota, galeria, descrição, requisitos mínimos e recomendados, jogos semelhantes e avaliações.

* Os links de cards, vitrines, carrossel e busca já levam o `id` do jogo;
* Um `id` inexistente mostra a tela "Jogo não encontrado";
* O botão **Voltar** retorna à página de onde a pessoa veio;
* Os detalhes de cada jogo (desenvolvedora, lançamento, espaço em disco, requisitos e sinopse) foram pesquisados em páginas oficiais e ficam em `javascript/jogo/detalhes.js`. **As notas e as avaliações de usuários são fictícias.**

Imagens de gameplay e planos de fundo ficam em `games/img/<id>/` (`fundo.*` e `gameplay1.*` em diante).

---

## 🪟 Login e cadastro em pop-up

**Páginas:** `index.html` e `catalogo.html`
**Arquivo:** `javascript/auth-modal.js`

**Entrar** e **Criar conta** abrem um pop-up na própria página, seguido da etapa de preferências. As páginas `formulario/*.html` continuam funcionando como alternativa, e a senha nunca é enviada pela URL.

---

# 🔄 Outras interações implementadas

Além das três principais funcionalidades apresentadas acima, o projeto possui outras interações utilizando JavaScript.

---

## 📌 Navbar fixa durante a rolagem

**Página:** `index.html`
**Arquivo:** `javascript/header.js`

A barra de navegação passa a ficar fixa no topo da tela quando o usuário rola a página.

Isso permite que recursos como busca, categorias e navegação permaneçam acessíveis mesmo durante a exploração do catálogo.

### Como visualizar

1. Abra `index.html`;
2. Role a página para baixo;
3. Observe a navbar permanecer acessível no topo da tela.

---

## ❤️ Favoritos e 🛒 Carrinho

**Página:** `games/compra.html`
**Arquivos:** `javascript/jogo/pagina.js` e `javascript/jogo/detalhes.js`

Os botões de favoritos e carrinho possuem estados interativos.

Ao clicar:

* O ícone altera seu estado visual;
* Uma notificação aparece na tela;
* A mensagem confirma a ação realizada;
* A notificação desaparece automaticamente após alguns segundos.

### Como visualizar

1. Abra `games/compra.html?id=dandy-ace` (troque o `id` para ver outro jogo);
2. Localize os botões de favorito e carrinho;
3. Clique em um deles;
4. Observe a alteração do ícone;
5. Observe a notificação exibida na tela.

---

## 📖 Expandir e recolher descrição

**Página:** `games/compra.html`
**Arquivos:** `javascript/jogo/pagina.js` e `javascript/jogo/detalhes.js`

Descrições extensas são inicialmente limitadas para evitar que a página fique excessivamente longa.

O botão **"Ver mais"** permite expandir o conteúdo, enquanto **"Ver menos"** permite recolhê-lo novamente.

### Como visualizar

1. Abra `games/compra.html?id=dandy-ace` (troque o `id` para ver outro jogo);
2. Localize a descrição do jogo;
3. Clique em **"Ver mais"**;
4. Observe a expansão do conteúdo;
5. Clique em **"Ver menos"** para retornar ao estado original.

---

## 🔐 Mostrar senha e validação de cadastro

**Páginas:**

* `formulario/login.html`
* `formulario/criar conta.html`

**Arquivos:**

* `javascript/login.js`
* `javascript/cadastro.js`

Os formulários receberam interações para melhorar o preenchimento e fornecer feedback imediato ao usuário.

### Mostrar e ocultar senha

O ícone de olho permite alternar entre:

```text
password → text
```

Dessa forma, o usuário consegue visualizar a senha digitada quando necessário.

### Confirmação de senha

No cadastro, a senha e a confirmação são comparadas em tempo real.

O campo recebe indicação visual conforme os valores:

* Senhas diferentes → estado de erro;
* Senhas iguais → estado de sucesso.

O formulário também impede o envio quando as senhas não coincidem.

### Como visualizar

1. Abra `formulario/login.html` ou `formulario/criar conta.html`;
2. Digite uma senha;
3. Clique no ícone de olho;
4. Observe a senha ser exibida/ocultada;
5. No cadastro, preencha a senha e a confirmação;
6. Digite valores diferentes;
7. Observe o estado de erro;
8. Digite valores iguais;
9. Observe o estado de sucesso.

---

# 💳 Pagamento com Stripe (Checkout)

O botão **Comprar** da página de cada jogo abre o checkout da Stripe. A pessoa paga como convidada, sem precisar criar conta na loja, e volta para a página `games/resultado.html`, que confere o status real do pagamento.

## ⚙️ Como funciona

1. A página do jogo (React) envia ao servidor **somente o id do jogo** (`POST /api/checkout`).
2. O servidor (`server/index.js`) busca o nome e o preço no catálogo oficial (`javascript/catalogo/dados.js`), cria a sessão de pagamento na Stripe e devolve o link do checkout. O preço nunca vem do navegador.
3. O navegador redireciona para o checkout da Stripe. Depois do pagamento, a Stripe volta para `games/resultado.html`.
4. A página de resultado consulta `GET /api/pagamento/:id` no servidor, que pergunta o status à Stripe. O que está escrito na URL não é usado como prova de pagamento.

A chave secreta da Stripe fica apenas no servidor, como variável de ambiente, e nunca é enviada ao navegador nem ao repositório.

## 🔐 Segurança

* **Preço só no servidor:** o navegador envia apenas o id do jogo, então ninguém consegue alterar o valor cobrado;
* **Status confirmado na Stripe:** a página de resultado nunca confia no que está escrito na URL;
* **Dados de cartão fora do site:** quem recebe e protege esses dados é a Stripe, na página de pagamento dela;
* **Arquivos internos protegidos:** o servidor não entrega o código do `server/`, as dependências nem arquivos de configuração.

## 🧪 Como testar a compra

No projeto publicado, **não é preciso criar conta na Stripe**:

1. Abra um jogo pago e clique em **Comprar**;
2. Na tela da Stripe, use o cartão de teste `4242 4242 4242 4242`, com qualquer data futura, qualquer CVC e qualquer nome;
3. Ao voltar para a loja, aparece a tela **"Pagamento aprovado!"**.

Para ver uma recusa, use o cartão `4000 0000 0000 0002`. Nenhum valor real é cobrado.

## ⚠️ Limitações atuais

* O pagamento funciona em **modo de teste**;
* A compra é de um jogo por vez, e as compras não ficam salvas em nenhuma conta;
* Carrinho e favoritos são apenas visuais;
* Jogos gratuitos não passam pelo pagamento.

## 🌐 Publicação

O projeto é publicado como um serviço web na **Render**, que executa o servidor Node.js e Express e entrega o site e a API juntos. No plano gratuito, o primeiro acesso depois de um período sem uso pode demorar um pouco para responder.

---

# 🧩 Tecnologias utilizadas

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat\&logo=html5\&logoColor=white)

![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat\&logo=css3\&logoColor=white)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat\&logo=javascript\&logoColor=black)

![React](https://img.shields.io/badge/React-20232A?style=flat\&logo=react\&logoColor=61DAFB)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat\&logo=nodedotjs\&logoColor=white)

![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=flat\&logo=stripe\&logoColor=white)

| Tecnologia            | Utilização                                                 |
| --------------------- | ---------------------------------------------------------- |
| **HTML5**             | Estruturação das páginas e componentes da plataforma       |
| **CSS3**              | Estilização, identidade visual, layouts e responsividade   |
| **JavaScript (ES6+)** | Interatividade e atualização dinâmica da interface         |
| **DOM**               | Seleção, criação e alteração de elementos em tempo real    |
| **React 18**          | Catálogo, página do jogo e retorno do pagamento (via CDN)  |
| **Node.js e Express** | Servidor que entrega o site e expõe a API de pagamento     |
| **Stripe Checkout**   | Pagamento em modo de teste e confirmação do status         |
| **dotenv**            | Leitura da chave secreta a partir do arquivo `.env`        |
| **Font Awesome**      | Ícones utilizados na interface                             |
| **Google Fonts**      | Tipografias Anton e Fira Sans                              |
| **Bootstrap 5**       | Componentes utilizados pontualmente em `preferencias.html` |

---

# ▶️ Como acessar o projeto

O projeto publicado e o repositório com o código estão no [README](../README.md).

---

# 🧪 Como testar as principais funcionalidades

Após abrir a página inicial, recomenda-se testar as interações na seguinte ordem:

### Página inicial e catálogo

* [ ] Abrir o menu **Categorias** e escolher uma categoria;
* [ ] Buscar um jogo pela barra de busca;
* [ ] Abrir **Entrar** e **Criar conta** (pop-up);
* [ ] Navegar pelas setas do carrossel;
* [ ] Clicar nos indicadores do carrossel;
* [ ] Verificar o loop infinito;
* [ ] Rolar a página e verificar a navbar fixa.

### Página do jogo

* [ ] Abrir jogos diferentes e conferir que cada um mostra a própria página;
* [ ] Clicar em uma imagem da galeria;
* [ ] Abrir o vídeo (Dandy Ace);
* [ ] Utilizar "Ver mais mídias" (só aparece em jogos com mais de 5 imagens);
* [ ] Fechar a imagem ou o vídeo com `Esc`;
* [ ] Alternar entre "Detalhes" e "Avaliações";
* [ ] Curtir e não curtir avaliações;
* [ ] Expandir e recolher a descrição;
* [ ] Adicionar o jogo aos favoritos;
* [ ] Adicionar o jogo ao carrinho;
* [ ] Verificar as notificações exibidas;
* [ ] Abrir um jogo semelhante e usar o botão **Voltar**;
* [ ] Clicar em **Comprar** e pagar com o cartão de teste `4242 4242 4242 4242`;
* [ ] Conferir a tela "Pagamento aprovado!" ao voltar do checkout.

### Formulários

* [ ] Abrir a tela de login;
* [ ] Testar o botão de mostrar/ocultar senha;
* [ ] Abrir a tela de cadastro;
* [ ] Testar a confirmação de senha;
* [ ] Verificar o feedback de senha correta/incorreta;
* [ ] Tentar enviar o cadastro com senhas diferentes.

---

# 📈 Evolução do projeto

### Sprint anterior

O Iara Games possuía uma interface construída principalmente com **HTML e CSS**, com foco na estrutura, identidade visual e organização das páginas.

A interface apresentava:

* Página inicial;
* Carrossel visual;
* Vitrines de jogos;
* Categorias;
* Ofertas;
* Página individual de jogo;
* Login;
* Cadastro;
* Preferências.

Entretanto, os elementos ainda não respondiam às ações do usuário.

### Sprint de interatividade

Nesta Sprint, o projeto recebeu uma camada de **JavaScript e manipulação do DOM**, transformando a interface estática em uma experiência interativa.

Foram implementados:

* Carrossel funcional;
* Navegação por indicadores;
* Loop infinito;
* Galeria de mídia;
* Modais de imagem e vídeo;
* Navegação por teclado;
* Sistema de abas;
* Avaliações interativas;
* Curtidas e não curtidas;
* Favoritos;
* Carrinho;
* Notificações;
* Navbar fixa;
* Expansão da descrição;
* Mostrar/ocultar senha;
* Validação de confirmação de senha.

As interações respondem aos eventos do usuário sem a necessidade de recarregar a página.

### Fase atual: React, catálogo e API de pagamento

Nesta fase, o projeto recebeu:

* Página própria para cada um dos 30 jogos, montada em React a partir do `id` da URL;
* Detalhes pesquisados de cada jogo, galerias de gameplay, planos de fundo e avaliações fictícias;
* Menu de categorias que abre o catálogo filtrado, e catálogo com filtros por seção;
* Login, cadastro e preferências em pop-up também no catálogo;
* Ajustes de consistência: links e nomes de pastas, tags que quebravam de linha, senha fora da URL e botão **Voltar** inteligente;
* **API de pagamento com Stripe Checkout**, com servidor Node.js e Express e página de retorno com o status real do pagamento;
* Publicação na Render.

---

# 🎯 Resultado

A implementação do JavaScript permitiu que o Iara Games deixasse de ser apenas um conjunto de páginas estáticas e passasse a apresentar comportamentos semelhantes aos encontrados em plataformas reais de distribuição digital.

A manipulação do DOM foi utilizada para selecionar, criar, modificar e atualizar elementos da interface em resposta a eventos como:

```text
click
scroll
input
submit
keydown
transitionend
```

Dessa forma, cada interação foi desenvolvida com o objetivo de resolver um problema específico de usabilidade e fornecer **feedback visual imediato** ao usuário.

Com a fase atual, o projeto também passou a integrar uma **API externa real**: o servidor cria a sessão de pagamento na Stripe, a pessoa paga na página segura da Stripe e a loja confirma o status direto na API antes de exibir o resultado.

---

# 📚 Referências

As principais referências utilizadas para pesquisa de linguagem visual, organização de lojas digitais e experiência do usuário foram:

* [Steam](https://store.steampowered.com/)
* [Nintendo eShop](https://www.nintendo.com/us/store/)
* [PlayStation Store](https://www.playstation.com/pt-br/ps5/games/)
* [Epic Games Store](https://store.epicgames.com/pt-BR/?lang=pt-BR)

---

# 👨‍💻 Repositório

Os links do repositório no GitHub e do projeto publicado estão no [README](../README.md).

---

## 📌 Status do projeto

**Concluído: React, catálogo por categorias e API de pagamento (Stripe, modo de teste)**

O projeto conta com a estrutura visual em HTML/CSS, interatividade em JavaScript, telas em React e uma API de pagamento funcionando em modo de teste. Ainda não há contas de usuário persistentes, histórico de compras nem carrinho com vários itens: login, cadastro, carrinho e favoritos continuam apenas visuais.

---
