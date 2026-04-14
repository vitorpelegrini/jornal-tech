// =============================================================
// login.js - Autenticação Simulada | Jornal Tech
// =============================================================
// IDs atendidos: 11, 12, 14, 22

$(document).ready(function () {
  // Se já está logado, redireciona
  if (getLoggedAdmin()) {
    window.location.href = 'admin.html';
    return;
  }

  // Carregar email salvo se "lembrar" estava marcado
  const savedEmail = localStorage.getItem('jornaltech_remember_email');
  if (savedEmail) {
    $('#login-email').val(savedEmail);
    $('#login-remember').prop('checked', true);
  }

  // Evento de submit (jQuery - ID 20)
  $('#login-form').on('submit', function (e) {
    e.preventDefault();
    handleLogin();
  });

  // Validação em tempo real (jQuery - ID 20)
  $('#login-email').on('blur', function () {
    validateEmail($(this).val());
  });

  $('#login-password').on('blur', function () {
    validatePassword($(this).val());
  });
});

// =============================================================
// VALIDAÇÃO (ID 11, 12)
// =============================================================

/**
 * Valida e-mail com REGEX (ID 12)
 */
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = emailRegex.test(email);

  if (!isValid && email.length > 0) {
    $('#email-error').text('Por favor, insira um e-mail válido.').removeClass('d-none');
    $('#login-email').addClass('is-invalid');
  } else {
    $('#email-error').addClass('d-none');
    $('#login-email').removeClass('is-invalid');
  }

  return isValid;
}

/**
 * Valida senha
 */
function validatePassword(password) {
  if (password.length < 1) {
    $('#password-error').text('A senha é obrigatória.').removeClass('d-none');
    $('#login-password').addClass('is-invalid');
    return false;
  }
  $('#password-error').addClass('d-none');
  $('#login-password').removeClass('is-invalid');
  return true;
}

// =============================================================
// AUTENTICAÇÃO - JSON Server (ID 22)
// =============================================================

async function handleLogin() {
  const email = $('#login-email').val().trim();
  const password = $('#login-password').val().trim();

  // Validar campos
  const emailValid = validateEmail(email);
  const passwordValid = validatePassword(password);

  if (!emailValid || !passwordValid) return;

  // Desabilitar botão enquanto processa
  const $btn = $('#login-btn');
  const originalText = $btn.html();
  $btn.prop('disabled', true).html(
    '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Verificando...'
  );

  try {
    // Requisição assíncrona para API fake (ID 22)
    const data = await fetchData(
      `${API_BASE}/administradores?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(password)}`
    );

    if (data.length > 0) {
      // Login bem-sucedido
      const admin = data[0];
      saveAdmin(admin);

      // Lembrar email (ID 14 - localStorage)
      if ($('#login-remember').is(':checked')) {
        localStorage.setItem('jornaltech_remember_email', email);
      } else {
        localStorage.removeItem('jornaltech_remember_email');
      }

      // Feedback visual (jQuery - ID 20)
      $('#login-alert')
        .removeClass('d-none alert-danger')
        .addClass('alert-success')
        .html('<span class="material-symbols-outlined align-middle me-2" style="font-size: 1.2rem;">check_circle</span>Login realizado com sucesso! Redirecionando...');

      // Redirecionar após 1s
      setTimeout(function () {
        window.location.href = 'admin.html';
      }, 1000);
    } else {
      // Login falhou
      $('#login-alert')
        .removeClass('d-none alert-success')
        .addClass('alert-danger')
        .html('<span class="material-symbols-outlined align-middle me-2" style="font-size: 1.2rem;">error</span>E-mail ou senha inválidos.');

      // Shake animation (jQuery - ID 20)
      $('.login-card').addClass('animate__animated animate__shakeX');
      setTimeout(() => $('.login-card').removeClass('animate__animated animate__shakeX'), 600);

      $btn.prop('disabled', false).html(originalText);
    }
  } catch (error) {
    $('#login-alert')
      .removeClass('d-none alert-success')
      .addClass('alert-danger')
      .html('<span class="material-symbols-outlined align-middle me-2" style="font-size: 1.2rem;">cloud_off</span>Erro de conexão. Verifique se o JSON Server está rodando em localhost:3000.');

    $btn.prop('disabled', false).html(originalText);
  }
}
