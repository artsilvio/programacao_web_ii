
// Obtém o formulário de cadastro de usuário pelo seu identificador.
const formSalvarUsuario = document.getElementById("form-salvar-usuario");

// Verifica quando o usuário tenta enviar o formulário.
formSalvarUsuario.addEventListener("submit", function (evento) {

    // Impede que o navegador recarregue a página ao enviar o formulário.
    evento.preventDefault();

    // Pergunta se o usuário deseja cadastrar outro usuário.
    const cadastrarOutro = confirm(
        "Usuário cadastrado com sucesso!\n\nDeseja cadastrar outro usuário?"
    );

    // Verifica se o usuário clicou em OK (Sim).
    if (cadastrarOutro) {

        // Se clicou em Sim, abre novamente o formulário de cadastro.
        window.location.href = "cadastrar_usuario.html";

    } else {

        // Se clicou em Cancelar (Não), volta para a lista de usuários.
        window.location.href = "usuarios.html";
    }
});
