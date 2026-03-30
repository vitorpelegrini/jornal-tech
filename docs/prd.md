# 📄 Product Requirements Document (PRD) - Jornal Tech

## 1. Identificação
**Nome Completo:** Vitor Pelegrini de Souza
**Tema do Projeto:** Jornal Tech - Site de Notícias de Tecnologia

## 2. Visão Geral e Objetivo
O **Jornal Tech** é uma aplicação web que atua como um portal centralizado para notícias do mundo da tecnologia e mercado de criptomoedas. 
Ele resolve a necessidade dos usuários se manterem informados sobre os acontecimentos recentes do setor tecnológico de forma rápida e acessível. Além disso, fornece uma plataforma administrativa robusta para que os editores do jornal possam gerenciar todo o conteúdo publicado, com controle de status das publicações.

## 3. Atores do Sistema

- **Visitante:** Usuário público que acessa o portal para ler notícias, ver os destaques e acompanhar as cotações de criptomoedas.
- **Administrador:** Usuário logado (jornalista/editor) responsável por criar, revisar, publicar ou remover notícias do portal.

## 4. Histórias de Usuário e Escopo

### 📰 Épico 1: Área Pública (Portal de Notícias)

- **US01 - Acompanhar Cotações:** Como Visitante, quero ver no cabeçalho a cotação atualizada de criptomoedas (como Bitcoin e Ethereum), para acompanhar as tendências de valorização do mercado sem sair do site.
- **US02 - Visualizar Destaques:** Como Visitante, quero ver as principais notícias em destaque através de um carrossel na página inicial, para saber rapidamente os tópicos mais relevantes do momento.
- **US03 - Histórico de Notícias:** Como Visitante, quero visualizar a lista das últimas notícias (limitada a 10 por página), podendo navegar pela paginação, para explorar conteúdos anteriores.
- **US04 - Ler Notícia Completa:** Como Visitante, quero clicar em um card de notícia para ser redirecionado a uma página dedicada, onde poderei ler o conteúdo completo da matéria.

### 🔐 Épico 2: Autenticação

- **US05 - Acesso Administrativo:** Como Administrador, quero acessar uma página de login e informar minhas credenciais para ser redirecionado ao Painel Administrativo.

### ⚙️ Épico 3: Gestão de Conteúdo (Painel Administrativo)

- **US06 - Listagem de Notícias:** Como Administrador logado, quero ver todas as notícias cadastradas em uma tabela organizada e paginada (máx 10 itens), mostrando foto de capa, título e status, para gerenciar os conteúdos existentes.
- **US07 - Criar Nova Notícia:** Como Administrador, quero preencher um formulário em um modal para cadastrar uma nova notícia.
  - *Critérios de Aceitação:* A notícia recém-criada deve, por padrão, ficar com o status "pendente", não aparecendo na área pública.
- **US08 - Controle de Publicação:** Como Administrador, quero alterar o status de uma notícia entre "pendente", "publicado" e "despublicado", para ter total controle sobre o que é exibido na página inicial do site.
- **US09 - Editar e Deletar Notícias:** Como Administrador, quero ter botões de "Editar" e "Deletar" na tabela, podendo alterar dados de uma notícia existente (reabrindo o modal preenchido) ou excluí-la definitivamente do sistema.
