
document.addEventListener("DOMContentLoaded", function () {

    // Recupera o código do pet informado na URL
    const parametros = new URLSearchParams(window.location.search);
    const codigo = parametros.get("codigo");

    // Recupera os dados armazenados no navegador
    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Localiza o pet pelo código
    const pet = pets.find(p => p.codigo === codigo);

    // Verifica se o pet foi encontrado
    if (!pet) {
        alert("Pet não encontrado!");
        window.location.href = "pets.html";
        return;
    }

    // Localiza o proprietário
    const proprietario = usuarios.find(
        usuario => usuario.codigo === pet.proprietario
    );

    // Preenche os dados do pet
    document.getElementById("codigo-pet").textContent = pet.codigo;
    document.getElementById("nome-pet").textContent = pet.nome;
    document.getElementById("tipo-pet").textContent = pet.tipo;
    document.getElementById("raca-pet").textContent = pet.raca;
    document.getElementById("tamanho-pet").textContent = pet.tamanho;

    // Preenche o nome do proprietário
    document.getElementById("nome-proprietario").textContent =
        proprietario ? proprietario.nome : "Proprietário não encontrado";

    // Exibe a foto do pet
    const foto = document.getElementById("foto-pet");

    if (pet.foto) {
        foto.src = pet.foto;
        foto.alt = "Foto de " + pet.nome;
    } else {
        foto.removeAttribute("src");
        foto.alt = "Pet sem foto cadastrada";
    }

    // Exibe as observações
    document.getElementById("observacoes-pet").textContent =
        pet.observacoes || "Nenhuma observação cadastrada.";

    // Configura o botão de edição
    document.getElementById("botao-editar-pet").href =
        "editar_pet.html?codigo=" + encodeURIComponent(pet.codigo);

});
