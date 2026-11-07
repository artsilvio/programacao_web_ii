(function () {
    // ========================================
    // RECUPERAR USUÁRIOS DO LOCALSTORAGE
    // ========================================

    let usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    // ========================================
    // IDENTIFICAR O USUÁRIO PELA URL
    // ========================================

    const parametros = new URLSearchParams(window.location.search);

    const codigoUsuario = parametros.get("codigo");

    // Procura o usuário pelo código recebido
    const usuario = usuarios.find(function (item) {
        return item.codigo === codigoUsuario;
    });

    // Identifica o usuário que está conectado.
    const codigoLogado = localStorage.getItem("usuarioLogado");

    const usuarioLogado = usuarios.find(function (item) {
        return item.codigo === codigoLogado;
    });

    // Controla quais usuários o funcionário pode editar.
    if (
        usuarioLogado &&
        usuarioLogado.funcao === "funcionario" &&
        usuario &&
        usuario.codigo !== usuarioLogado.codigo &&
        usuario.funcao !== "cliente"
    ) {
        alert("Funcionários só podem editar o próprio cadastro e o cadastro de clientes.");

        window.location.replace("usuarios.html");
        return;
    }

    // ========================================
    // LOCALIZAR O FORMULÁRIO
    // ========================================

    const formulario = document.getElementById("form-editar-usuario");

    if (!usuario) {

        alert("Usuário não encontrado!");

        window.location.href = "usuarios.html";

    } else {

        // ========================================
        // PREENCHER OS CAMPOS DO FORMULÁRIO
        // ========================================

        document.getElementById("nome").value = usuario.nome;
        document.getElementById("email").value = usuario.email;
        document.getElementById("login").value = usuario.login;
        document.getElementById("funcao").value = usuario.funcao;
        // Funcionário não pode alterar função nem status.
        if (usuarioLogado && usuarioLogado.funcao === "funcionario") {

            const campoFuncao = document.getElementById("funcao");
            const campoStatus = document.getElementById("status");

            campoFuncao.disabled = true;
            campoStatus.disabled = true;

        }

    }
    document.getElementById("status").value = usuario.status;

    // ========================================
    // SALVAR AS ALTERAÇÕES
    // ========================================

    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();

        // Recupera os novos valores
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const login = document.getElementById("login").value.trim();

        // Somente o gerente pode alterar a função.
        const funcao = usuarioLogado.funcao === "gerente"
            ? document.getElementById("funcao").value
            : usuario.funcao;

        const status = document.getElementById("status").value;

        // Verifica se o login já pertence a outro usuário
        const loginDuplicado = usuarios.some(function (item) {
            return item.login.toLowerCase() === login.toLowerCase()
                && item.codigo !== codigoUsuario;
        });

        if (loginDuplicado) {
            alert("Este login já está sendo utilizado por outro usuário!");
            return;
        }

        // Atualiza os dados do usuário selecionado
        usuario.nome = nome;
        usuario.email = email;
        usuario.login = login;
        usuario.funcao = funcao;
        usuario.status = status;

        // Salva novamente no localStorage
        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );

        alert("Usuário atualizado com sucesso!");

        // Retorna para a listagem
        window.location.href = "usuarios.html";

    });

})();
