/*
 * NexoGestão
 * JavaScript da Atividade Assíncrona
 *
 * Recursos:
 * - validação client-side;
 * - mensagens de erro por campo;
 * - máscaras de CPF, telefone e CEP;
 * - eventos do DOM;
 * - consulta assíncrona de CEP com Fetch API + ViaCEP;
 * - preenchimento automático de endereço;
 * - menu mobile.
 */

(function () {
  "use strict";

  function iniciar() {
    // ================================================================
    // ELEMENTOS
    // ================================================================
    const form = document.getElementById("formCadastro");
    const status = document.getElementById("statusFormulario");

    const menuToggle = document.getElementById("menuToggle");
    const menu = document.getElementById("menuPrincipal");

    const campos = {
      nome: document.getElementById("nome"),
      cpf: document.getElementById("cpf"),
      nascimento: document.getElementById("nascimento"),
      sexo: document.getElementById("sexo"),
      email: document.getElementById("email"),
      telefone: document.getElementById("telefone"),
      endereco: document.getElementById("endereco"),
      cidade: document.getElementById("cidade"),
      estado: document.getElementById("estado"),
      cep: document.getElementById("cep"),
      termos: document.getElementById("termos")
    };

    // Se o formulário não existir, não tenta executar o restante.
    if (!form) {
      console.error("NexoGestão: formulário #formCadastro não encontrado.");
      return;
    }

    const erros = {
      nome: document.getElementById("erroNome"),
      cpf: document.getElementById("erroCpf"),
      nascimento: document.getElementById("erroNascimento"),
      sexo: document.getElementById("erroSexo"),
      email: document.getElementById("erroEmail"),
      telefone: document.getElementById("erroTelefone"),
      endereco: document.getElementById("erroEndereco"),
      cidade: document.getElementById("erroCidade"),
      estado: document.getElementById("erroEstado"),
      cep: document.getElementById("erroCep"),
      termos: document.getElementById("erroTermos")
    };

    let cepConsultado = "";
    let controladorCep = null;

    // ================================================================
    // UTILITÁRIOS
    // ================================================================
    function somenteNumeros(valor) {
      return String(valor || "").replace(/\D/g, "");
    }

    function setStatus(mensagem, tipo) {
      if (!status) return;

      status.textContent = mensagem;
      status.classList.remove(
        "formulario__status--erro",
        "formulario__status--sucesso"
      );

      if (tipo === "erro") {
        status.classList.add("formulario__status--erro");
      } else if (tipo === "sucesso") {
        status.classList.add("formulario__status--sucesso");
      }
    }

    function limparStatus() {
      if (!status) return;
      status.textContent = "";
      status.classList.remove(
        "formulario__status--erro",
        "formulario__status--sucesso"
      );
    }

    function mostrarErro(nomeCampo, mensagem) {
      const campo = campos[nomeCampo];
      const elementoErro = erros[nomeCampo];

      if (!campo) return false;

      campo.setAttribute("aria-invalid", "true");
      campo.classList.add("campo--erro");

      if (elementoErro) {
        elementoErro.textContent = mensagem;
      }

      return false;
    }

    function limparErro(nomeCampo) {
      const campo = campos[nomeCampo];
      const elementoErro = erros[nomeCampo];

      if (!campo) return;

      campo.setAttribute("aria-invalid", "false");
      campo.classList.remove("campo--erro");

      if (elementoErro) {
        elementoErro.textContent = "";
      }
    }

    function campoValido(nomeCampo, valido, mensagem) {
      if (valido) {
        limparErro(nomeCampo);
        return true;
      }

      return mostrarErro(nomeCampo, mensagem);
    }

    function limparTodosOsErros() {
      Object.keys(campos).forEach(function (nomeCampo) {
        limparErro(nomeCampo);
      });
    }

    function focarPrimeiroErro() {
      const primeiro = form.querySelector('[aria-invalid="true"]');

      if (primeiro) {
        primeiro.focus();
        primeiro.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    }

    // ================================================================
    // DATA MÁXIMA: HOJE
    // ================================================================
    if (campos.nascimento) {
      const hoje = new Date();
      const ano = hoje.getFullYear();
      const mes = String(hoje.getMonth() + 1).padStart(2, "0");
      const dia = String(hoje.getDate()).padStart(2, "0");
      campos.nascimento.max = `${ano}-${mes}-${dia}`;
    }

    // ================================================================
    // MENU MOBILE
    // ================================================================
    if (menuToggle && menu) {
      menuToggle.addEventListener("click", function () {
        const aberto = menu.classList.toggle("nav--aberto");

        menuToggle.setAttribute("aria-expanded", String(aberto));
        menuToggle.setAttribute(
          "aria-label",
          aberto
            ? "Fechar menu de navegação"
            : "Abrir menu de navegação"
        );
      });

      menu.querySelectorAll(".nav__link").forEach(function (link) {
        link.addEventListener("click", function () {
          menu.classList.remove("nav--aberto");
          menuToggle.setAttribute("aria-expanded", "false");
          menuToggle.setAttribute(
            "aria-label",
            "Abrir menu de navegação"
          );
        });
      });
    }

    // ================================================================
    // MÁSCARA CPF
    // ================================================================
    function mascaraCPF(valor) {
      let numeros = somenteNumeros(valor).slice(0, 11);

      if (numeros.length > 9) {
        numeros = numeros.replace(
          /(\d{3})(\d{3})(\d{3})(\d{1,2})/,
          "$1.$2.$3-$4"
        );
      } else if (numeros.length > 6) {
        numeros = numeros.replace(
          /(\d{3})(\d{3})(\d+)/,
          "$1.$2.$3"
        );
      } else if (numeros.length > 3) {
        numeros = numeros.replace(
          /(\d{3})(\d+)/,
          "$1.$2"
        );
      }

      return numeros;
    }

    // ================================================================
    // MÁSCARA TELEFONE
    // ================================================================
    function mascaraTelefone(valor) {
      const numeros = somenteNumeros(valor).slice(0, 11);

      if (numeros.length <= 2) {
        return numeros;
      }

      if (numeros.length <= 6) {
        return numeros.replace(
          /(\d{2})(\d+)/,
          "($1) $2"
        );
      }

      if (numeros.length <= 10) {
        return numeros.replace(
          /(\d{2})(\d{4})(\d+)/,
          "($1) $2-$3"
        );
      }

      return numeros.replace(
        /(\d{2})(\d{5})(\d{1,4})/,
        "($1) $2-$3"
      );
    }

    // ================================================================
    // MÁSCARA CEP
    // ================================================================
    function mascaraCEP(valor) {
      const numeros = somenteNumeros(valor).slice(0, 8);

      if (numeros.length <= 5) {
        return numeros;
      }

      return numeros.replace(
        /(\d{5})(\d{1,3})/,
        "$1-$2"
      );
    }

    campos.cpf.addEventListener("input", function () {
      campos.cpf.value = mascaraCPF(campos.cpf.value);
      if (somenteNumeros(campos.cpf.value).length < 11) {
        limparErro("cpf");
      }
    });

    campos.telefone.addEventListener("input", function () {
      campos.telefone.value = mascaraTelefone(campos.telefone.value);
      if (![10, 11].includes(somenteNumeros(campos.telefone.value).length)) {
        limparErro("telefone");
      }
    });

    // ================================================================
    // VALIDAÇÃO CPF
    // ================================================================
    function validarCPF(valor) {
      const cpf = somenteNumeros(valor);

      if (cpf.length !== 11) return false;
      if (/^(\d)\1{10}$/.test(cpf)) return false;

      let soma = 0;

      for (let i = 0; i < 9; i++) {
        soma += Number(cpf[i]) * (10 - i);
      }

      let digito = (soma * 10) % 11;
      if (digito === 10) digito = 0;

      if (digito !== Number(cpf[9])) return false;

      soma = 0;

      for (let i = 0; i < 10; i++) {
        soma += Number(cpf[i]) * (11 - i);
      }

      digito = (soma * 10) % 11;
      if (digito === 10) digito = 0;

      return digito === Number(cpf[10]);
    }

    // ================================================================
    // VALIDAÇÃO DATA
    // ================================================================
    function validarDataNascimento(valor) {
      if (!valor) return false;

      const data = new Date(`${valor}T00:00:00`);
      if (Number.isNaN(data.getTime())) return false;

      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      return data <= hoje;
    }

    // ================================================================
    // VALIDAÇÕES INDIVIDUAIS
    // ================================================================
    function validarNome() {
      const valor = campos.nome.value.trim();

      return campoValido(
        "nome",
        valor.length >= 3,
        "Informe um nome válido com pelo menos 3 caracteres."
      );
    }

    function validarCPFComMensagem() {
      return campoValido(
        "cpf",
        validarCPF(campos.cpf.value),
        "Informe um CPF válido."
      );
    }

    function validarNascimento() {
      return campoValido(
        "nascimento",
        validarDataNascimento(campos.nascimento.value),
        "Informe uma data de nascimento válida e não futura."
      );
    }

    function validarSexo() {
      return campoValido(
        "sexo",
        campos.sexo.value !== "",
        "Selecione uma opção de sexo."
      );
    }

    function validarEmail() {
      const valor = campos.email.value.trim();
      const valido =
        valor !== "" &&
        campos.email.validity.valid;

      return campoValido(
        "email",
        valido,
        "Informe um e-mail válido."
      );
    }

    function validarTelefone() {
      const quantidade = somenteNumeros(
        campos.telefone.value
      ).length;

      return campoValido(
        "telefone",
        quantidade === 10 || quantidade === 11,
        "Informe um telefone válido com DDD."
      );
    }

    function validarEndereco() {
      return campoValido(
        "endereco",
        campos.endereco.value.trim() !== "",
        "Informe o endereço."
      );
    }

    function validarCidade() {
      return campoValido(
        "cidade",
        campos.cidade.value.trim() !== "",
        "Informe a cidade."
      );
    }

    function validarEstado() {
      return campoValido(
        "estado",
        campos.estado.value !== "",
        "Selecione o estado."
      );
    }

    function validarCEP() {
      return campoValido(
        "cep",
        somenteNumeros(campos.cep.value).length === 8,
        "Informe um CEP válido com 8 números."
      );
    }

    function validarTermos() {
      return campoValido(
        "termos",
        campos.termos.checked,
        "Você precisa aceitar os termos de uso e a política de privacidade."
      );
    }

    // ================================================================
    // VALIDAÇÃO COMPLETA
    // ================================================================
    function validarFormulario() {
      const resultados = [
        validarNome(),
        validarCPFComMensagem(),
        validarNascimento(),
        validarSexo(),
        validarEmail(),
        validarTelefone(),
        validarEndereco(),
        validarCidade(),
        validarEstado(),
        validarCEP(),
        validarTermos()
      ];

      return resultados.every(Boolean);
    }

    // ================================================================
    // EVENTOS DE VALIDAÇÃO
    // ================================================================
    campos.nome.addEventListener("blur", validarNome);
    campos.cpf.addEventListener("blur", validarCPFComMensagem);
    campos.nascimento.addEventListener("change", validarNascimento);
    campos.sexo.addEventListener("change", validarSexo);
    campos.email.addEventListener("blur", validarEmail);
    campos.telefone.addEventListener("blur", validarTelefone);
    campos.endereco.addEventListener("blur", validarEndereco);
    campos.cidade.addEventListener("blur", validarCidade);
    campos.estado.addEventListener("change", validarEstado);
    campos.termos.addEventListener("change", validarTermos);

    campos.nome.addEventListener("input", function () {
      if (campos.nome.value.trim().length >= 3) {
        limparErro("nome");
      }
    });

    campos.email.addEventListener("input", function () {
      if (campos.email.validity.valid && campos.email.value.trim()) {
        limparErro("email");
      }
    });

    campos.endereco.addEventListener("input", function () {
      if (campos.endereco.value.trim()) {
        limparErro("endereco");
      }
    });

    campos.cidade.addEventListener("input", function () {
      if (campos.cidade.value.trim()) {
        limparErro("cidade");
      }
    });

    // ================================================================
    // CONSULTA DE CEP
    // ================================================================
    async function consultarCEP(cepNumerico) {
      if (controladorCep) {
        controladorCep.abort();
      }

      controladorCep = new AbortController();

      campos.cep.setAttribute("aria-busy", "true");
      setStatus("Consultando CEP...", "");

      try {
        const resposta = await fetch(
          `https://viacep.com.br/ws/${cepNumerico}/json/`,
          {
            method: "GET",
            headers: {
              Accept: "application/json"
            },
            signal: controladorCep.signal
          }
        );

        if (!resposta.ok) {
          throw new Error("Erro HTTP");
        }

        const dados = await resposta.json();

        if (dados.erro) {
          campos.endereco.value = "";
          campos.cidade.value = "";
          campos.estado.value = "";

          mostrarErro(
            "cep",
            "CEP não encontrado. Verifique o número informado."
          );

          setStatus(
            "CEP não encontrado. Verifique o número informado.",
            "erro"
          );

          return;
        }

        campos.endereco.value = dados.logradouro || "";

        if (dados.bairro) {
          campos.endereco.value +=
            campos.endereco.value
              ? ` - ${dados.bairro}`
              : dados.bairro;
        }

        campos.cidade.value = dados.localidade || "";

        // Seleciona a UF. Se ela não existir na lista, cria uma opção.
        if (dados.uf) {
          let opcao = Array.from(
            campos.estado.options
          ).find(function (item) {
            return item.value === dados.uf;
          });

          if (!opcao) {
            opcao = document.createElement("option");
            opcao.value = dados.uf;
            opcao.textContent = dados.uf;
            campos.estado.appendChild(opcao);
          }

          campos.estado.value = dados.uf;
        }

        limparErro("cep");
        limparErro("endereco");
        limparErro("cidade");
        limparErro("estado");

        setStatus(
          "Endereço encontrado e preenchido automaticamente!",
          "sucesso"
        );

        cepConsultado = cepNumerico;
      } catch (erro) {
        if (erro.name === "AbortError") {
          return;
        }

        setStatus(
          "Não foi possível consultar o CEP. Verifique sua conexão e tente novamente.",
          "erro"
        );

        mostrarErro(
          "cep",
          "Não foi possível consultar este CEP."
        );
      } finally {
        campos.cep.setAttribute("aria-busy", "false");
        controladorCep = null;
      }
    }

    campos.cep.addEventListener("input", function () {
      const valor = mascaraCEP(campos.cep.value);
      campos.cep.value = valor;

      const numeros = somenteNumeros(valor);

      // Enquanto ainda está digitando, apenas limpa o erro anterior.
      if (numeros.length < 8) {
        cepConsultado = "";
        limparErro("cep");

        if (numeros.length > 0) {
          setStatus(
            "Digite os 8 números do CEP para consultar o endereço.",
            ""
          );
        } else {
          limparStatus();
        }

        return;
      }

      // Ao completar 8 números, consulta automaticamente.
      if (numeros.length === 8 && numeros !== cepConsultado) {
        consultarCEP(numeros);
      }
    });

    // ================================================================
    // SUBMIT
    // ================================================================
    form.addEventListener("submit", function (evento) {
      evento.preventDefault();

      // A validação é sempre executada, mesmo com novalidate no HTML.
      limparStatus();

      const valido = validarFormulario();

      if (!valido) {
        setStatus(
          "Existem campos inválidos. Corrija os campos destacados.",
          "erro"
        );

        focarPrimeiroErro();
        return;
      }

      setStatus(
        "Cliente cadastrado com sucesso!",
        "sucesso"
      );

      // O projeto não possui servidor/backend.
      // Por isso o envio real não é realizado.
    });

    // ================================================================
    // RESET
    // ================================================================
    form.addEventListener("reset", function () {
      if (controladorCep) {
        controladorCep.abort();
        controladorCep = null;
      }

      cepConsultado = "";

      // O reset acontece depois do evento "reset".
      setTimeout(function () {
        limparTodosOsErros();
        limparStatus();
        campos.cep.setAttribute("aria-busy", "false");
      }, 0);
    });

    // ================================================================
    // GARANTIA DE CARREGAMENTO
    // ================================================================
    console.log(
      "NexoGestão: validações e busca assíncrona de CEP carregadas."
    );
  }

  // Funciona tanto se o script estiver no final do body quanto no head.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
