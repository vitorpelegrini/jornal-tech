// =============================================================
// app.js - Lógica da Página Inicial | Jornal Tech
// =============================================================
// IDs atendidos: 20 (jQuery), 23 (GET API fake), 24 (APIs públicas)

$(document).ready(function () {
  // --- Carregar Cotações (APIs Públicas - ID 24) ---
  loadCrypto();
  loadDolar();

  // --- Carregar Notícias Publicadas (API Fake - ID 23) ---
  loadNews();
});

// =============================================================
// COTAÇÕES CRYPTO - CoinGecko API v3 + AwesomeAPI (ID 24)
// =============================================================

async function loadCrypto() {
  try {
    const data = await fetchData(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=brl&include_24hr_change=true'
    );

    // Bitcoin
    if (data.bitcoin) {
      $('#btc-value').text(formatCurrency(data.bitcoin.brl));
      const btcChange = data.bitcoin.brl_24h_change;
      $('#btc-change')
        .text((btcChange >= 0 ? '+' : '') + btcChange.toFixed(1) + '%')
        .removeClass('positive negative')
        .addClass(btcChange >= 0 ? 'positive' : 'negative');
    }

    // Ethereum
    if (data.ethereum) {
      $('#eth-value').text(formatCurrency(data.ethereum.brl));
      const ethChange = data.ethereum.brl_24h_change;
      $('#eth-change')
        .text((ethChange >= 0 ? '+' : '') + ethChange.toFixed(1) + '%')
        .removeClass('positive negative')
        .addClass(ethChange >= 0 ? 'positive' : 'negative');
    }

    // Solana
    if (data.solana) {
      $('#sol-value').text(formatCurrency(data.solana.brl));
      const solChange = data.solana.brl_24h_change;
      $('#sol-change')
        .text((solChange >= 0 ? '+' : '') + solChange.toFixed(1) + '%')
        .removeClass('positive negative')
        .addClass(solChange >= 0 ? 'positive' : 'negative');
    }
  } catch (error) {
    console.warn('Erro ao carregar cotações crypto:', error);
  }
}

async function loadDolar() {
  try {
    const data = await fetchData('https://economia.awesomeapi.com.br/json/last/USD-BRL');

    if (data.USDBRL) {
      const valor = parseFloat(data.USDBRL.bid);
      const variacao = parseFloat(data.USDBRL.pctChange);
      $('#usd-value').text('R$ ' + valor.toFixed(2));
      $('#usd-change')
        .text((variacao >= 0 ? '+' : '') + variacao.toFixed(1) + '%')
        .removeClass('positive negative')
        .addClass(variacao >= 0 ? 'positive' : 'negative');
    }
  } catch (error) {
    console.warn('Erro ao carregar cotação dólar:', error);
  }
}

// =============================================================
// NOTÍCIAS - JSON Server (ID 23)
// =============================================================

let allNews = [];
let currentPage = 1;
const itemsPerPage = 6;

async function loadNews() {
  try {
    allNews = await fetchData(`${API_BASE}/noticias?status=publicado&_sort=dataCriacao&_order=desc`);

    // Carousel com as 3 primeiras
    renderCarousel(allNews.slice(0, 3));

    // Grid de cards
    renderNewsGrid(currentPage);

    // Paginação
    renderPagination();

    // Atualiza data no ticker
    updateDate();
  } catch (error) {
    console.error('Erro ao carregar notícias:', error);
    $('#news-grid').html(
      '<div class="col-12 text-center py-5"><p class="text-muted">Não foi possível carregar as notícias. Verifique se o JSON Server está rodando.</p></div>'
    );
  }
}

function renderCarousel(news) {
  const $indicators = $('#carousel-indicators');
  const $inner = $('#carousel-inner');

  news.forEach((item, index) => {
    // Indicator
    $indicators.append(
      `<button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="${index}" ${index === 0 ? 'class="active" aria-current="true"' : ''} aria-label="Slide ${index + 1}"></button>`
    );

    // Slide
    $inner.append(`
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <img src="${item.imagemCapa}" class="d-block w-100 img-cover" alt="${item.titulo}">
        <div class="hero-overlay">
          <div style="max-width: 48rem;">
            <span class="hero-category">Destaque</span>
            <h2 class="hero-title">${item.titulo}</h2>
            <a href="noticia.html?id=${item.id}" class="btn btn-light fw-bold px-4 py-2">Ler Matéria</a>
          </div>
        </div>
      </div>
    `);
  });
}

function renderNewsGrid(page) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageNews = allNews.slice(start, end);
  const $grid = $('#news-grid');

  // jQuery animation (ID 20)
  $grid.fadeOut(200, function () {
    $grid.empty();

    pageNews.forEach((item) => {
      const categoryClass = getCategoryClass(item);
      $grid.append(`
        <div class="col">
          <a href="noticia.html?id=${item.id}" class="card-link">
            <article class="news-card">
              <div class="news-card__img">
                <img src="${item.imagemCapa}" alt="${item.titulo}">
                <span class="news-card__category ${categoryClass}">Tecnologia</span>
              </div>
              <div class="news-card__body">
                <time class="news-card__date">${formatDate(item.dataCriacao)}</time>
                <h3 class="news-card__title">${item.titulo}</h3>
                <p class="news-card__excerpt">${truncateText(item.conteudo)}</p>
                <div class="news-card__footer">
                  <span class="author">Por Jornal Tech</span>
                  <span class="material-symbols-outlined text-primary">bookmark</span>
                </div>
              </div>
            </article>
          </a>
        </div>
      `);
    });

    $grid.fadeIn(300);
  });
}

function getCategoryClass(item) {
  const title = item.titulo.toLowerCase();
  if (title.includes('ia') || title.includes('inteligência')) return 'news-card__category--ia';
  if (title.includes('processo') || title.includes('hardware') || title.includes('2nm')) return 'news-card__category--hardware';
  if (title.includes('segur') || title.includes('zero-trust') || title.includes('falha')) return 'news-card__category--cyber';
  if (title.includes('fold') || title.includes('review')) return 'news-card__category--reviews';
  if (title.includes('halving') || title.includes('mercado') || title.includes('crypto')) return 'news-card__category--mercado';
  if (title.includes('framework') || title.includes('software') || title.includes('web')) return 'news-card__category--software';
  return 'news-card__category--software';
}

function renderPagination() {
  const totalPages = Math.ceil(allNews.length / itemsPerPage);
  const $pagination = $('#pagination');

  if (totalPages <= 1) {
    $pagination.hide();
    return;
  }

  $pagination.empty();

  // Previous
  $pagination.append(`
    <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
      <a class="page-link" href="#" data-page="${currentPage - 1}">
        <span class="material-symbols-outlined" style="font-size: 1rem;">chevron_left</span>
      </a>
    </li>
  `);

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    $pagination.append(`
      <li class="page-item ${i === currentPage ? 'active' : ''}">
        <a class="page-link" href="#" data-page="${i}">${i}</a>
      </li>
    `);
  }

  // Next
  $pagination.append(`
    <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
      <a class="page-link" href="#" data-page="${currentPage + 1}">
        <span class="material-symbols-outlined" style="font-size: 1rem;">chevron_right</span>
      </a>
    </li>
  `);

  // Event listeners (jQuery - ID 20)
  $pagination.find('.page-link').on('click', function (e) {
    e.preventDefault();
    const page = parseInt($(this).data('page'));
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
      renderNewsGrid(currentPage);
      renderPagination();
      // Scroll to section
      $('html, body').animate({ scrollTop: $('#news-section').offset().top - 80 }, 400);
    }
  });
}

function updateDate() {
  const now = new Date();
  const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
  const formattedDate = now.toLocaleDateString('pt-BR', options).toUpperCase();
  $('#current-date').text(formattedDate);
}
