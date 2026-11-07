
document.addEventListener("DOMContentLoaded", function () {

    // Recupera o formulário.
    const formulario = document.getElementById("form-editar-perfil");

    // Recupera o código do usuário conectado.
    const codigoUsuarioLogado = localStorage.getItem("usuarioLogado");

    // Recupera a lista de usuários.
    const usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    // Localiza o usuário conectado.
    const usuario = usuarios.find(function (item) {
        return item.codigo === codigoUsuarioLogado;
    });

    // Verifica se o formulário existe.
    if (!formulario) {
        console.error("Formulário de perfil não encontrado.");
        return;
    }

    // Verifica se o usuário existe e está ativo.
    if (
        !usuario ||
        usuario.status !== "ativo" ||
        !["cliente", "funcionario", "gerente"].includes(usuario.funcao)
    ) {
        alert("Acesso não autorizado. Faça login novamente.");
        localStorage.removeItem("usuarioLogado");
        window.location.href = "index.html";
        return;
    }

    // Preenche os campos com os dados do usuário conectado.
    document.getElementById("nome").value = usuario.nome;
    document.getElementById("email").value = usuario.email;
    document.getElementById("login").value = usuario.login;
    document.getElementById("funcao").value = usuario.funcao;

    // Impede a alteração da função.
    document.getElementById("funcao").disabled = true;

    // Evento de salvamento do formulário.
    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();

        // Recupera os dados pessoais.
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const login = document.getElementById("login").value.trim();

        // Recupera os campos de senha.
        const senhaAtual = document.getElementById("senha_atual").value;
        const novaSenha = document.getElementById("nova_senha").value;
        const confirmarSenha = document.getElementById("confirmar_senha").value;

        // Verifica se o login já pertence a outro usuário.
        const loginDuplicado = usuarios.some(function (item) {
            return item.login.toLowerCase() === login.toLowerCase()
                && item.codigo !== usuario.codigo;
        });

        if (loginDuplicado) {
            alert("Este login já está sendo utilizado por outro usuário!");
            return;
        }

        // Verifica se algum campo de senha foi preenchido.
        const desejaAlterarSenha =
            senhaAtual !== "" ||
            novaSenha !== "" ||
            confirmarSenha !== "";

        // Valida a alteração de senha.
        if (desejaAlterarSenha) {

            // Exige o preenchimento dos três campos.
            if (!senhaAtual || !novaSenha || !confirmarSenha) {
                alert("Preencha os três campos para alterar a senha.");
                return;
            }

            // Confere a senha atual.
            if (senhaAtual !== usuario.senha) {
                alert("A senha atual está incorreta!");
                return;
            }

            // Inicializa o histórico de senhas, caso ainda não exista.
            if (!usuario.historicoSenhas) {
                usuario.historicoSenhas = [usuario.senha];
            }

            // Confere a nova senha e sua confirmação.
            if (novaSenha !== confirmarSenha) {
                alert("A nova senha e a confirmação não são iguais!");
                return;
            }

            // Verifica se a nova senha é diferente da atual.
            if (novaSenha === senhaAtual) {
                alert("A nova senha deve ser diferente da senha atual!");
                return;
            }

            // Verifica se a nova senha já foi utilizada anteriormente.
            if (usuario.historicoSenhas.includes(novaSenha)) {
                alert("Você já utilizou essa senha anteriormente. Escolha outra!");
                return;
            }

            // Atualiza a senha e registra no histórico.
            usuario.historicoSenhas.push(novaSenha);
            usuario.senha = novaSenha;
        }

        // Atualiza os dados pessoais.
        usuario.nome = nome;
        usuario.email = email;
        usuario.login = login;

        // Salva os dados atualizados.
        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );

        alert("Perfil atualizado com sucesso!");

        // Retorna ao perfil atualizado.
        window.location.href = "editar_perfil.html?origem=perfil";

    });

    console.log("Perfil carregado:", usuario.nome);

});
