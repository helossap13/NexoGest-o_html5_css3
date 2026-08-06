# NexoGestão — Sistema de Cadastro de Clientes

Interface gráfica para um sistema de gestão, desenvolvida como atividade acadêmica,
com foco em HTML5 semântico, CSS3 moderno e boas práticas de acessibilidade e
responsividade.

## Descrição do projeto

O NexoGestão é um painel fictício de gestão de clientes. A aplicação permite:

- cadastrar um novo cliente por meio de um formulário validado;
- consultar uma listagem de clientes já cadastrados, com status (Ativo, Inativo,
  Pendente).

O projeto foi construído inteiramente com HTML5 e CSS3, sem frameworks (como
Bootstrap) e sem bibliotecas externas. Um pequeno arquivo JavaScript é usado
apenas para duas interações pontuais: abrir/fechar o menu no celular e exibir
uma mensagem de confirmação ao salvar o formulário — não há frameworks nem
dependências.

## Tecnologias utilizadas

- **HTML5** — estrutura semântica da página.
- **CSS3** — layout (Flexbox e Grid), variáveis (`:root`) e responsividade
  (media queries).
- **JavaScript (vanilla)** — apenas para o menu mobile e o feedback do
  formulário, sem frameworks ou bibliotecas.
- **Google Fonts** (Poppins e Inter) — carregadas via `<link>`, sem impacto no
  restante do código.

## Estrutura de pastas

```
Projeto/
│── index.html
│── css/
│      style.css
│── js/
│      script.js
│── imagens/
│      logo.svg
│── README.md
│── relatorio.md
```

> **Nota sobre o logotipo:** o briefing original previa `imagens/logo.png`.
> Como o logotipo é fictício e não há uma imagem real a ser usada, ele foi
> gerado como `logo.svg` (vetor, leve e nítido em qualquer resolução) em vez
> de um arquivo `.png`. A troca não afeta o restante da estrutura pedida.

## Como executar

1. Baixe ou copie a pasta `Projeto` completa (mantendo a estrutura de
   subpastas).
2. Abra o arquivo `index.html` diretamente em qualquer navegador moderno
   (Chrome, Firefox, Edge, Safari).
3. Não é necessário instalar dependências, rodar servidor local ou qualquer
   outra configuração.

## Principais recursos

- Cabeçalho fixo (`sticky`) com logotipo e menu de navegação.
- Menu responsivo que se transforma em menu vertical no celular.
- Formulário de cadastro organizado em grupos (`fieldset`), com validação
  nativa do HTML5 (`required`, `pattern`, `type="email"`, etc.).
- Feedback de sucesso/erro ao enviar o formulário.
- Tabela de clientes cadastrados com 10 registros fictícios e selos de status
  coloridos.
- Rodapé com dados institucionais fictícios.

## Boas práticas implementadas

- Uso de tags semânticas (`header`, `nav`, `main`, `section`, `form`, `table`,
  `footer`) em vez de `div` genéricas sempre que possível.
- Separação total entre estrutura (HTML), apresentação (CSS) e comportamento
  (JS).
- CSS organizado por comentários de seção e variáveis centralizadas em
  `:root`, evitando valores repetidos.
- Nomenclatura de classes consistente, no padrão BEM simplificado (ex.:
  `secao__cabecalho`, `botao--primario`).
- Sem código repetido: os grupos do formulário e os estilos dos campos são
  reaproveitados via classes comuns.

## Semântica utilizada

- `<header>` para a identidade do sistema e `<nav>` para a navegação
  principal.
- `<main>` delimitando o conteúdo central, dividido em duas `<section>`
  (Cadastro e Clientes).
- `<form>` com `<fieldset>`/`<legend>` agrupando campos relacionados
  (dados pessoais, contato, endereço) e `<label>` associada a cada
  `<input>`/`<select>`.
- `<table>` com `<caption>`, `<thead>` e `<tbody>` para a listagem de
  clientes, com `scope="col"` nos cabeçalhos.
- `<footer>` para as informações institucionais.

## Responsividade

O layout foi construído com Flexbox e CSS Grid e testado nos seguintes
pontos de quebra:

| Breakpoint | Comportamento |
|---|---|
| `1200px` | Largura máxima do conteúdo se adapta à tela. |
| `992px`  | Estatísticas do início e campos do formulário passam para menos colunas. |
| `768px`  | Menu de navegação vira menu vertical (com botão "hambúrguer"). |
| `576px`  | Formulário em uma única coluna; botões em largura total; tabela com rolagem horizontal. |

## Acessibilidade

- Todas as `label` estão corretamente associadas aos campos via `for`/`id`.
- Contraste de cores validado para texto e fundo (paleta azul sobre branco e
  cinza-escuro sobre branco).
- Foco visível (`:focus-visible`) em todos os elementos interativos.
- Navegação 100% possível via teclado (Tab/Shift+Tab/Enter).
- Atributos ARIA usados quando necessário: `aria-label`, `aria-expanded`,
  `aria-controls` no botão do menu; `role="status"` e `aria-live="polite"`
  na mensagem de confirmação do formulário.
- Hierarquia de títulos respeitada (`h1` único na página, `h2` para cada
  seção principal).

## Autor

Projeto acadêmico desenvolvido por João da Silva (autor fictício), para a
disciplina de Desenvolvimento Web Front-end.
