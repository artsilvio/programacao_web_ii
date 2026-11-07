
document.addEventListener("DOMContentLoaded", function () {

    // Recupera o código da reserva informado na URL.
    const parametros = new URLSearchParams(window.location.search);
    const codigoReserva = parametros.get("codigo");

    // Recupera os dados armazenados.
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Localiza a reserva.
    const reserva = reservas.find(function (item) {
        return item.codigo === codigoReserva;
    });

    if (!reserva) {
        alert("Reserva não encontrada!");
        window.location.href = "reservas.html";
        return;
    }

    // Localiza o pet.
    const pet = pets.find(function (item) {
        return item.codigo === reserva.pet;
    });

    if (!pet) {
        alert("Pet não encontrado!");
        window.location.href = "reservas.html";
        return;
    }

    // Localiza o proprietário.
    const proprietario = usuarios.find(function (item) {
        return item.codigo === reserva.proprietario;
    });

    if (!proprietario) {
        alert("Proprietário não encontrado!");
        window.location.href = "reservas.html";
        return;
    }

    // Preenche o cabeçalho.
    document.getElementById("codigo-reserva").textContent =
        "Reserva " + reserva.codigo;

    document.getElementById("nome-pet-cabecalho").textContent =
        pet.nome;

    document.getElementById("tipo-pet-cabecalho").textContent =
        pet.tipo;

    // Preenche os dados do pet.
    document.getElementById("nome-pet").textContent = pet.nome;
    document.getElementById("tipo-pet").textContent = pet.tipo;

    // Carrega a foto do pet.
    const fotoPet = document.getElementById("foto-pet");

    if (pet.foto) {
        fotoPet.src = pet.foto;
    } else {
        fotoPet.style.display = "none";
    }

    // Preenche o proprietário.
    document.getElementById("nome-proprietario").textContent =
        proprietario.nome;

    // Formata as datas.
    function formatarData(data) {
        if (!data) {
            return "--";
        }

        const partes = data.split("-");
        return partes[2] + "/" + partes[1] + "/" + partes[0];
    }

    // Preenche as datas.
    document.getElementById("data-entrada").textContent =
        formatarData(reserva.entrada);

    document.getElementById("data-saida").textContent =
        formatarData(reserva.saida);

    // Formata valores monetários.
    function formatarMoeda(valor) {
        return Number(valor || 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    // Preenche os valores da hospedagem.
    document.getElementById("valor-diaria").textContent =
        formatarMoeda(reserva.valorDiaria);

    document.getElementById("quantidade-diarias").textContent =
        reserva.quantidadeDiarias !== undefined
            ? reserva.quantidadeDiarias
            : "--";

    document.getElementById("valor-hospedagem").textContent =
        formatarMoeda(reserva.valor);

    // Preenche o status.
    const statusReserva = document.getElementById("status-reserva");

    statusReserva.textContent = reserva.status;
    statusReserva.className = "status status-" + reserva.status;

    // Preenche as observações.
    document.getElementById("observacoes-reserva").textContent =
        reserva.observacoes || "Nenhuma observação cadastrada.";

    // Configura o botão de edição.
    const botaoEditar = document.getElementById("botao-editar-reserva");

    botaoEditar.setAttribute(
        "href",
        "editar_reserva.html?codigo=" + reserva.codigo
    );

});
