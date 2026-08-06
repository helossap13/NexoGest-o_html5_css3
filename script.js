// script.js
// Pequenas interações da interface: menu mobile e feedback de envio do formulário.
// Nenhuma biblioteca ou framework é utilizado.

document.addEventListener('DOMContentLoaded', function () {

  // ----- Menu de navegação (mobile) -----
  var botaoMenu = document.getElementById('menuToggle');
  var menu = document.getElementById('menuPrincipal');

  if (botaoMenu && menu) {
    botaoMenu.addEventListener('click', function () {
      var aberto = menu.classList.toggle('nav--aberto');
      botaoMenu.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });

    // Fecha o menu ao escolher um link (útil no celular)
    menu.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('nav--aberto');
        botaoMenu.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ----- Formulário de cadastro -----
  var formulario = document.getElementById('formCadastro');
  var status = document.getElementById('statusFormulario');

  if (formulario && status) {
    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();

      if (!formulario.checkValidity()) {
        status.textContent = 'Verifique os campos destacados antes de salvar.';
        status.classList.remove('formulario__status--sucesso');
        status.classList.add('formulario__status--erro');
        formulario.reportValidity();
        return;
      }

      status.textContent = 'Cliente cadastrado com sucesso!';
      status.classList.remove('formulario__status--erro');
      status.classList.add('formulario__status--sucesso');
      formulario.reset();
    });

    formulario.addEventListener('reset', function () {
      status.textContent = '';
      status.classList.remove('formulario__status--erro', 'formulario__status--sucesso');
    });
  }
});
