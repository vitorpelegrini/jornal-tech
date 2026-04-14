// =============================================================
// utils.js - Funções Utilitárias | Jornal Tech
// =============================================================

const API_BASE = 'http://localhost:3000';

/**
 * Helper de fetch com tratamento de erros
 * @param {string} url
 * @param {object} options
 * @returns {Promise<any>}
 */
async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

/**
 * Formata data ISO para formato pt-BR legível
 * @param {string} isoDate
 * @returns {string}
 */
function formatDate(isoDate) {
  const date = new Date(isoDate);
  const options = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('pt-BR', options).replace('.', '');
}

/**
 * Formata data ISO para formato longo (ex: 29 de Maio de 2024)
 * @param {string} isoDate
 * @returns {string}
 */
function formatDateLong(isoDate) {
  const date = new Date(isoDate);
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('pt-BR', options);
}

/**
 * Verifica se o admin está logado via localStorage
 * @returns {object|null}
 */
function getLoggedAdmin() {
  const admin = localStorage.getItem('jornaltech_admin');
  return admin ? JSON.parse(admin) : null;
}

/**
 * Salva sessão do admin no localStorage
 * @param {object} adminData
 */
function saveAdmin(adminData) {
  localStorage.setItem('jornaltech_admin', JSON.stringify(adminData));
}

/**
 * Remove sessão do admin
 */
function logoutAdmin() {
  localStorage.removeItem('jornaltech_admin');
  window.location.href = 'login.html';
}

/**
 * Protege páginas admin (redireciona se não logado)
 */
function requireAuth() {
  if (!getLoggedAdmin()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

/**
 * Gera cor de fundo para badge de status
 * @param {string} status
 * @returns {string}
 */
function getStatusBadgeClass(status) {
  switch (status) {
    case 'publicado': return 'status-badge--publicado';
    case 'pendente': return 'status-badge--pendente';
    case 'despublicado': return 'status-badge--despublicado';
    default: return 'status-badge--pendente';
  }
}

/**
 * Trunca texto com ellipsis
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
function truncateText(text, maxLength = 120) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Obtém parâmetro da URL
 * @param {string} param
 * @returns {string|null}
 */
function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
 * Formata valor monetário para BRL
 * @param {number} value
 * @returns {string}
 */
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}
