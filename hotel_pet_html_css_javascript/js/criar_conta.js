
document.addEventListener("DOMContentLoaded", function () {

    const formulario = document.getElementById("form-criar-conta");

    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();

        // Recupera os dados do formulário.
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const login = document.getElementById("login").value.trim();
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmar_senha").value;

        // Verifica se as senhas são iguais.
        if (senha !== confirmarSenha) {
            alert("As senhas não são iguais!");
            return;
        }

        // Recupera os usuários cadastrados.
        const usuarios = JSON.parse(
            localStorage.getItem("usuarios") || "[]"
        );

        // Verifica se o login já existe.
        const loginExistente = usuarios.some(function (usuario) {
            return usuario.login.toLowerCase() === login.toLowerCase();
        });

        if (loginExistente) {
            alert("Este login já está cadastrado!");
            return;
        }

        // Gera o próximo código.
        const maiorCodigo = usuarios.reduce(function (maior, usuario) {
            return Math.max(maior, Number(usuario.codigo) || 0);
        }, 0);

        const novoCodigo = String(maiorCodigo + 1).padStart(3, "0");

        // Cria a nova conta como cliente.
        const novoUsuario = {
            codigo: novoCodigo,
            nome: nome,
            login: login,
            email: email,
            senha: senha,
            funcao: "cliente",
            status: "ativo",
            observacoes: ""
        };

        // Adiciona e salva o usuário.
        usuarios.push(novoUsuario);

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );

        alert("Conta criada com sucesso! Você já pode fazer login.");

        window.location.href = "index.html";

    });

});
