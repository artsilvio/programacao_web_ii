
(function () {

    // Recupera o código do usuário conectado.
    const codigoUsuarioLogado = localStorage.getItem("usuarioLogado");

    // Recupera a lista de usuários.
    const usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    // Procura o usuário conectado.
    const usuario = usuarios.find(function (item) {
        return item.codigo === codigoUsuarioLogado;
    });

    // Verifica se o usuário está autorizado.
    if (
        !usuario ||
        usuario.status !== "ativo" ||
        usuario.funcao !== "gerente"
    ) {

        // Remove o registro de acesso.
        localStorage.removeItem("usuarioLogado");

        alert("Acesso não autorizado! Faça login para continuar.");

        // Retorna à tela de login.
        window.location.replace("index.html");
    }

})();
