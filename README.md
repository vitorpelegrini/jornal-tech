# Jornal Tech

### **Autor:** Vitor Pelegrini de Souza

Este projeto tem como objetivo desenvolver uma aplicação web responsiva para um portal de notícias de tecnologia. A aplicação possuirá uma área pública para os visitantes lerem notícias e acompanharem cotações de criptomoedas, além de um painel administrativo para o gerenciamento de conteúdo (criação, edição, publicação e exclusão de notícias).

O projeto será construído progressivamente ao longo da disciplina, implementando boas práticas de desenvolvimento frontend com HTML, CSS (Sass) e JavaScript, e consumindo uma API Fake via JSON Server e uma API Pública externa.

## 📚 Documentação do Projeto

Para entender as regras de negócio, o escopo e a arquitetura técnica da aplicação, consulte os documentos abaixo:

- [📄 Product Requirements Document (PRD)](./docs/prd.md) - Visão geral, atores e histórias de usuário.
- [🛠️ Especificação Técnica (Tech Spec)](./docs/spec.md) - Diagrama de banco de dados (DER), dicionário de dados e rotas da API.
- [🎨 Design System](./docs/design-system.md) - Definição de cores, tipografia e componentes visuais.

## 🎨 Design

- [🖼️ Protótipo Navegável (Stitch)](https://stitch.withgoogle.com/projects/9149274644485808707)

## 🌐 Site em Produção - GitHub Pages

https://vitorpelegrini.github.io/jornal-tech/

## 💻 Tecnologias e Dependências

A stack tecnológica foi escolhida para atender 100% aos requisitos (IDs) da disciplina:

- **Framework CSS:** Bootstrap 5.3.8 (Utilizando Grid/Flexbox nativos e componentes prontos como Navbar, Modal, Cards e Carousel).
  - *Justificativa:* O Bootstrap foi escolhido por ser o framework mais popular do mercado, com excelente suporte à responsividade através do seu sistema de grid flexível. Ele fornece componentes visuais ricos (modais, carrosséis) essenciais para um portal de notícias, possui farta documentação, comunidade ativa e licenciamento aberto, o que acelera significativamente a prototipação.
- **Pré-processador CSS:** Sass (SCSS) com variáveis e mixins.
- **JavaScript:** 
  - Vanilla JS (ES6+)
  - **jQuery 4.0** - Para manipulação do DOM e animações.
  - **jQuery Mask Plugin** - Para máscaras em formulários.
- **APIs e Dados:**
  - **JSON Server:** Para simular uma API REST (Backend Fake) contendo as notícias e usuários.
  - **CoinGecko API e AwesomeAPI:** APIs Públicas reais para exibir as cotações de criptomoedas e de câmbio (USD/BRL) atualizadas.
    - *Justificativa:* Após reavaliação focada no melhor custo-benefício para projetos acadêmicos brasileiros, optou-se por uma arquitetura combinada: a **CoinGecko API** oferece a maior cobertura de criptomoedas e excelente documentação em seu plano gratuito (Demo), enquanto a **AwesomeAPI** fornece a cotação do dólar (USD/BRL) de forma simples, em tempo quase real e sem necessidade de autenticação complexa. Essa combinação robusta atende perfeitamente à exibição de dados financeiros em nossa aplicação.
  - **Web Storage:** `localStorage` para manter o usuário logado e persistir preferências.
- **Ferramentas de Desenvolvimento:** Node.js, NPM, ESLint e Prettier.

## ✅ Checklist | Indicadores de Desempenho (ID) dos Resultados de Aprendizagem (RA)

#### RA1 - Utilizar Frameworks CSS para estilização de elementos HTML e criação de layouts responsivos.

- [x] ID 01 - Prototipa interfaces adaptáveis para no mínimo os tamanhos de tela mobile e desktop, usando ferramentas de design tradicionais (Figma, Quant UX ou Sketch) ou IA (Stitch).
- [x] ID 02 - Implementa layout responsivo com Framework CSS (Bootstrap, Materialize, Tailwind + DaisyUI) usando Flexbox ou Grid do próprio framework.
- [x] ID 03 - Implementa layout responsivo com CSS puro, usando Flexbox ou Grid Layout.
- [x] ID 04 - Utiliza componentes prontos de um Framework CSS (ex.: card, button) e componentes JavaScript do framework (ex.: modal, carousel).
- [x] ID 05 - Cria layout fluido usando unidades relativas (vw, vh, %, em, rem) no lugar de unidades fixas (px).
- [x] ID 06 - Aplica um Design System consistente (cores, tipografia, padrões de componentes) em toda a aplicação.
- [x] ID 07 - Utiliza Sass (SCSS) com ou sem framework, aplicando variáveis, mixins e funções para modularizar o código.
- [x] ID 08 - Aplica tipografia responsiva (media queries mobile first) ou tipografia fluida (função clamp() + unidades relativas).
- [x] ID 09 - Aplica técnicas de responsividade de imagens usando CSS (object-fit, containers com unidades relativas).
- [x] ID 10 - Otimiza imagens usando formatos modernos (WebP) e carregamento adaptativo (srcset, picture, ou parâmetros do Cloudinary).

#### RA2 - Realizar tratamento de formulários e aplicar validações customizadas no lado cliente.

- [x] ID 11 - Implementa validação HTML nativa (campos obrigatórios, tipos, limites de caracteres) com mensagens de erro/sucesso no lado cliente.
- [x] ID 12 - Aplica expressões regulares (REGEX) para validações customizadas (e-mail, telefone, datas, etc.)
- [x] ID 13 - Utiliza elementos de seleção em formulários (checkbox, radio, select) para coleta de dados.
- [x] ID 14 - Implementa leitura e escrita no Web Storage (localStorage/sessionStorage) para persistir dados localmente.

#### RA3 - Aplicar ferramentas para otimização do processo de desenvolvimento web.

- [x] ID 15 - Configura ambiente com Node.js e NPM para gerenciamento de pacotes e dependências.
- [x] ID 16 - Utiliza boas práticas de versionamento no Git/GitHub (branch main ou branches específicos, uso de .gitignore).
- [x] ID 17 - Mantém um README.md padronizado, conforme template da disciplina, com checklist preenchido.
- [x] ID 18 - Organiza arquivos do projeto de forma modular, seguindo padrão de exemplo fornecido.
- [x] ID 19 - Configura linters e formatadores (ESLint, Prettier) para manter qualidade e padronização do código.

#### RA4 - Aplicar bibliotecas de funções e componentes em JavaScript para aprimorar a interatividade de páginas web.

- [x] ID 20 - Utiliza jQuery para manipulação do DOM e interatividade (eventos, animações, manipulação de elementos)
- [x] ID 21 - Integra e configura um plugin jQuery relevante (ex.: jQuery Mask Plugin).

#### RA5 - Efetuar requisições assíncronas para uma API fake e APIs públicas, permitindo a obtenção e manipulação de dados dinamicamente.

- [x] ID 22 - Realiza requisições assíncronas para uma API fake (ex.: JSON Server) para persistir dados de um formulário.
- [x] ID 23 - Realiza requisições assíncronas para uma API fake para exibir dados na página.
- [x] ID 24 - Realiza requisições assíncronas para APIs públicas reais (OpenWeather, ViaCEP etc.), exibindo os dados e tratando erros.

## 📂 Estrutura de Arquivos

```
jornal-tech/
├── index.html              ← Página Inicial (Home)
├── noticia.html             ← Página de Leitura de artigo
├── login.html               ← Login do Painel Admin
├── admin.html               ← Painel Administrativo (CRUD)
├── db.json                  ← Banco de dados (JSON Server)
├── package.json             ← Dependências e scripts NPM
├── .eslintrc.json           ← Configuração ESLint (ID 19)
├── .prettierrc              ← Configuração Prettier (ID 19)
├── .gitignore               ← Arquivos ignorados pelo Git
├── scss/                    ← Sass/SCSS (ID 07)
│   ├── _variables.scss      ← Tokens do Design System
│   ├── _mixins.scss         ← Mixins reutilizáveis
│   ├── _typography.scss     ← Tipografia fluida (ID 08)
│   ├── _components.scss     ← Componentes customizados
│   └── main.scss            ← Arquivo de entrada
├── css/
│   └── main.css             ← CSS compilado (gerado)
├── js/
│   ├── utils.js             ← Funções utilitárias
│   ├── app.js               ← Lógica da Home
│   ├── noticia.js           ← Lógica da Página de Leitura
│   ├── login.js             ← Lógica de Login/Auth
│   └── admin.js             ← Lógica do Painel Admin
├── docs/
│   ├── prd.md               ← Documento de Requisitos
│   ├── spec.md              ← Especificação Técnica
│   └── design-system.md     ← Design System
└── stitch_raw/              ← Protótipos HTML do Stitch (referência)
```

## 📋 Onde Cada ID é Implementado

| ID | Arquivo(s) | Descrição |
|----|-----------|-----------|
| 01 | `stitch_raw/` | Protótipos criados no Google Stitch |
| 02 | `index.html` (linhas 148-150) | Bootstrap Grid: `row-cols-1 row-cols-md-2 row-cols-lg-3` |
| 03 | `scss/_components.scss`, `index.html` (footer) | CSS Grid Layout puro: `display: grid; grid-template-columns` |
| 04 | `index.html`, `admin.html` | Carousel, Modal, Navbar, Cards do Bootstrap |
| 05 | `scss/_variables.scss`, `scss/_typography.scss` | Unidades rem, %, vw em todas as definições |
| 06 | `scss/_variables.scss` | Design System completo (cores, tipografia, forma) |
| 07 | `scss/` (todos os partials) | Variáveis (`$primary`), mixins (`@mixin cloud-shadow`) |
| 08 | `scss/_typography.scss` | `font-size: clamp(1.8rem, 4vw, 2.5rem)` |
| 09 | `scss/_mixins.scss`, `scss/_components.scss` | `object-fit: cover`, containers relativos |
| 10 | `noticia.html`, `js/noticia.js` | `<picture>` + `<source srcset>` + `loading="lazy"` |
| 11 | `login.html`, `admin.html` | `required`, `type="email"`, `minlength` nos forms |
| 12 | `js/login.js`, `js/admin.js` | REGEX: `/^[a-zA-Z0-9._%+-]+@...$/` (email), `/^[A-Z]/ (título)` |
| 13 | `login.html` (checkbox), `admin.html` (select) | Checkbox "Lembrar acesso", Select de status |
| 14 | `js/login.js`, `js/utils.js` | `localStorage.setItem('jornaltech_admin', ...)` |
| 15 | `package.json` | Scripts npm, dependências, devDependencies |
| 16 | `.gitignore`, repositório Git | Branch main, .gitignore configurado |
| 17 | `README.md` | Este arquivo, com checklist preenchido |
| 18 | Estrutura acima | Organização modular (scss/, js/, docs/) |
| 19 | `.eslintrc.json`, `.prettierrc`, `package.json` | ESLint + Prettier configurados com scripts |
| 20 | `js/app.js`, `js/admin.js`, `js/login.js` | jQuery: `fadeIn`, `fadeOut`, `animate`, `on('click')` |
| 21 | `admin.html`, `js/admin.js` | jQuery Mask Plugin: `$('#news-date-input').mask('00/00/0000')` |
| 22 | `js/admin.js`, `js/login.js` | POST/PUT/DELETE em `localhost:3000/noticias` |
| 23 | `js/app.js`, `js/admin.js` | GET em `localhost:3000/noticias` |
| 24 | `js/app.js`, `js/noticia.js` | CoinGecko API (crypto) + AwesomeAPI (USD/BRL) |

## 🚀 Como Executar o Projeto

1. Clone o repositório: `git clone https://github.com/vitorpelegrini/jornal-tech.git`
2. Acesse a pasta do projeto: `cd jornal-tech`
3. Instale as dependências: `npm install`
4. Inicie o ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```
   > Este comando inicia simultaneamente o **Sass watch** (compilação automática) e o **JSON Server** na porta 3000.
5. Abra o arquivo `index.html` no seu navegador ou utilize a extensão **Live Server** do VS Code.

### Credenciais de Acesso ao Painel Admin

| Campo | Valor |
|-------|-------|
| **E-mail** | `admin@jornaltech.com` |
| **Senha** | `admin123` |

### Scripts NPM Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia Sass watch + JSON Server |
| `npm run sass:build` | Compila SCSS para CSS minificado |
| `npm run sass:watch` | Compila SCSS com watch (auto-reload) |
| `npm run json:server` | Inicia o JSON Server na porta 3000 |
| `npm run lint` | Executa ESLint nos arquivos JS |
| `npm run format` | Formata arquivos com Prettier |
