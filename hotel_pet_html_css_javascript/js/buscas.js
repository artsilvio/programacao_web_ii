
document.addEventListener("DOMContentLoaded", function () {

    const campoPesquisa = document.getElementById("pesquisa");
    const campoStatus = document.getElementById("status");
    const botaoFiltrar = document.querySelector(".botao-filtrar");
    const reservas = document.querySelectorAll(".reserva-card");

    if (!campoStatus || reservas.length === 0) {
        return;
    }

    function filtrarReservas() {

        const textoPesquisa = campoPesquisa.value
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

        const statusSelecionado = campoStatus.value;

        reservas.forEach(function (reserva) {

            const textoReserva = reserva.innerText
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

            let statusReserva = reserva
                .querySelector(".status")
                .innerText
                .toLowerCase()
                .trim()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

            if (statusReserva === "em andamento") {
                statusReserva = "andamento";
            }

            const correspondeTexto =
                textoReserva.includes(textoPesquisa);

            const correspondeStatus =
                statusSelecionado === "todos" ||
                statusReserva === statusSelecionado;

            reserva.hidden = !(
                correspondeTexto && correspondeStatus
            );

        });

    }

    // Pesquisa automaticamente enquanto digita
    campoPesquisa.addEventListener("input", filtrarReservas);

    // Aplica o filtro quando o status é alterado
    campoStatus.addEventListener("change", filtrarReservas);

    // Mantém o funcionamento do botão Filtrar
    botaoFiltrar.addEventListener("click", filtrarReservas);

});

// ========================================
// PESQUISA E FILTRO DE PETS
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const campoPesquisaPets = document.getElementById("pesquisa");
    const campoTipoPets = document.getElementById("tipo");
    const botaoFiltrarPets = document.querySelector(".botao-filtrar");
    const pets = document.querySelectorAll(".pet-card");

    // Só executa este bloco na página que possui cartões de pets
    if (campoPesquisaPets && campoTipoPets && pets.length > 0) {

        function filtrarPets() {

            const textoPesquisa = campoPesquisaPets.value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .trim();

            const tipoSelecionado = campoTipoPets.value;

            pets.forEach(function (pet) {

                const textoPet = pet.innerText
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "");

                const tipoPet = pet
                    .querySelector(".dados-pet-card p")
                    .innerText
                    .toLowerCase()
                    .trim();

                const correspondeTexto =
                    textoPet.includes(textoPesquisa);

                const correspondeTipo =
                    tipoSelecionado === "todos" ||
                    tipoPet === tipoSelecionado;

                pet.hidden = !(
                    correspondeTexto && correspondeTipo
                );

            });
        }

        campoPesquisaPets.addEventListener("input", filtrarPets);
        campoTipoPets.addEventListener("change", filtrarPets);

        if (botaoFiltrarPets) {
            botaoFiltrarPets.addEventListener("click", filtrarPets);
        }
    }
});


/* ========================================
   PESQUISA E FILTRO DE USUÁRIOS
   ======================================== */

document.addEventListener("DOMContentLoaded", function () {

    const campoPesquisaUsuarios = document.getElementById("pesquisa");
    const campoFuncao = document.getElementById("funcao");
    const linhasUsuarios = document.querySelectorAll(
        ".tabela-usuarios tbody tr"
    );
    const botaoFiltrarUsuarios = document.querySelector(
        ".botao-filtrar"
    );

    // Executa somente na página de usuários
    if (
        !campoPesquisaUsuarios ||
        !campoFuncao ||
        linhasUsuarios.length === 0
    ) {
        return;
    }

    function filtrarUsuarios() {

        const textoPesquisa = campoPesquisaUsuarios.value
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

        const funcaoSelecionada = campoFuncao.value;

        linhasUsuarios.forEach(function (linha) {

            const textoLinha = linha.innerText
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

            const celulas = linha.querySelectorAll("td");
            const funcaoUsuario = celulas[4].innerText
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .trim();

            const correspondeTexto =
                textoLinha.includes(textoPesquisa);

            const correspondeFuncao =
                funcaoSelecionada === "todos" ||
                funcaoUsuario === funcaoSelecionada;

            linha.hidden = !(
                correspondeTexto && correspondeFuncao
            );
        });
    }

    // Pesquisa enquanto digita
    campoPesquisaUsuarios.addEventListener(
        "input",
        filtrarUsuarios
    );

    // Filtra quando a função é alterada
    campoFuncao.addEventListener(
        "change",
        filtrarUsuarios
    );

    // Mantém o botão Filtrar funcionando
    if (botaoFiltrarUsuarios) {
        botaoFiltrarUsuarios.addEventListener(
            "click",
            filtrarUsuarios
        );
    }
});
