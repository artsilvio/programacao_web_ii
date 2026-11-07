
// Aguarda o carregamento da página.
document.addEventListener("DOMContentLoaded", function () {

    // Obtém o botão de login.
    const btnLogin = document.getElementById("btn-login");

    if (btnLogin) {

        btnLogin.addEventListener("click", function () {

            // Recupera os dados digitados.
            const loginValor = document.getElementById("login").value.trim();
            const senhaValor = document.getElementById("senha").value.trim();

            // Verifica se os campos foram preenchidos.
            if (loginValor === "" || senhaValor === "") {
                alert("Informe o usuário e a senha.");
                return;
            }

            // Recupera os usuários cadastrados.
            const usuarios = JSON.parse(
                localStorage.getItem("usuarios")
            ) || [];

            // Procura o usuário pelo login e senha.
            const usuarioEncontrado = usuarios.find(function (usuario) {
                return usuario.login.toLowerCase() === loginValor.toLowerCase()
                    && usuario.senha === senhaValor;
            });

            // Verifica se o usuário existe.
            if (!usuarioEncontrado) {
                alert("Usuário ou senha incorretos!");
                return;
            }

            // Verifica se o usuário está ativo.
            if (usuarioEncontrado.status !== "ativo") {
                alert("Este usuário está inativo. Procure o administrador.");
                return;
            }

            // Verifica se o usuário possui uma função válida.
            if (
                !["cliente", "funcionario", "gerente"].includes(usuarioEncontrado.funcao)
            ) {
                alert("Função de usuário inválida. Procure o administrador.");
                return;
            }

            // Registra o código do usuário conectado.
            localStorage.setItem(
                "usuarioLogado",
                usuarioEncontrado.codigo
            );

            alert("Bem-vindo(a), " + usuarioEncontrado.nome + "!");

            // Acessa a página de reservas.
            window.location.href = "reservas.html";
        });
    }
});
