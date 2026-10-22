
// Controla o envio do formulário de cadastro de pet.
const formCadastrarPet = document.getElementById("form-cadastrar-pet");

formCadastrarPet.addEventListener("submit", function (evento) {
    evento.preventDefault();

    // Pergunta se o usuário deseja cadastrar outro pet.
    const cadastrarOutro = confirm("Pet cadastrado com sucesso!\n\nDeseja cadastrar outro pet?");

    if (cadastrarOutro) {
        // Volta ao formulário para um novo cadastro.
        window.location.href = "cadastrar_pet.html";
    } else {
        // Retorna à lista de pets.
        window.location.href = "pets.html";
    }
});
