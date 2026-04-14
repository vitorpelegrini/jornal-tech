# 📄 PRD - Jornal Tech

## 1. Visão Geral

**Jornal Tech** é um portal de notícias de tecnologia focado em curadoria editorial precisa. O sistema permite que visitantes leiam notícias e acompanhem cotações de criptomoedas em tempo real, enquanto administradores gerenciam o conteúdo através de um painel protegido por autenticação.

## 2. Atores

| Ator | Descrição |
|------|-----------|
| **Visitante** | Usuário público que acessa o portal para ler notícias e visualizar cotações |
| **Administrador** | Usuário autenticado com permissão para criar, editar, publicar e excluir notícias |

## 3. Histórias de Usuário

### Área Pública (Visitante)

- **US-01**: Como visitante, posso ver as cotações de criptomoedas (BTC, ETH, SOL) e câmbio (USD/BRL) em tempo real no ticker bar superior.
- **US-02**: Como visitante, posso navegar entre as notícias publicadas através do carrossel de destaques na página inicial.
- **US-03**: Como visitante, posso visualizar todas as notícias publicadas em um grid de cards com paginação.
- **US-04**: Como visitante, posso clicar em uma notícia e ler o conteúdo completo com layout editorial (barra de progresso de leitura, drop cap, notícias relacionadas).
- **US-05**: Como visitante, posso acessar a página de login para entrar no painel administrativo.

### Área Administrativa (Administrador)

- **US-06**: Como admin, posso fazer login com e-mail e senha para acessar o painel.
- **US-07**: Como admin, posso criar novas notícias preenchendo título, conteúdo, URL de imagem e status.
- **US-08**: Como admin, posso editar notícias existentes.
- **US-09**: Como admin, posso excluir notícias permanentemente.
- **US-10**: Como admin, posso publicar ou despublicar notícias alterando seu status.
- **US-11**: Como admin, posso fazer logout para encerrar minha sessão.

## 4. Funcionalidades Implementadas

| Feature | Status | Página |
|---------|--------|--------|
| Ticker de cotações crypto (CoinGecko API) | ✅ | `index.html`, `noticia.html` |
| Cotação USD/BRL (AwesomeAPI) | ✅ | `index.html`, `noticia.html` |
| Carrossel de destaques (Bootstrap Carousel) | ✅ | `index.html` |
| Grid de notícias com paginação | ✅ | `index.html` |
| Página de leitura com progress bar | ✅ | `noticia.html` |
| Login com validação REGEX | ✅ | `login.html` |
| CRUD de notícias (Create, Read, Update, Delete) | ✅ | `admin.html` |
| Gerenciamento de status (publicar/despublicar) | ✅ | `admin.html` |
| Persistência de sessão (localStorage) | ✅ | `login.html`, `admin.html` |
