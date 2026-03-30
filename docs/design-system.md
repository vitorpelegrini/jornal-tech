# 🎨 Design System - Jornal Tech

Este documento define os padrões visuais e de interface (UI) da aplicação Jornal Tech, garantindo consistência em todas as páginas e atendendo ao requisito de Design System (ID 06) e uso de Sass (ID 07).

## 1. Identidade Visual (Cores)

O esquema de cores foi escolhido para transmitir seriedade, modernidade e foco na leitura (típico de portais de notícias de tecnologia, inspirado no G1 e TechCrunch). As cores serão mapeadas em variáveis Sass (`_variables.scss`).

- **Cor Primária:** `#0d6efd` (Azul Tech) - Usada em botões principais, links e destaques ativos.
- **Cor Secundária:** `#6c757d` (Cinza Neutro) - Usada para textos secundários, datas e categorias.
- **Cor de Fundo (Background):** `#f8f9fa` (Off-white) - Fundo geral do site para descanso visual.
- **Cor de Fundo Escura (Header/Footer):** `#212529` (Quase Preto) - Para o cabeçalho principal e rodapé.
- **Cor de Texto Principal:** `#333333` (Cinza Escuro) - Para títulos e corpo das notícias (maior contraste e legibilidade).
- **Cor de Alerta/Status:**
  - Sucesso (Publicado): `#198754` (Verde)
  - Pendente/Aviso: `#ffc107` (Amarelo)
  - Erro/Despublicado: `#dc3545` (Vermelho)

## 2. Tipografia

Para garantir legibilidade em diferentes dispositivos (ID 08), utilizaremos fontes sem serifa modernas importadas do Google Fonts.

- **Fonte Principal (Títulos e Destaques):** `Roboto`, sans-serif. Pesos: 500, 700.
- **Fonte Secundária (Corpo do Texto e Parágrafos):** `Open Sans`, sans-serif. Pesos: 400, 600.
- **Escala Tipográfica (Fluida com clamp):**
  - Título Principal (H1): `clamp(1.8rem, 4vw, 2.5rem)`
  - Título de Seção (H2): `clamp(1.5rem, 3vw, 2rem)`
  - Título de Card (H3): `1.25rem`
  - Corpo de Texto (p): `1rem` (16px base)
  - Texto Pequeno (small, datas): `0.875rem`

## 3. Componentes Base (Bootstrap Customizado)

A base dos componentes será o **Bootstrap 5**, que será customizado via classes CSS e Sass para ter a cara do nosso projeto.

- **Navbar (Header):** Fundo escuro (`#212529`), links em branco com hover na Cor Primária. Incluirá uma "ticker tape" (faixa contínua) no topo para a API de Cotação de Criptomoedas.
- **Cards de Notícia:** 
  - Bordas arredondadas suaves (`border-radius: 8px`).
  - Sombra leve no hover (`box-shadow`) para interatividade.
  - Imagem de capa com `object-fit: cover` (ID 09).
- **Botões:** 
  - `btn-primary` usando a Cor Primária, sem bordas pesadas.
  - `btn-outline` para ações secundárias.
  - Efeito de transição suave de 0.3s no hover.
- **Tabelas (Painel Admin):** Estilo `table-hover` do Bootstrap, com alinhamento vertical centralizado para as imagens em miniatura.
- **Formulários e Modais:** Campos de input com bordas sutis e foco destacado usando a Cor Primária (sem outline padrão do browser). Modais centralizados na tela para criação/edição de notícias.

## 4. Espaçamento e Grid (Layout Responsivo)

- **Grid System:** Utilizaremos o sistema de Grid de 12 colunas do Bootstrap (ID 02).
- **Espaçamentos (Paddings/Margins):** Uso de classes utilitárias baseadas em `rem` (ex: `p-3`, `mb-4`) para manter proporções consistentes.
- **Breakpoints (Mobile First):**
  - Pequeno (Mobile): `< 576px`
  - Médio (Tablet): `≥ 768px`
  - Grande (Desktop): `≥ 992px`
  - Extra Grande: `≥ 1200px`