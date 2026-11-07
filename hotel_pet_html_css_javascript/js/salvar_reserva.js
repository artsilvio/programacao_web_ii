
document.addEventListener("DOMContentLoaded", function () {

    // Obtém os campos do formulário
    const campoPet = document.getElementById("pet");
    const campoProprietario = document.getElementById("proprietario");
    const campoEntrada = document.getElementById("entrada");
    const campoSaida = document.getElementById("saida");

    const campoValorDiaria = document.getElementById("valor_diaria_reserva");
    const campoQuantidadeDiarias = document.getElementById("quantidade_diarias");
    const campoValorTotal = document.getElementById("valor_total");

    // Recupera os dados do localStorage
    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Recupera o valor da diária configurado pelo gerente
    const configuracoes = JSON.parse(
        localStorage.getItem("configuracoes") || "{}"
    );

    const valorDiaria = Number(configuracoes.valorDiaria);

    // Formata valores monetários
    function formatarMoeda(valor) {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    // Exibe o valor da diária
    if (valorDiaria > 0) {
        campoValorDiaria.value = formatarMoeda(valorDiaria);
    } else {
        campoValorDiaria.value = "Não configurada";
    }

    // Carrega os pets cadastrados
    pets.forEach(function (pet) {
        const opcao = document.createElement("option");
        opcao.value = pet.codigo;
        opcao.textContent = pet.nome;
        campoPet.appendChild(opcao);
    });

    // Carrega os proprietários cadastrados
    usuarios.forEach(function (usuario) {
        const opcao = document.createElement("option");
        opcao.value = usuario.codigo;
        opcao.textContent = usuario.nome;
        campoProprietario.appendChild(opcao);
    });

    // Preenche automaticamente o proprietário
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

    // Calcula a quantidade de diárias e o valor total
    function calcularHospedagem() {

        campoQuantidadeDiarias.value = "";
        campoValorTotal.value = "";

        if (!campoEntrada.value || !campoSaida.value) {
            return;
        }

        const entrada = new Date(campoEntrada.value + "T00:00:00");
        const saida = new Date(campoSaida.value + "T00:00:00");

        const quantidadeDiarias = Math.round(
            (saida - entrada) / (1000 * 60 * 60 * 24)
        );

        if (quantidadeDiarias <= 0) {
            campoQuantidadeDiarias.value = "Data inválida";
            return;
        }

        if (valorDiaria <= 0) {
            campoValorTotal.value = "Diária não configurada";
            return;
        }

        const valorTotal = quantidadeDiarias * valorDiaria;

        campoQuantidadeDiarias.value = quantidadeDiarias;
        campoValorTotal.value = formatarMoeda(valorTotal);
    }

    // Recalcula quando as datas forem alteradas
    campoEntrada.addEventListener("change", calcularHospedagem);
    campoSaida.addEventListener("change", calcularHospedagem);

    // Obtém o formulário
    const formFazerReserva = document.getElementById("form-fazer-reserva");

    // Salva a reserva
    formFazerReserva.addEventListener("submit", function (evento) {

        evento.preventDefault();

        if (!Number.isFinite(valorDiaria) || valorDiaria <= 0) {
            alert("O valor da diária não está configurado. Solicite ao gerente que configure o valor antes de cadastrar uma reserva.");
            return;
        }

        calcularHospedagem();

        const entrada = new Date(campoEntrada.value + "T00:00:00");
        const saida = new Date(campoSaida.value + "T00:00:00");

        const quantidadeDiarias = Math.round(
            (saida - entrada) / (1000 * 60 * 60 * 24)
        );

        if (quantidadeDiarias <= 0) {
            alert("A data de saída deve ser posterior à data de entrada.");
            return;
        }

        // Recupera as reservas existentes
        const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

        // Gera o próximo código
        const maiorNumero = reservas.reduce(function (maior, reserva) {

            const numero = Number(reserva.codigo.replace("RES", ""));

            return numero > maior ? numero : maior;

        }, 0);

        const proximoNumero = maiorNumero + 1;
        const codigoReserva = "RES" + String(proximoNumero).padStart(3, "0");

        const valorTotal = quantidadeDiarias * valorDiaria;

        // Cria o objeto da reserva
        const novaReserva = {

            codigo: codigoReserva,
            pet: campoPet.value,
            proprietario: campoProprietario.value,
            entrada: campoEntrada.value,
            saida: campoSaida.value,
            valorDiaria: valorDiaria,
            quantidadeDiarias: quantidadeDiarias,
            valor: valorTotal,
            observacoes: document.getElementById("observacoes").value,
            status: "agendada"

        };

        // Adiciona a nova reserva
        reservas.push(novaReserva);

        // Grava no localStorage
        localStorage.setItem("reservas", JSON.stringify(reservas));

        alert("Reserva " + codigoReserva + " cadastrada com sucesso!");

        // Pergunta se deseja cadastrar outra reserva
        const fazerOutra = confirm(
            "Deseja cadastrar outra reserva?"
        );

        if (fazerOutra) {
            window.location.href = "fazer_reserva.html";
        } else {
            window.location.href = "reservas.html";
        }

    });

});
