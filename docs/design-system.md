# 🎨 Design System - Jornal Tech

Design System completo da identidade visual **"The Precise Curator"**, implementado no protótipo via Google Stitch e migrado para Bootstrap 5 + Sass.

## 1. Paleta de Cores

### Cores Primárias

| Token | Valor HEX | Uso |
|-------|-----------|-----|
| `$primary` | `#0d6efd` | Botões, links, badges, CTAs |
| `$primary-dark` | `#0057cd` | Navbar brand, hover states |
| `$secondary` | `#6c757d` | Textos secundários, placeholders |

### Superfícies

| Token | Valor HEX | Uso |
|-------|-----------|-----|
| `$body-bg` | `#f8f9fa` | Fundo geral da página |
| `$surface-container-lowest` | `#ffffff` | Cards, modais, login card |
| `$surface-container-low` | `#f3f4f5` | Inputs, table headers |
| `$surface-container` | `#edeeef` | Hover em tabelas |
| `$dark` | `#212529` | Navbar admin, ticker bar |

### Cores de Status

| Token | Valor HEX | Uso |
|-------|-----------|-----|
| `$success` | `#198754` | Status "Publicado", ações de publicar |
| `$warning` | `#ffc107` | Status "Pendente" |
| `$danger` | `#dc3545` | Status "Despublicado", ações de deletar |
| `$error` | `#ba1a1a` | Mensagens de erro |

### Dark Surfaces (Footer / Ticker)

| Elemento | Cor de Fundo | Texto |
|----------|-------------|-------|
| Ticker Bar | `#0a0e17` | `rgba(255,255,255,0.4)` para labels |
| Footer | `#0a0e17` | `rgba(255,255,255,0.45)` para links |
| Variação Positiva | - | `#34d399` (verde) |
| Variação Negativa | - | `#f87171` (vermelho) |

## 2. Tipografia

| Família | Uso | Peso | Arquivo SCSS |
|---------|-----|------|-------------|
| **Manrope** | Headlines (h1-h4), brand, hero | 700, 800 | `_variables.scss` |
| **Inter** | Body text, labels, menus, inputs | 300-700 | `_variables.scss` |

### Escala Tipográfica Fluida (ID 08)

```scss
h1 { font-size: clamp(1.8rem, 4vw, 2.5rem); }    // Títulos de seção
h2 { font-size: clamp(1.5rem, 3vw, 2rem); }       // Subtítulos
.hero-title { font-size: clamp(1.75rem, 4vw, 3.5rem); }  // Hero carousel
.display-hero { font-size: clamp(2rem, 5vw, 3.5rem); }   // Display headlines
```

### Hierarquia de Labels

| Estilo | Tamanho | Peso | Uso |
|--------|---------|------|-----|
| `label-meta` | 0.625rem | 700 | Categorias, datas, metadados |
| `text-small` | 0.875rem | 400 | Subtextos |
| `body-text` | 1rem | 400 | Corpo de texto |
| `article-body` | 1.1rem | 400 | Texto do artigo (leitura) |

## 3. Forma e Espaçamento

| Token | Valor | Uso |
|-------|-------|-----|
| `$border-radius` | `0.5rem` | Inputs, botões internos |
| `$border-radius-sm` | `0.25rem` | Badges de categoria |
| `$border-radius-lg` | `0.75rem` | Cards de notícia |
| `$border-radius-xl` | `1rem` | Modais, login card, carrossel |
| `$border-radius-pill` | `50rem` | Status badges |

## 4. Sombras e Efeitos

### Cloud Shadow (Assinatura Visual)

```scss
@mixin cloud-shadow {
  box-shadow: 0 20px 40px rgba(0, 87, 206, 0.06);
}
@mixin cloud-shadow-hover {
  box-shadow: 0 24px 48px rgba(0, 87, 206, 0.12);
}
```

### Glass Overlay (Hero Carousel)

```scss
@mixin glass-overlay {
  background: linear-gradient(180deg, rgba(0,87,205,0) 0%, rgba(0,25,70,0.85) 100%);
  backdrop-filter: blur(4px);
}
```

## 5. Componentes

| Componente | Framework | Customização SCSS |
|------------|-----------|-------------------|
| **Navbar** | Bootstrap `navbar-expand-lg` | Brand com Manrope, link ativo com `border-bottom` |
| **Carousel** | Bootstrap `carousel slide` | `hero-overlay` com glassmorphism |
| **Card** | Custom `.news-card` | `cloud-shadow`, hover com `translateY(-6px)` |
| **Modal** | Bootstrap `modal-lg` | `border-radius-xl`, sem borda visível |
| **Table** | Bootstrap `table-hover` | Headers uppercase com `label-meta` |
| **Pagination** | Custom `.pagination-custom` | Quadrado 2.5rem, hover azul |
| **Badges** | Custom `.status-badge` | `border-radius-pill`, cores semitransparentes |
| **Footer** | Custom `.footer-custom` | CSS Grid puro, 4 colunas no desktop |
| **Ticker** | Custom `.ticker-bar` | Label-meta, cores de variação (verde/vermelho) |