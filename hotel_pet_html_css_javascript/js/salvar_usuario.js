
// ========================================
// CADASTRAR USUÁRIO
// ========================================

const formSalvarUsuario = document.getElementById("form-salvar-usuario");

// Identifica o usuário conectado.
const codigoLogado = localStorage.getItem("usuarioLogado");

const usuariosLogados = JSON.parse(
    localStorage.getItem("usuarios")
) || [];

const usuarioLogado = usuariosLogados.find(function (usuario) {
    return usuario.codigo === codigoLogado;
});

// Controla as opções de função conforme o perfil.
const campoFuncao = document.getElementById("funcao");

if (usuarioLogado && usuarioLogado.funcao === "funcionario") {

    // Funcionário só pode cadastrar clientes.
    campoFuncao.innerHTML = `
        <option value="cliente">Cliente</option>
    `;

    campoFuncao.value = "cliente";
    campoFuncao.disabled = true;
}

formSalvarUsuario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    // Recupera os dados do formulário
    const nome = document.getElementById("nome").value.trim();
    const login = document.getElementById("login").value.trim();
    const email = document.getElementById("email").value.trim();
    // Verifica se o usuário conectado está autorizado.
    if (
        !usuarioLogado ||
        usuarioLogado.status !== "ativo" ||
        !["funcionario", "gerente"].includes(usuarioLogado.funcao)
    ) {
        alert("Você não tem permissão para cadastrar usuários.");
        window.location.replace("reservas.html");
        return;
    }

    // Somente o gerente pode cadastrar funcionários ou gerentes.
    const funcao = usuarioLogado.funcao === "gerente"
        ? document.getElementById("funcao").value
        : "cliente";
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmar_senha").value;
    const status = document.getElementById("status").value;
    const observacoes = document.getElementById("observacoes").value.trim();

    // Verifica se as senhas são iguais
    if (senha !== confirmarSenha) {
        alert("As senhas não são iguais!");
        return;
    }

    // Recupera os usuários do localStorage
    const usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    // Verifica se o login já existe
    const loginExistente = usuarios.some(function (usuario) {
        return usuario.login.toLowerCase() === login.toLowerCase();
    });

    if (loginExistente) {
        alert("Este login já está cadastrado!");
        return;
    }

    // Gera o próximo código
    const maiorCodigo = usuarios.reduce(function (maior, usuario) {
        return Math.max(maior, Number(usuario.codigo) || 0);
    }, 0);

    const novoCodigo = String(maiorCodigo + 1).padStart(3, "0");

    // Cria o objeto do novo usuário
    const novoUsuario = {
        codigo: novoCodigo,
        nome: nome,
        login: login,
        senha: senha,
        email: email,
        funcao: funcao,
        status: status,
        observacoes: observacoes
    };

    // Adiciona o novo usuário ao array
    usuarios.push(novoUsuario);

    // Salva a lista atualizada
    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

    // Pergunta se deseja cadastrar outro usuário
    const cadastrarOutro = confirm(
        "Usuário cadastrado com sucesso!\n\nDeseja cadastrar outro usuário?"
    );

    if (cadastrarOutro) {
        window.location.href = "cadastrar_usuario.html";
    } else {
        window.location.href = "usuarios.html";
    }

});
