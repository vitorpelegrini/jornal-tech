// =============================================================
// admin.js - Painel Administrativo | Jornal Tech
// =============================================================
// IDs atendidos: 13, 14, 20, 21, 22, 23

$(document).ready(function () {
  // Proteger página
  if (!requireAuth()) return;

  // Mostrar nome do admin
  const admin = getLoggedAdmin();
  if (admin) {
    $('#admin-name').text(admin.nome || 'Admin');
  }

  // Carregar notícias
  loadAdminNews();

  // Eventos
  $('#btn-nova-noticia').on('click', openCreateModal);
  $('#news-form').on('submit', handleSaveNews);
  $('#btn-logout').on('click', logoutAdmin);
  $('#btn-cancel-modal').on('click', resetForm);

  // jQuery Mask Plugin (ID 21) - Máscara para data customizada
  if ($.fn.mask) {
    $('#news-date-input').mask('00/00/0000');
  }
});

// =============================================================
// LISTAR NOTÍCIAS (ID 23)
// =============================================================

let adminNews = [];
let adminCurrentPage = 1;
const adminItemsPerPage = 10;

async function loadAdminNews() {
  try {
    adminNews = await fetchData(`${API_BASE}/noticias?_sort=dataCriacao&_order=desc`);
    renderAdminTable(adminCurrentPage);
    renderAdminPagination();
  } catch (error) {
    console.error('Erro ao carregar notícias:', error);
    $('#admin-table-body').html(
      '<tr><td colspan="6" class="text-center py-5 text-muted">Erro ao carregar notícias. Verifique o JSON Server.</td></tr>'
    );
  }
}

function renderAdminTable(page) {
  const start = (page - 1) * adminItemsPerPage;
  const end = start + adminItemsPerPage;
  const pageNews = adminNews.slice(start, end);
  const $tbody = $('#admin-table-body');

  // jQuery animation (ID 20)
  $tbody.fadeOut(150, function () {
    $tbody.empty();

    if (pageNews.length === 0) {
      $tbody.html('<tr><td colspan="6" class="text-center py-5 text-muted">Nenhuma notícia cadastrada.</td></tr>');
      $tbody.fadeIn(200);
      return;
    }

    pageNews.forEach((item) => {
      const statusClass = getStatusBadgeClass(item.status);
      const statusLabel = item.status.charAt(0).toUpperCase() + item.status.slice(1);

      // Botão de publicar/despublicar
      let toggleBtn = '';
      if (item.status === 'publicado') {
        toggleBtn = `<button class="action-btn action-btn--unpublish" title="Despublicar" data-id="${item.id}" data-action="despublicar">
          <span class="material-symbols-outlined" style="font-size: 1.25rem;">visibility_off</span>
        </button>`;
      } else {
        toggleBtn = `<button class="action-btn action-btn--publish" title="Publicar" data-id="${item.id}" data-action="publicar">
          <span class="material-symbols-outlined" style="font-size: 1.25rem;">publish</span>
        </button>`;
      }

      $tbody.append(`
        <tr>
          <td class="align-middle">
            <img src="${item.imagemCapa}" alt="${item.titulo}" class="table-thumb">
          </td>
          <td class="align-middle" style="max-width: 250px;">
            <div class="fw-bold text-truncate">${item.titulo}</div>
          </td>
          <td class="align-middle text-muted small">${formatDate(item.dataCriacao)}</td>
          <td class="align-middle">
            <span class="status-badge ${statusClass}">${statusLabel}</span>
          </td>
          <td class="align-middle text-end">
            <div class="d-inline-flex align-items-center gap-1">
              ${toggleBtn}
              <button class="action-btn action-btn--edit" title="Editar" data-id="${item.id}">
                <span class="material-symbols-outlined" style="font-size: 1.25rem;">edit</span>
              </button>
              <button class="action-btn action-btn--delete" title="Excluir" data-id="${item.id}">
                <span class="material-symbols-outlined" style="font-size: 1.25rem;">delete</span>
              </button>
            </div>
          </td>
        </tr>
      `);
    });

    // Bind action buttons (jQuery - ID 20)
    $tbody.find('.action-btn--edit').on('click', function () {
      openEditModal($(this).data('id'));
    });

    $tbody.find('.action-btn--delete').on('click', function () {
      confirmDelete($(this).data('id'));
    });

    $tbody.find('[data-action="publicar"]').on('click', function () {
      changeStatus($(this).data('id'), 'publicado');
    });

    $tbody.find('[data-action="despublicar"]').on('click', function () {
      changeStatus($(this).data('id'), 'despublicado');
    });

    // Atualizar contador
    $('#news-count').text(`Mostrando ${start + 1}-${Math.min(end, adminNews.length)} de ${adminNews.length} notícias`);

    $tbody.fadeIn(200);
  });
}

function renderAdminPagination() {
  const totalPages = Math.ceil(adminNews.length / adminItemsPerPage);
  const $pagination = $('#admin-pagination');

  if (totalPages <= 1) {
    $pagination.parent().hide();
    return;
  }

  $pagination.empty().parent().show();

  $pagination.append(`
    <button class="btn btn-sm btn-outline-secondary ${adminCurrentPage === 1 ? 'disabled' : ''}" data-page="${adminCurrentPage - 1}">Anterior</button>
  `);

  for (let i = 1; i <= totalPages; i++) {
    $pagination.append(`
      <button class="btn btn-sm ${i === adminCurrentPage ? 'btn-primary' : 'btn-outline-secondary'}" data-page="${i}">${i}</button>
    `);
  }

  $pagination.append(`
    <button class="btn btn-sm btn-outline-secondary ${adminCurrentPage === totalPages ? 'disabled' : ''}" data-page="${adminCurrentPage + 1}">Próxima</button>
  `);

  $pagination.find('button').on('click', function () {
    const page = parseInt($(this).data('page'));
    if (page >= 1 && page <= totalPages) {
      adminCurrentPage = page;
      renderAdminTable(adminCurrentPage);
      renderAdminPagination();
    }
  });
}

// =============================================================
// CRUD - CREATE / UPDATE (ID 22)
// =============================================================

let editingId = null;

function openCreateModal() {
  editingId = null;
  resetForm();
  $('#modal-title').text('Nova Notícia');
  $('#btn-save-news').text('Salvar Notícia');
  const modal = new bootstrap.Modal(document.getElementById('newsModal'));
  modal.show();
}

async function openEditModal(id) {
  try {
    const noticia = await fetchData(`${API_BASE}/noticias/${id}`);
    editingId = id;

    $('#modal-title').text('Editar Notícia');
    $('#btn-save-news').text('Atualizar Notícia');
    $('#news-titulo').val(noticia.titulo);
    $('#news-conteudo').val(noticia.conteudo);
    $('#news-imagem').val(noticia.imagemCapa);
    $('#news-status').val(noticia.status);

    const modal = new bootstrap.Modal(document.getElementById('newsModal'));
    modal.show();
  } catch (error) {
    alert('Erro ao carregar notícia para edição.');
  }
}

async function handleSaveNews(e) {
  e.preventDefault();

  const titulo = $('#news-titulo').val().trim();
  const conteudo = $('#news-conteudo').val().trim();
  const imagemCapa = $('#news-imagem').val().trim() || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_aAjPEvaCaJbVeoEbA151Nu4SLDCUuC8a03yCTiXFYtgPzAG3QvOdCv_BB8VkV4e8JmrPgP5OmeABLEmlbvqYDbS08nH6sZ6xVkwLVcBY-37ZzzMKbYKlebYv2qxA8vA0GItcJ-X90trgz21f03apgoXCYQlKgSBZu83n8XfQKO7sv2lmt3ZRsP5wQQx5McrQyL83t7L9zRWu7v12ENQovGHU_eSdAzJsEGiFp3-7qylBr0ouc85ziL-I0yJ-tMaiDSSd5sQKrVc';
  const status = $('#news-status').val();

  // Validação (ID 11)
  if (!titulo || titulo.length < 5) {
    $('#news-titulo').addClass('is-invalid');
    return;
  }
  if (!conteudo || conteudo.length < 20) {
    $('#news-conteudo').addClass('is-invalid');
    return;
  }

  // Validação REGEX do título (ID 12) - Deve começar com letra maiúscula
  const tituloRegex = /^[A-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ]/;
  if (!tituloRegex.test(titulo)) {
    $('#news-titulo').addClass('is-invalid');
    $('#titulo-feedback').text('O título deve começar com letra maiúscula.');
    return;
  }

  const admin = getLoggedAdmin();
  const newsData = {
    titulo,
    conteudo,
    imagemCapa,
    status: editingId ? status : 'pendente', // Nova notícia = pendente por padrão
    dataCriacao: editingId ? undefined : new Date().toISOString(),
    administradorId: admin ? admin.id : '1'
  };

  // Remove undefined
  Object.keys(newsData).forEach((key) => newsData[key] === undefined && delete newsData[key]);

  const $btn = $('#btn-save-news');
  $btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2"></span>Salvando...');

  try {
    if (editingId) {
      // PUT (atualizar)
      await fetchData(`${API_BASE}/noticias/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsData)
      });
    } else {
      // POST (criar - ID 22)
      await fetchData(`${API_BASE}/noticias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsData)
      });
    }

    // Fechar modal e recarregar
    bootstrap.Modal.getInstance(document.getElementById('newsModal')).hide();
    resetForm();
    await loadAdminNews();

    // Toast de sucesso (jQuery - ID 20)
    showToast(editingId ? 'Notícia atualizada com sucesso!' : 'Notícia criada com sucesso!', 'success');

  } catch (error) {
    alert('Erro ao salvar notícia.');
  } finally {
    $btn.prop('disabled', false).html(editingId ? 'Atualizar Notícia' : 'Salvar Notícia');
  }
}

// =============================================================
// CRUD - DELETE
// =============================================================

async function confirmDelete(id) {
  if (!confirm('Tem certeza que deseja excluir esta notícia? Esta ação não pode ser desfeita.')) return;

  try {
    await fetchData(`${API_BASE}/noticias/${id}`, { method: 'DELETE' });
    await loadAdminNews();
    showToast('Notícia excluída com sucesso!', 'warning');
  } catch (error) {
    alert('Erro ao excluir notícia.');
  }
}

// =============================================================
// ALTERAR STATUS (ID 22)
// =============================================================

async function changeStatus(id, newStatus) {
  try {
    await fetchData(`${API_BASE}/noticias/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    await loadAdminNews();
    showToast(`Status alterado para "${newStatus}"!`, 'success');
  } catch (error) {
    alert('Erro ao alterar status.');
  }
}

// =============================================================
// UTILITÁRIOS
// =============================================================

function resetForm() {
  editingId = null;
  $('#news-form')[0].reset();
  $('#news-form .is-invalid').removeClass('is-invalid');
}

function showToast(message, type) {
  const $toast = $(`
    <div class="toast-notification alert alert-${type === 'success' ? 'success' : 'warning'} d-flex align-items-center shadow-sm" style="position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 9999; min-width: 300px; opacity: 0;">
      <span class="material-symbols-outlined me-2">${type === 'success' ? 'check_circle' : 'warning'}</span>
      ${message}
    </div>
  `);

  $('body').append($toast);

  // jQuery animation (ID 20)
  $toast.animate({ opacity: 1, bottom: '2rem' }, 300);

  setTimeout(function () {
    $toast.animate({ opacity: 0, bottom: '0' }, 300, function () {
      $(this).remove();
    });
  }, 3000);
}
