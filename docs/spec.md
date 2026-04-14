# 🛠️ Especificação Técnica - Jornal Tech

## 1. Modelo de Dados (DER Simplificado)

```
┌────────────────────┐         ┌────────────────────────┐
│   administradores  │         │        noticias        │
├────────────────────┤         ├────────────────────────┤
│ id          string │◄────────│ administradorId string │
│ nome        string │   1:N   │ id              string │
│ email       string │         │ titulo          string │
│ senha       string │         │ conteudo        string │
└────────────────────┘         │ imagemCapa      string │
                               │ status          string │
                               │ dataCriacao     string │
                               └────────────────────────┘
```

## 2. Dicionário de Dados

### Tabela `administradores`

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|:-----------:|-----------|
| `id` | string | ✅ | Identificador único |
| `nome` | string | ✅ | Nome completo do administrador |
| `email` | string | ✅ | E-mail institucional (validado com REGEX) |
| `senha` | string | ✅ | Senha de acesso (armazenada em texto para fins acadêmicos) |

### Tabela `noticias`

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|:-----------:|-----------|
| `id` | string | ✅ | Identificador único |
| `titulo` | string | ✅ | Título da notícia (min. 5 chars, deve iniciar com maiúscula) |
| `conteudo` | string | ✅ | Corpo completo da notícia (min. 20 chars) |
| `imagemCapa` | string | ❌ | URL da imagem de capa |
| `status` | string | ✅ | `publicado`, `pendente` ou `despublicado` |
| `dataCriacao` | string (ISO) | ✅ | Data/hora de criação (ISO 8601) |
| `administradorId` | string | ✅ | FK para a tabela `administradores` |

## 3. Rotas da API (JSON Server - porta 3000)

### Administradores

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/administradores?email=X&senha=Y` | Autenticação simulada (login) |

### Notícias

| Método | Rota | Descrição | ID Atendido |
|--------|------|-----------|:-----------:|
| `GET` | `/noticias?status=publicado&_sort=dataCriacao&_order=desc` | Lista notícias publicadas (Home) | 23 |
| `GET` | `/noticias/:id` | Detalhe de uma notícia (Leitura) | 23 |
| `GET` | `/noticias?_sort=dataCriacao&_order=desc` | Lista todas as notícias (Admin) | 23 |
| `POST` | `/noticias` | Cria uma nova notícia | 22 |
| `PUT` | `/noticias/:id` | Atualiza uma notícia existente | 22 |
| `PATCH` | `/noticias/:id` | Altera o status (publicar/despublicar) | 22 |
| `DELETE` | `/noticias/:id` | Exclui uma notícia permanentemente | 22 |

## 4. APIs Públicas Externas (ID 24)

| API | Endpoint | Dados Obtidos |
|-----|----------|---------------|
| **CoinGecko** | `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=brl&include_24hr_change=true` | Preço e variação 24h de BTC, ETH, SOL em BRL |
| **AwesomeAPI** | `https://economia.awesomeapi.com.br/json/last/USD-BRL` | Cotação do dólar americano em reais e variação percentual |

## 5. Fluxo de Autenticação

1. Usuário acessa `login.html` e preenche e-mail + senha
2. Validação REGEX do e-mail no frontend (ID 12)
3. `GET /administradores?email=X&senha=Y` ao JSON Server (ID 22)
4. Se retorno `data.length > 0`: salva `admin` no `localStorage` e redireciona para `admin.html` (ID 14)
5. Se retorno vazio: exibe mensagem de erro
6. Páginas admin verificam `requireAuth()` no carregamento - redireciona para login se não autenticado,
7. Logout: remove `localStorage` e redireciona para login
