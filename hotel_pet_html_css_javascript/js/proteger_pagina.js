(function () {

    const codigoUsuarioLogado = localStorage.getItem("usuarioLogado");

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(function (item) {
        return item.codigo === codigoUsuarioLogado;
    });

    // Verifica se o usuário está autorizado.
    if (
        !usuario ||
        usuario.status !== "ativo" ||
        !["cliente", "funcionario", "gerente"].includes(usuario.funcao)
    ) {
        localStorage.removeItem("usuarioLogado");
        alert("Acesso não autorizado! Faça login para continuar.");
        window.location.replace("index.html");
        return;
    }

    // Identifica a página atual.
    const paginaAtual = window.location.pathname.split("/").pop();

    // Páginas exclusivas do gerente.
    const paginasGerente = [
        "configuracoes.html"
    ];

    // Páginas permitidas para funcionário e gerente.
    const paginasFuncionarioGerente = [
        "usuarios.html",
        "cadastrar_usuario.html",
        "editar_usuario.html"
    ];

    // Verifica se a página é exclusiva do gerente.
    if (
        paginasGerente.includes(paginaAtual) &&
        usuario.funcao !== "gerente"
    ) {
        alert("Acesso permitido somente para o gerente.");
        window.location.replace("reservas.html");
        return;
    }

    // VERIFICAÇÃO QUE VOCÊ DEVE ACRESCENTAR AQUI.
    if (
        paginasFuncionarioGerente.includes(paginaAtual) &&
        !["funcionario", "gerente"].includes(usuario.funcao)
    ) {
        alert("Acesso permitido somente para funcionários e gerentes.");
        window.location.replace("reservas.html");
        return;
    }

    // ========================================
    // VERIFICAÇÃO PERIÓDICA DA SESSÃO
    // ========================================

    setInterval(function () {

        // Recupera novamente os usuários.
        const usuariosAtualizados = JSON.parse(
            localStorage.getItem("usuarios")
        ) || [];

        // Localiza o usuário conectado.
        const usuarioAtualizado = usuariosAtualizados.find(function (item) {
            return item.codigo === codigoUsuarioLogado;
        });

        // Verifica se o usuário continua autorizado.
        if (
            !usuarioAtualizado ||
            usuarioAtualizado.status !== "ativo" ||
            !["cliente", "funcionario", "gerente"].includes(usuarioAtualizado.funcao)
        ) {

            localStorage.removeItem("usuarioLogado");

            alert("Sua sessão foi encerrada. Sua conta está inativa ou não autorizada.");

            window.location.replace("index.html");

        }

    }, 10000);

})();