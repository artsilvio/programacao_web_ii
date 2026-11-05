// Obtém os campos do formulário.
const campoPet = document.getElementById("pet");
const campoProprietario = document.getElementById("proprietario");

// Recupera os dados do localStorage.
const pets = JSON.parse(localStorage.getItem("pets")) || [];
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

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

// Preenche automaticamente o proprietário.
campoPet.addEventListener("change", function () {

    const codigoPet = campoPet.value;

    const petSelecionado = pets.find(function (pet) {
        return pet.codigo === codigoPet;
    });

    if (petSelecionado) {

        const proprietario = usuarios.find(function (usuario) {
            return usuario.codigo === petSelecionado.proprietario;
        });

        campoProprietario.value = proprietario
            ? proprietario.codigo
            : "";

        if (!proprietario) {
            alert("Proprietário não encontrado para este pet.");
        }

    }

});

// Obtém o formulário.
const formFazerReserva = document.getElementById("form-fazer-reserva");

// Salva a reserva.
formFazerReserva.addEventListener("submit", function (evento) {

    evento.preventDefault();

    // Recupera as reservas existentes.
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    // Gera o próximo código.
    const maiorNumero = reservas.reduce(function (maior, reserva) {

        const numero = Number(reserva.codigo.replace("RES", ""));

        return numero > maior ? numero : maior;

    }, 0);

    const proximoNumero = maiorNumero + 1;

    const codigoReserva = "RES" + String(proximoNumero).padStart(3, "0");

    // Cria o objeto da reserva.
    const novaReserva = {

        codigo: codigoReserva,
        pet: campoPet.value,
        proprietario: campoProprietario.value,
        entrada: document.getElementById("entrada").value,
        saida: document.getElementById("saida").value,
        observacoes: document.getElementById("observacoes").value,
        status: "agendada"

    };

    // Adiciona a nova reserva.
    reservas.push(novaReserva);

    // Grava no localStorage.
    localStorage.setItem("reservas", JSON.stringify(reservas));

    alert("Reserva " + codigoReserva + " cadastrada com sucesso!");

    // Pergunta se deseja cadastrar outra reserva.
    const fazerOutra = confirm(
        "Deseja cadastrar outra reserva?"
    );

    if (fazerOutra) {

        window.location.href = "fazer_reserva.html";

    } else {

        window.location.href = "reservas.html";

    }

});