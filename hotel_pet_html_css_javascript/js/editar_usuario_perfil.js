// Obtém o formulário de edição de usuário e perfil.
const formEditarPerfil = document.getElementById("form-editar-perfil");

// Identifica a origem do acesso pela URL.
const parametrosURL = new URLSearchParams(window.location.search);
const origem = parametrosURL.get("origem");

// Exibe no console a origem identificada.
console.log("Origem da edição:", origem);

// Verifica se o formulário foi encontrado.
if (formEditarPerfil) {

    // Detecta quando o formulário é enviado.
    formEditarPerfil.addEventListener("submit", function (evento) {

        // Impede o envio tradicional do formulário.
        evento.preventDefault();

        // Trata a edição do próprio perfil.
        if (origem === "perfil") {

            alert("Perfil atualizado com sucesso!");

            // Permanece na página do perfil.
            window.location.href = "editar_perfil.html?origem=perfil";

        } else if (origem === "usuario") {

            alert("Usuário atualizado com sucesso!");

            // Retorna à lista de usuários.
            window.location.href = "usuarios.html";

        } else {

            // Informa se a origem não foi identificada.
            alert("Não foi possível identificar a origem da edição. Verifique o endereço da página.");
            console.error("Origem inválida:", origem);
        }
    });

} else {
    console.error("Formulário form-editar-perfil não encontrado.");
}