// Recupera o código da reserva pela URL.
const parametros = new URLSearchParams(window.location.search);
const codigoReserva = parametros.get("codigo");

// Recupera os dados do localStorage.
const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
const pets = JSON.parse(localStorage.getItem("pets")) || [];
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Localiza a reserva selecionada.
const reserva = reservas.find(function (item) {
    return item.codigo === codigoReserva;
});

// Verifica se a reserva existe.
if (!reserva) {
    alert("Reserva não encontrada!");
    window.location.href = "reservas.html";
} else {

    // Localiza os campos do formulário.
    const campoPet = document.getElementById("pet");
    const campoProprietario = document.getElementById("proprietario");

    // Preenche o título com o código da reserva.
    document.getElementById("titulo-codigo-reserva").textContent =
        "Editar reserva " + reserva.codigo;

    // Carrega os pets cadastrados.
    pets.forEach(function (pet) {
        const opcao = document.createElement("option");
        opcao.value = pet.codigo;
        opcao.textContent = pet.nome;
        campoPet.appendChild(opcao);
    });

    // Carrega os proprietários cadastrados.
    usuarios.forEach(function (usuario) {
        const opcao = document.createElement("option");
        opcao.value = usuario.codigo;
        opcao.textContent = usuario.nome;
        campoProprietario.appendChild(opcao);
    });

    // Seleciona o pet da reserva.
    campoPet.value = reserva.pet;

    // Seleciona o proprietário da reserva.
    campoProprietario.value = reserva.proprietario;

    // Atualiza o proprietário quando o pet mudar.
    campoPet.addEventListener("change", function () {

        const petSelecionado = pets.find(function (pet) {
            return pet.codigo === campoPet.value;
        });

        if (petSelecionado) {
            campoProprietario.value = petSelecionado.proprietario;
        }
    });

    // Preenche as datas.
    document.getElementById("entrada").value = reserva.entrada;
    document.getElementById("saida").value = reserva.saida;

    // Preenche o status.
    document.getElementById("status").value = reserva.status;

    // Preenche o valor, se existir.
    document.getElementById("valor").value = reserva.valor || "";

    // Preenche as observações.
    document.getElementById("observacoes").value =
        reserva.observacoes || "";
}

// Obtém o formulário de edição.
const formEditarReserva = document.getElementById("form-editar-reserva");

// Salva as alterações da reserva.
formEditarReserva.addEventListener("submit", function (evento) {

    evento.preventDefault();

    // Atualiza os dados da reserva existente.
    reserva.pet = campoPet.value;
    reserva.proprietario = campoProprietario.value;
    reserva.entrada = document.getElementById("entrada").value;
    reserva.saida = document.getElementById("saida").value;
    reserva.status = document.getElementById("status").value;
    reserva.observacoes = document.getElementById("observacoes").value;

    // Atualiza o valor da hospedagem.
    reserva.valor = document.getElementById("valor").value;

    // Grava as alterações no localStorage.
    localStorage.setItem("reservas", JSON.stringify(reservas));

    alert("Reserva " + reserva.codigo + " atualizada com sucesso!");

    // Retorna para a listagem.
    window.location.href = "reservas.html";
});