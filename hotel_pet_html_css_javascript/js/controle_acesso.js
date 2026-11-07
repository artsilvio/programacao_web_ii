
(function () {

    // Aguarda o carregamento da página.
    document.addEventListener("DOMContentLoaded", function () {

        // Recupera o usuário conectado.
        const codigoUsuarioLogado = localStorage.getItem("usuarioLogado");

        // Recupera os usuários cadastrados.
        const usuarios = JSON.parse(
            localStorage.getItem("usuarios")
        ) || [];

        // Localiza o usuário conectado.
        const usuario = usuarios.find(function (item) {
            return item.codigo === codigoUsuarioLogado;
        });

        // Verifica se o usuário está autorizado.
        if (
            !usuario ||
            usuario.status !== "ativo" ||
            !["cliente", "funcionario", "gerente"].includes(usuario.funcao)
        ) {
            return;
        }

        // Atualiza o nome e a função no cabeçalho.
        const identificacaoUsuario = document.querySelector(
            ".usuario-area strong"
        );

        if (identificacaoUsuario) {
            const funcoes = {
                cliente: "Cliente",
                funcionario: "Funcionário",
                gerente: "Gerente"
            };

            identificacaoUsuario.textContent =
                usuario.nome + " - " + funcoes[usuario.funcao];
        }

        // Localiza os links do menu.
        const linkUsuarios = document.querySelector(
            '.menu a[href="usuarios.html"]'
        );

        const linkConfiguracoes = document.querySelector(
            '.menu a[href="configuracoes.html"]'
        );

        // Cliente não acessa o menu de usuários.
        if (usuario.funcao === "cliente" && linkUsuarios) {
            linkUsuarios.style.display = "none";
        }

        // Cliente e funcionário não acessam configurações.
        if (
            usuario.funcao !== "gerente" &&
            linkConfiguracoes
        ) {
            linkConfiguracoes.style.display = "none";
        }

    });

})();
