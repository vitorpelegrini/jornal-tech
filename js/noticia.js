// =============================================================
// noticia.js - Página de Leitura | Jornal Tech
// =============================================================

$(document).ready(function () {
  const noticiaId = getUrlParam('id');

  if (!noticiaId) {
    window.location.href = 'index.html';
    return;
  }

  loadNoticia(noticiaId);
  loadRelated(noticiaId);
  initReadingProgress();
  loadCrypto();
  loadDolar();
});

// =============================================================
// LEITURA DE NOTÍCIA
// =============================================================

async function loadNoticia(id) {
  try {
    const noticia = await fetchData(`${API_BASE}/noticias/${id}`);

    // Title
    document.title = `Jornal Tech | ${noticia.titulo}`;

    // Header
    $('#noticia-categoria').text('Tecnologia');
    $('#noticia-titulo').text(noticia.titulo);
    $('#noticia-subtitulo').text(truncateText(noticia.conteudo, 200));
    $('#noticia-data').text(formatDateLong(noticia.dataCriacao));
    $('#noticia-img').attr('src', noticia.imagemCapa).attr('alt', noticia.titulo);

    // (ID 10) Preenche srcset do <picture> para carregamento adaptativo
    $('#noticia-img-sm').attr('srcset', noticia.imagemCapa + '=w480');
    $('#noticia-img-md').attr('srcset', noticia.imagemCapa + '=w800');

    // Body
    const paragraphs = noticia.conteudo.split('\n\n');
    let bodyHtml = '';
    paragraphs.forEach((p, i) => {
      if (i === 0) {
        bodyHtml += `<p class="drop-cap">${p.trim()}</p>`;
      } else {
        bodyHtml += `<p>${p.trim()}</p>`;
      }
    });
    $('#noticia-corpo').html(bodyHtml);

    // Fade in (jQuery - ID 20)
    $('article').hide().fadeIn(500);
  } catch (error) {
    console.error('Erro ao carregar notícia:', error);
    $('#noticia-corpo').html(
      '<div class="text-center py-5"><p class="text-muted">Notícia não encontrada. Verifique se o JSON Server está rodando.</p><a href="index.html" class="btn btn-primary mt-3">Voltar à Home</a></div>'
    );
  }
}

async function loadRelated(currentId) {
  try {
    const news = await fetchData(`${API_BASE}/noticias?status=publicado&_sort=dataCriacao&_order=desc&_limit=4`);
    const related = news.filter((n) => n.id !== currentId).slice(0, 3);
    const $grid = $('#related-grid');

    related.forEach((item) => {
      $grid.append(`
        <div class="col">
          <a href="noticia.html?id=${item.id}" class="card-link">
            <article class="news-card">
              <div class="news-card__img" style="height: 12rem;">
                <img src="${item.imagemCapa}" alt="${item.titulo}">
                <span class="news-card__category news-card__category--software">Tecnologia</span>
              </div>
              <div class="news-card__body">
                <time class="news-card__date">${formatDate(item.dataCriacao)}</time>
                <h3 class="news-card__title" style="font-size: 1rem;">${item.titulo}</h3>
                <p class="news-card__excerpt">${truncateText(item.conteudo, 80)}</p>
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
  } catch (error) {
    console.warn('Erro ao carregar notícias relacionadas:', error);
  }
}

// =============================================================
// READING PROGRESS BAR
// =============================================================

function initReadingProgress() {
  $(window).on('scroll', function () {
    const scrollTop = $(window).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const scrollPercent = (scrollTop / docHeight) * 100;
    $('.reading-progress').css('width', scrollPercent + '%');
  });
}

// Reutiliza funções de cotação do app.js
async function loadCrypto() {
  try {
    const data = await fetchData(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=brl&include_24hr_change=true'
    );
    if (data.bitcoin) {
      $('#btc-value').text(formatCurrency(data.bitcoin.brl));
      const c = data.bitcoin.brl_24h_change;
      $('#btc-change').text((c >= 0 ? '+' : '') + c.toFixed(1) + '%').removeClass('positive negative').addClass(c >= 0 ? 'positive' : 'negative');
    }
    if (data.ethereum) {
      $('#eth-value').text(formatCurrency(data.ethereum.brl));
      const c = data.ethereum.brl_24h_change;
      $('#eth-change').text((c >= 0 ? '+' : '') + c.toFixed(1) + '%').removeClass('positive negative').addClass(c >= 0 ? 'positive' : 'negative');
    }
    if (data.solana) {
      $('#sol-value').text(formatCurrency(data.solana.brl));
      const c = data.solana.brl_24h_change;
      $('#sol-change').text((c >= 0 ? '+' : '') + c.toFixed(1) + '%').removeClass('positive negative').addClass(c >= 0 ? 'positive' : 'negative');
    }
  } catch (e) { console.warn('Crypto error:', e); }
}

async function loadDolar() {
  try {
    const data = await fetchData('https://economia.awesomeapi.com.br/json/last/USD-BRL');
    if (data.USDBRL) {
      const v = parseFloat(data.USDBRL.bid);
      const p = parseFloat(data.USDBRL.pctChange);
      $('#usd-value').text('R$ ' + v.toFixed(2));
      $('#usd-change').text((p >= 0 ? '+' : '') + p.toFixed(1) + '%').removeClass('positive negative').addClass(p >= 0 ? 'positive' : 'negative');
    }
  } catch (e) { console.warn('USD error:', e); }
}
