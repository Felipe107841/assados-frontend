// BASE_URL para conexão com o backend
const BASE_URL = 'https://assados-backend.up.railway.app';

// Mostrar seção de login
function mostrarLogin() {
  document.getElementById("tela-inicial").style.display = "none";
  document.getElementById("form-login").style.display = "block";
  document.getElementById("form-registro").style.display = "none";
  document.getElementById("form-pedido").style.display = "none";
}

// Mostrar seção de registro
function mostrarRegistro() {
  document.getElementById("tela-inicial").style.display = "none";
  document.getElementById("form-login").style.display = "none";
  document.getElementById("form-registro").style.display = "block";
  document.getElementById("form-pedido").style.display = "none";
}

// Mostrar formulário de pedido (só se estiver logado)
function mostrarFormularioPedido() {
  const token = localStorage.getItem("token");

  if (token) {
    document.getElementById("form-pedido").style.display = "block";
    document.getElementById("form-login").style.display = "none";
    document.getElementById("form-registro").style.display = "none";
    document.getElementById("tela-inicial").style.display = "none";
  } else {
    document.getElementById("form-pedido").style.display = "none";
    document.getElementById("form-login").style.display = "block";
    document.getElementById("tela-inicial").style.display = "block";
  }
}

// Login REAL
function fazerLogin() {
  const email = document.getElementById("loginEmail").value.trim();
  const senha = document.getElementById("loginSenha").value.trim();

  if (!email || !senha) {
    Swal.fire("Erro", "Preencha todos os campos.", "error");
    return;
  }

  fetch(`${BASE_URL}/api/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha })
  })
    .then(res => res.json().then(data => ({ status: res.status, body: data })))
    .then(({ status, body }) => {
      if (status === 200 && body.token) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("usuarioLogado", "true");
        Swal.fire("Sucesso", "Login realizado com sucesso!", "success");
        mostrarFormularioPedido();
      } else {
        Swal.fire("Erro", body.message || "Login inválido.", "error");
      }
    })
    .catch(() => {
      Swal.fire("Erro", "Erro ao conectar com o servidor.", "error");
    });
}

// Registro REAL
function registrarUsuario() {
  const nomeCompleto = document.getElementById("novoNome").value.trim();
  const email = document.getElementById("novoEmail").value.trim();
  const senha = document.getElementById("novaSenha").value.trim();

  if (!nomeCompleto || !email || !senha) {
    Swal.fire("Erro", "Preencha todos os campos.", "error");
    return;
  }

  fetch(`${BASE_URL}/api/auth/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nomeCompleto, email, senha })
  })
    .then(res => res.json().then(data => ({ status: res.status, body: data })))
    .then(({ status, body }) => {
      if (status === 201 || body.message === "Usuario registrado corretamente") {
        localStorage.setItem("usuarioLogado", "true");
        Swal.fire("Sucesso", "Conta criada com sucesso!", "success");
        mostrarFormularioPedido();
      } else {
        Swal.fire("Erro", body.message || "Erro no registro.", "error");
      }
    })
    .catch(() => {
      Swal.fire("Erro", "Erro ao conectar com o servidor.", "error");
    });
}

// Logout REAL
function fazerLogout() {
  localStorage.removeItem("token");
  Swal.fire("Sessão Encerrada", "Você saiu da sua conta.", "info");
  mostrarLogin();
}

// Verificação de email REAL
function enviarCodigoEmail() {
  const email = document.getElementById("email").value.trim();
  if (!email) {
    Swal.fire("Erro", "Digite o e-mail.", "error");
    return;
  }

  fetch(`${BASE_URL}/api/auth/verificar-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        Swal.fire("Sucesso", "Código enviado para seu e-mail.", "success");
        document.getElementById("codigoEmail").style.display = "block";
      } else {
        Swal.fire("Erro", "Não foi possível enviar o código.", "error");
      }
    })
    .catch(() => {
      Swal.fire("Erro", "Erro ao conectar com o servidor.", "error");
    });
}

// Verificação de telefone
function verificarTelefone() {
  const telefone = document.getElementById("telefone").value.trim();
  if (!telefone) {
    Swal.fire("Erro", "Digite o número de telefone.", "error");
    return;
  }

  fetch(`${BASE_URL}/api/auth/verificar-telefone`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ telefone }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        Swal.fire("Sucesso", "Código enviado por SMS.", "success");
        document.getElementById("codigoTelefone").style.display = "block";
      } else {
        Swal.fire("Erro", "Erro ao enviar código.", "error");
      }
    })
    .catch(() => {
      Swal.fire("Erro", "Erro ao conectar com o servidor.", "error");
    });
}

// Envio do formulário de pedido
document.getElementById("cadastroForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const pedido = {
    nome: document.getElementById("nome").value.trim(),
    sobrenome: document.getElementById("sobrenome").value.trim(),
    telefone: document.getElementById("telefone").value.trim(),
    endereco: document.getElementById("endereco").value.trim(),
    referencia: document.getElementById("referencia").value.trim(),
    email: document.getElementById("email").value.trim(),
    pedido: document.getElementById("pedido").value
  };

  if (Object.values(pedido).some(val => val === "")) {
    Swal.fire("Erro", "Preencha todos os campos do pedido.", "error");
    return;
  }

  fetch(`${BASE_URL}/api/pedidos/realizar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pedido)
  })
    .then(res => res.json())
    .then(() => {
      Swal.fire("Pedido Enviado!", "Seu pedido foi registrado.", "success");
      document.getElementById("cadastroForm").reset();
      document.getElementById("codigoTelefone").style.display = "none";
      document.getElementById("codigoEmail").style.display = "none";
    })
    .catch(() => {
      Swal.fire("Erro", "Erro ao enviar o pedido.", "error");
    });
});

// Checar login ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (token) {
    mostrarFormularioPedido();
  } else {
    mostrarLogin();
  }
});

localStorage.setItem("usuarioLogado", "true");

// Envio REAL do pedido
document.getElementById("cadastroForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Evita recarregar a página

  const token = localStorage.getItem("token");
  if (!token) {
    Swal.fire("Erro", "Você precisa estar logado para fazer um pedido.", "error");
    return;
  }

  const pedido = {
    nome: document.getElementById("nome").value.trim(),
    sobrenome: document.getElementById("sobrenome").value.trim(),
    telefone: document.getElementById("telefone").value.trim(),
    codigoTelefone: document.getElementById("codigoTelefone").value.trim(),
    endereco: document.getElementById("endereco").value.trim(),
    referencia: document.getElementById("referencia").value.trim(),
    email: document.getElementById("email").value.trim(),
    codigoEmail: document.getElementById("codigoEmail").value.trim(),
    item: document.getElementById("pedido").value
  };

  // Verifica se todos os campos estão preenchidos
  for (const campo in pedido) {
    if (!pedido[campo]) {
      Swal.fire("Erro", `Preencha o campo: ${campo}`, "error");
      return;
    }
  }

  fetch(`${BASE_URL}/api/pedidos/realizar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(pedido)
  })
    .then(res => res.json().then(data => ({ status: res.status, body: data })))
    .then(({ status, body }) => {
      if (status === 201) {
        Swal.fire("Pedido Realizado!", "Seu pedido foi enviado com sucesso!", "success");
        document.getElementById("cadastroForm").reset();
        document.getElementById("codigoEmail").style.display = "none";
        document.getElementById("codigoTelefone").style.display = "none";
      } else {
        Swal.fire("Erro", body.message || "Erro ao enviar o pedido.", "error");
      }
    })
    .catch(() => {
      Swal.fire("Erro", "Erro ao conectar com o servidor.", "error");
    });
});