
// =================================================
// LISTAR PETS CADASTRADOS
// =================================================

document.addEventListener("DOMContentLoaded", function () {

    const listaPets = document.getElementById("lista-pets-container");
    const contadorPets = document.getElementById("contador-pets");

    // Recupera os pets e usuários do localStorage.
    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    // Ordena os pets pelo código
    pets.sort((a, b) => a.codigo.localeCompare(b.codigo));
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Atualiza o contador.
    contadorPets.textContent = pets.length +
        (pets.length === 1 ? " pet" : " pets");

    // Verifica se existem pets cadastrados.
    if (pets.length === 0) {

        listaPets.innerHTML = "<p>Nenhum pet cadastrado.</p>";
        return;

    }

    // Localiza o proprietário de cada pet.
    pets.forEach(function (pet) {

        const proprietario = usuarios.find(usuario =>
            usuario.codigo === pet.proprietario
        );

        const nomeProprietario = proprietario
            ? proprietario.nome
            : "Proprietário não encontrado";

        // Cria o card do pet.
        const card = document.createElement("article");

        card.className = "pet-card";

        // Monta a foto.
        const foto = pet.foto
            ? `<img src="${pet.foto}" alt="Foto de ${pet.nome}">`
            : "<span>Sem foto</span>";

        card.innerHTML = `

            <div class="foto-pet">
                ${foto}
            </div>

            <div class="dados-pet-card">
    <h3>${pet.nome}</h3>
    <p>${pet.tipo}</p>
</div>

<div class="informacao-pet-card">
    <span>Código</span>
    <strong>${pet.codigo}</strong>
</div>

            <div class="informacao-pet-card">
                <span>Raça</span>
                <strong>${pet.raca}</strong>
            </div>

            <div class="informacao-pet-card">
                <span>Tamanho</span>
                <strong>${pet.tamanho}</strong>
            </div>

            <div class="informacao-pet-card">
                <span>Proprietário</span>
                <strong>${nomeProprietario}</strong>
            </div>

            <div class="acoes-pet">

                <a href="visualizar_pet.html?codigo=${pet.codigo}"
                   class="botao-visualizar">
                    Visualizar
                </a>

                <a href="editar_pet.html?codigo=${pet.codigo}"
                   class="botao-editar">
                    Editar
                </a>

            </div>

        `;

        // Adiciona o card à lista.
        listaPets.appendChild(card);

    });

});
