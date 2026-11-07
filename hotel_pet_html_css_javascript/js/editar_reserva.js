
(function () {

    // ========================================
    // IDENTIFICAÇÃO DO USUÁRIO LOGADO
    // ========================================

    const codigoUsuarioLogado = localStorage.getItem("usuarioLogado");

    const usuarios = JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    const usuarioLogado = usuarios.find(function (item) {
        return item.codigo === codigoUsuarioLogado;
    });

    // Verifica se o usuário está autorizado.
    if (
        !usuarioLogado ||
        usuarioLogado.status !== "ativo" ||
        !["cliente", "funcionario", "gerente"].includes(usuarioLogado.funcao)
    ) {
        alert("Acesso não autorizado!");
        window.location.replace("index.html");
        return;
    }

    // ========================================
    // RECUPERAÇÃO DA RESERVA
    // ========================================

    const parametros = new URLSearchParams(window.location.search);
    const codigoReserva = parametros.get("codigo");

    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    const pets = JSON.parse(localStorage.getItem("pets")) || [];

    const reserva = reservas.find(function (item) {
        return item.codigo === codigoReserva;
    });

    if (!reserva) {
        alert("Reserva não encontrada!");
        window.location.href = "reservas.html";
        return;
    }

    // ========================================
    // LOCALIZAÇÃO DOS CAMPOS
    // ========================================

    const formEditarReserva = document.getElementById("form-editar-reserva");

    const campoPet = document.getElementById("pet");
    const campoProprietario = document.getElementById("proprietario");
    const campoEntrada = document.getElementById("entrada");
    const campoSaida = document.getElementById("saida");
    const campoValor = document.getElementById("valor");
    const campoStatus = document.getElementById("status");
    const campoObservacoes = document.getElementById("observacoes");

    const botaoSalvar = formEditarReserva.querySelector(
        'button[type="submit"]'
    );

    // ========================================
    // VERIFICAÇÃO DAS PERMISSÕES
    // ========================================

    const podeEditarReserva =
        usuarioLogado.funcao === "gerente" ||
        reserva.status !== "finalizada";

    // Se a reserva estiver finalizada,
    // somente o gerente poderá editar.
    if (!podeEditarReserva) {

        const campos = formEditarReserva.querySelectorAll(
            "input, select, textarea"
        );

        campos.forEach(function (campo) {
            campo.disabled = true;
        });

        // Oculta o botão Salvar alterações.
        botaoSalvar.style.display = "none";

        // Atualiza a mensagem da página.
        document.querySelector(".titulo-pagina p").textContent =
            "Reserva finalizada. Você pode apenas visualizar os dados.";
    }

    // ========================================
    // PREENCHE OS DADOS DA RESERVA
    // ========================================

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

    // Seleciona o pet e o proprietário.
    campoPet.value = reserva.pet;
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

    // Preenche os demais campos.
    campoEntrada.value = reserva.entrada;
    campoSaida.value = reserva.saida;
    campoStatus.value = reserva.status;
    campoValor.value = reserva.valor || "";
    campoObservacoes.value = reserva.observacoes || "";

    // ========================================
    // SALVAMENTO DA RESERVA
    // ========================================

    formEditarReserva.addEventListener("submit", function (evento) {

        evento.preventDefault();

        // Proteção adicional antes de salvar.
        if (
            usuarioLogado.funcao !== "gerente" &&
            reserva.status === "finalizada"
        ) {
            alert("Você não tem permissão para editar uma reserva finalizada.");
            return;
        }

        // Atualiza os dados da reserva.
        reserva.pet = campoPet.value;
        reserva.proprietario = campoProprietario.value;
        reserva.entrada = campoEntrada.value;
        reserva.saida = campoSaida.value;
        reserva.status = campoStatus.value;
        reserva.observacoes = campoObservacoes.value;
        reserva.valor = campoValor.value;

        // Grava as alterações no localStorage.
        localStorage.setItem("reservas", JSON.stringify(reservas));

        alert("Reserva " + reserva.codigo + " atualizada com sucesso!");

        window.location.href = "reservas.html";
    });

})();
