
// =================================================
// LISTAR PETS CADASTRADOS
// =================================================

document.addEventListener("DOMContentLoaded", function () {

    const listaPets = document.getElementById("lista-pets-container");
    const contadorPets = document.getElementById("contador-pets");

    // Recupera os pets e usuários do localStorage.
    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Recupera o código do usuário logado.
    const codigoUsuarioLogado = localStorage.getItem("usuarioLogado");

    // Localiza o usuário conectado.
    const usuarioLogado = usuarios.find(function (item) {
        return item.codigo === codigoUsuarioLogado;
    });

    // Filtra os Pets conforme a função do usuário.
    const petsVisiveis = usuarioLogado.funcao === "cliente"
        ? pets.filter(function (pet) {
            return pet.proprietario === codigoUsuarioLogado;
        })
        : pets;

    // Ordena os Pets pelo código.
    petsVisiveis.sort((a, b) => a.codigo.localeCompare(b.codigo));

    // Atualiza o contador.
    contadorPets.textContent = petsVisiveis.length +
        (petsVisiveis.length <= 1 ? " pet" : " pets");

    // Atualiza o título conforme a quantidade de Pets.
    const tituloPets = document.getElementById("titulo-lista-pets");

    tituloPets.textContent =
        petsVisiveis.length <= 1
            ? "Pet cadastrado"
            : "Pets cadastrados";

    // Verifica se existem pets cadastrados.
    if (petsVisiveis.length === 0) {

        listaPets.innerHTML = "<p>Nenhum pet cadastrado.</p>";
        return;

    }

    // Localiza o proprietário de cada pet.
    petsVisiveis.forEach(function (pet) {

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
