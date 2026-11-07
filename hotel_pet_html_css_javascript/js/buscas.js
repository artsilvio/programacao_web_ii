
function normalizarTexto(texto) {
    return (texto || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

// ========================================
// PESQUISA E FILTRO DE RESERVAS
// ========================================

document.addEventListener("DOMContentLoaded", function () {
    const pesquisa = document.getElementById("pesquisa");
    const status = document.getElementById("status");
    const tipoPet = document.getElementById("tipo-pet");
    const botao = document.querySelector(".botao-filtrar");
    const reservas = document.querySelectorAll(
        "#lista-reservas-container .reserva-card"
    );

    if (!pesquisa || !status || reservas.length === 0) return;

    function filtrar() {
        const texto = normalizarTexto(pesquisa.value);
        const statusSelecionado = normalizarTexto(status.value);
        const tipoSelecionado = tipoPet
            ? normalizarTexto(tipoPet.value)
            : "todos";

        reservas.forEach(function (reserva) {
            const textoReserva = normalizarTexto(reserva.innerText);
            const statusElemento = reserva.querySelector(".status-reserva");
            const tipoElemento = reserva.querySelector(".tipo-pet-reserva");

            let statusReserva = normalizarTexto(
                statusElemento ? statusElemento.innerText : ""
            );

            if (statusReserva === "em andamento") {
                statusReserva = "andamento";
            }

            const tipoReserva = normalizarTexto(
                tipoElemento ? tipoElemento.innerText : ""
            );

            const textoOK = texto === "" || textoReserva.includes(texto);
            const statusOK =
                statusSelecionado === "todos" ||
                statusReserva === statusSelecionado;
            const tipoOK =
                tipoSelecionado === "todos" ||
                tipoReserva === tipoSelecionado;

            if (textoOK && statusOK && tipoOK) {
                reserva.style.display = "";
            } else {
                reserva.style.display = "none";
            }
        });

        const visiveis = Array.from(reservas)
            .filter(item => item.style.display !== "none").length;

        const titulo = document.getElementById("titulo-lista-reservas");
        const contador = document.getElementById("contador-reservas");

        if (titulo) {
            titulo.textContent = pesquisa.value.trim() ||
                statusSelecionado !== "todos" ||
                tipoSelecionado !== "todos"
                ? (visiveis === 1 ? "Reserva encontrada" : "Reservas encontradas")
                : (visiveis === 1 ? "Reserva cadastrada" : "Reservas cadastradas");
        }

        if (contador) {
            contador.textContent =
                visiveis + (visiveis === 1 ? " reserva" : " reservas");
        }
    }

    pesquisa.addEventListener("input", filtrar);
    status.addEventListener("change", filtrar);

    if (tipoPet) tipoPet.addEventListener("change", filtrar);
    if (botao) botao.addEventListener("click", filtrar);

    filtrar();
});

// ========================================
// PESQUISA E FILTRO DE PETS
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const pesquisa = document.getElementById("pesquisa");
    const tipo = document.getElementById("tipo");
    const botao = document.querySelector(".botao-filtrar");

    if (!pesquisa || !tipo) return;

    function normalizarTexto(texto) {
        return (texto || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    function filtrar() {

        // Busca os cards atualizados a cada filtro.
        const pets = document.querySelectorAll(
            "#lista-pets-container .pet-card"
        );

        const texto = normalizarTexto(pesquisa.value);
        const tipoSelecionado = normalizarTexto(tipo.value);

        pets.forEach(function (pet) {

            const textoPet = normalizarTexto(pet.innerText);

            const elementoTipo = pet.querySelector(
                ".dados-pet-card p"
            );

            const tipoPet = normalizarTexto(
                elementoTipo ? elementoTipo.innerText : ""
            );

            const textoOK = textoPet.includes(texto);

            const tipoOK =
                tipoSelecionado === "todos" ||
                tipoPet === tipoSelecionado;

            if (textoOK && tipoOK) {
                pet.style.display = "";
            } else {
                pet.style.display = "none";
            }

        });

        // Conta somente os pets visíveis.
        const visiveis = Array.from(pets)
            .filter(pet => !pet.hidden).length;

        const contador = document.getElementById("contador-pets");

        const titulo = document.getElementById("titulo-lista-pets");

        if (titulo) {

            if (pesquisa.value.trim() !== "") {

                titulo.textContent = visiveis === 1
                    ? "Pet encontrado"
                    : "Pets encontrados";

            } else if (tipoSelecionado === "cachorro") {

                titulo.textContent = visiveis <= 1
                    ? "Cachorro cadastrado"
                    : "Cachorros cadastrados";

            } else if (tipoSelecionado === "gato") {

                titulo.textContent = visiveis <= 1
                    ? "Gato cadastrado"
                    : "Gatos cadastrados";

            } else {

                titulo.textContent = visiveis <= 1
                    ? "Pet cadastrado"
                    : "Pets cadastrados";

            }
        }

        if (contador) {
            contador.textContent = visiveis +
                (visiveis === 1 ? " pet" : " pets");
        }

    }

    pesquisa.addEventListener("input", filtrar);
    tipo.addEventListener("change", filtrar);

    if (botao) {
        botao.addEventListener("click", filtrar);
    }

    filtrar();

});

// ========================================
// PESQUISA E FILTRO DE USUÁRIOS
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const pesquisa = document.getElementById("pesquisa");
    const funcao = document.getElementById("funcao");
    const botao = document.querySelector(".botao-filtrar");

    // Verifica se estamos na página de usuários
    if (!pesquisa || !funcao) {
        return;
    }

    // Remove acentos e padroniza o texto
    function normalizarTexto(texto) {
        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    function filtrar() {

        // Busca as linhas sempre que o filtro é executado
        const linhas = document.querySelectorAll(
            ".tabela-usuarios tbody tr"
        );

        const texto = normalizarTexto(pesquisa.value);
        const funcaoSelecionada = normalizarTexto(funcao.value);

        linhas.forEach(function (linha) {

            const textoLinha = normalizarTexto(linha.innerText);
            const celulas = linha.querySelectorAll("td");

            const funcaoUsuario = normalizarTexto(
                celulas[4] ? celulas[4].innerText : ""
            );

            const textoOK = textoLinha.includes(texto);

            const funcaoOK =
                funcaoSelecionada === "todos" ||
                funcaoUsuario === funcaoSelecionada;

            linha.hidden = !(textoOK && funcaoOK);
        });

        // Conta somente os usuários visíveis
        const quantidadeEncontrada = Array.from(linhas)
            .filter(linha => !linha.hidden).length;

        const titulo = document.getElementById(
            "titulo-lista-usuarios"
        );

        const contador = document.getElementById(
            "contador-usuarios"
        );

        const pesquisaAtiva =
            pesquisa.value.trim() !== "" ||
            funcaoSelecionada !== "todos";

        const nomesFuncoes = {
            cliente: ["Cliente", "Clientes"],
            funcionario: ["Funcionário", "Funcionários"],
            gerente: ["Gerente", "Gerentes"]
        };

        // Atualiza o título
        if (titulo) {

            if (funcaoSelecionada !== "todos") {

                const nomes = nomesFuncoes[funcaoSelecionada];

                if (nomes) {
                    titulo.textContent =
                        quantidadeEncontrada === 1
                            ? nomes[0] + " encontrado"
                            : nomes[1] + " encontrados";
                }

            } else if (pesquisaAtiva) {

                titulo.textContent =
                    quantidadeEncontrada === 1
                        ? "Usuário encontrado"
                        : "Usuários encontrados";

            } else {

                titulo.textContent = "Usuários cadastrados";
            }
        }

        // Atualiza o contador
        if (contador) {

            if (
                funcaoSelecionada !== "todos" &&
                nomesFuncoes[funcaoSelecionada]
            ) {

                const nomes = nomesFuncoes[funcaoSelecionada];

                contador.textContent =
                    quantidadeEncontrada + " " +
                    (quantidadeEncontrada === 1
                        ? nomes[0].toLowerCase()
                        : nomes[1].toLowerCase());

            } else {

                contador.textContent =
                    quantidadeEncontrada +
                    (quantidadeEncontrada === 1
                        ? " usuário"
                        : " usuários");
            }
        }
    }

    // Pesquisa enquanto digita
    pesquisa.addEventListener("input", filtrar);

    // Filtra quando a função é alterada
    funcao.addEventListener("change", filtrar);

    // Mantém o botão Filtrar funcionando
    if (botao) {
        botao.addEventListener("click", filtrar);
    }

    filtrar();
});
