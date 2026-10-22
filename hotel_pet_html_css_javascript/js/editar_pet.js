
// Obtém o formulário de edição de pet.
const formEditarPet = document.getElementById("form-editar-pet");

// Detecta quando o formulário é enviado.
formEditarPet.addEventListener("submit", function (evento) {

    // Impede o envio padrão do formulário.
    evento.preventDefault();

    // Informa que os dados do pet foram editados.
    alert("Pet editado com sucesso!");

    // Retorna para a lista de pets.
    window.location.href = "pets.html";
});
