# Relatório Técnico — NexoGestão (Sistema de Cadastro de Clientes)

## 1. Objetivo

Este projeto tem como propósito desenvolver a interface gráfica de um sistema
de gestão voltado ao cadastro e à consulta de clientes, utilizando
exclusivamente HTML5 e CSS3, com JavaScript restrito a pequenas interações de
apoio. O sistema simula um cenário real de uso corporativo: um usuário
preenche um formulário para registrar um cliente e, em seguida, pode consultar
a base já cadastrada em formato de tabela. O foco da atividade não é a lógica
de negócio (não há back-end), mas sim a construção de uma interface bem
estruturada, semântica, acessível e responsiva.

## 2. Estrutura semântica

A página foi organizada seguindo o modelo de documento HTML5 recomendado,
evitando o uso indiscriminado de `<div>`:

- **`<header>`** concentra a identidade visual do sistema (logotipo e título)
  e o **`<nav>`**, a navegação principal. Separar esses elementos do restante
  do conteúdo comunica claramente ao navegador, a mecanismos de busca e a
  tecnologias assistivas que ali está a navegação global do site.
- **`<main>`** delimita o conteúdo central e único da página, o que ajuda
  leitores de tela a pular diretamente para o conteúdo relevante,
  ignorando cabeçalho e rodapé.
- **`<section>`** foi usada para dividir os dois grandes blocos funcionais —
  Cadastro de Cliente e Clientes Cadastrados — cada uma com seu próprio
  `<h2>`, reforçando a hierarquia de conteúdo.
- **`<form>`** e **`<label>`** tornam o formulário utilizável por qualquer
  pessoa: a `<label>` associada via `for`/`id` garante que, ao tocar ou clicar
  no texto do campo, o foco vá para o `<input>` correspondente — o que também
  é fundamental para leitores de tela.
- **`<table>`, `<thead>` e `<tbody>`** estruturam os dados tabulares de forma
  que o navegador (e o leitor de tela) entenda a relação entre cabeçalhos de
  coluna e cada célula de dado, o que não seria possível de forma confiável
  usando apenas `<div>` estilizadas.
- **`<footer>`** encerra a página com as informações institucionais,
  separando claramente metadados (instituição, disciplina, autor) do
  conteúdo funcional do sistema.

Esses elementos melhoram a **organização** do código (cada bloco tem um papel
único e previsível), o **SEO** (motores de busca conseguem interpretar a
importância relativa de cada trecho da página), a **acessibilidade**
(tecnologias assistivas navegam pela página por região, não apenas
linearmente) e a **manutenção** (um desenvolvedor que nunca viu o projeto
consegue localizar rapidamente onde está cada parte, sem depender de nomes de
classe).

## 3. CSS

O arquivo `style.css` foi organizado em blocos comentados (Reset, Header,
Navegação, Formulário, Tabela, Footer, Responsividade), o que facilita
localizar e alterar qualquer parte do estilo sem afetar as demais.

- **Flexbox** foi usado nos componentes que exigem alinhamento em uma única
  direção, como o cabeçalho (logotipo, título e menu na mesma linha), a lista
  de navegação, os botões de ação do formulário e os campos individuais.
- **CSS Grid** foi usado onde o layout precisa de duas dimensões, como a
  grade de campos do formulário (duas colunas em telas maiores) e as
  estatísticas exibidas na seção inicial.
- **Variáveis CSS** (`:root`) centralizam cores, espaçamentos, tipografia e
  sombras, evitando a repetição de valores "mágicos" espalhados pelo arquivo
  e facilitando qualquer ajuste futuro de identidade visual.
- **Media queries** foram definidas nos pontos de quebra solicitados (1200px,
  992px, 768px e 576px), progressivamente simplificando o layout: de um
  formulário em duas colunas e menu horizontal, até um formulário em coluna
  única, botões em largura total, menu vertical retrátil e tabela com
  rolagem horizontal — garantindo uso confortável tanto em desktop quanto em
  tablets e celulares.

## 4. Acessibilidade

Todos os campos do formulário possuem `<label>` associada corretamente, o que
permite que o clique no texto ative o campo e que leitores de tela anunciem o
propósito de cada entrada. O contraste de cores foi definido para atender a
boa legibilidade (texto escuro sobre fundo claro nas seções de conteúdo, texto
claro sobre azul escuro no cabeçalho de destaque), e o foco de teclado é
sempre visível graças ao uso de `:focus-visible` com contorno de cor
contrastante. A hierarquia de títulos segue uma ordem lógica única (`h1` →
`h2`), sem saltos de nível, e atributos ARIA (`aria-expanded`,
`aria-controls`, `role="status"`, `aria-live="polite"`) complementam o HTML
semântico nos poucos pontos em que há comportamento dinâmico, como o menu
mobile e a mensagem de confirmação do formulário.

## 5. Conclusão

A interface desenvolvida atende integralmente aos requisitos propostos: é
construída somente com HTML5 semântico e CSS3 puro, sem frameworks ou
bibliotecas externas; organiza o cadastro e a consulta de clientes em seções
bem definidas; aplica um sistema visual consistente baseado em variáveis CSS;
e se adapta corretamente a diferentes tamanhos de tela, do desktop ao
celular. O resultado é um sistema fictício, mas plausível, que demonstra na
prática os conceitos de semântica, acessibilidade, responsividade e
organização de código trabalhados na disciplina.
