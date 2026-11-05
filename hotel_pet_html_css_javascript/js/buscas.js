
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
    const reservas = document.querySelectorAll(".reserva-card");

    if (!pesquisa || !status || reservas.length === 0) return;

    function filtrar() {
        const texto = normalizarTexto(pesquisa.value);
        const statusSelecionado = normalizarTexto(status.value);
        const tipoSelecionado = tipoPet
            ? normalizarTexto(tipoPet.value)
            : "todos";

        reservas.forEach(function (reserva) {
            const textoReserva = normalizarTexto(reserva.innerText);
            const statusElemento = reserva.querySelector(".status");
            const tipoElemento = reserva.querySelector(".pet-reserva span");

            let statusReserva = normalizarTexto(
                statusElemento ? statusElemento.innerText : ""
            );

            if (statusReserva === "em andamento") {
                statusReserva = "andamento";
            }

            const tipoReserva = normalizarTexto(
                tipoElemento ? tipoElemento.innerText : ""
            );

            const textoOK = textoReserva.includes(texto);
            const statusOK =
                statusSelecionado === "todos" ||
                statusReserva === statusSelecionado;
            const tipoOK =
                tipoSelecionado === "todos" ||
                tipoReserva === tipoSelecionado;

            reserva.hidden = !(textoOK && statusOK && tipoOK);
        });

        const visiveis = Array.from(reservas)
            .filter(item => !item.hidden).length;

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
    const pets = document.querySelectorAll(".pet-card");

    if (!pesquisa || !tipo || pets.length === 0) return;

    function filtrar() {
        const texto = normalizarTexto(pesquisa.value);
        const tipoSelecionado = normalizarTexto(tipo.value);

        pets.forEach(function (pet) {
            const textoPet = normalizarTexto(pet.innerText);
            const elementoTipo = pet.querySelector(".dados-pet-card p");
            const tipoPet = normalizarTexto(
                elementoTipo ? elementoTipo.innerText : ""
            );

            const textoOK = textoPet.includes(texto);
            const tipoOK =
                tipoSelecionado === "todos" ||
                tipoPet === tipoSelecionado;

            pet.hidden = !(textoOK && tipoOK);
        });

        const visiveis = Array.from(pets)
            .filter(item => !item.hidden).length;


        const titulo = document.getElementById("titulo-lista-pets");
        const contador = document.getElementById("contador-pets");

        const pesquisaAtiva = pesquisa.value.trim() !== "";
        const quantidade = visiveis;

        if (titulo) {
            if (pesquisaAtiva) {
                titulo.textContent = quantidade === 1
                    ? "Pet encontrado"
                    : "Pets encontrados";
            } else if (tipoSelecionado === "cachorro") {
                titulo.textContent = "Cachorros cadastrados";
            } else if (tipoSelecionado === "gato") {
                titulo.textContent = quantidade === 1
                    ? "Gato cadastrado"
                    : "Gatos cadastrados";
            } else {
                titulo.textContent = "Pets cadastrados";
            }
        }

        if (contador) {
            let nomeTipo = "pets";

            if (tipoSelecionado === "cachorro") {
                nomeTipo = "cachorros";
            } else if (tipoSelecionado === "gato") {
                nomeTipo = "gatos";
            }

            if (quantidade === 1) {
                nomeTipo = tipoSelecionado === "cachorro"
                    ? "cachorro"
                    : tipoSelecionado === "gato"
                        ? "gato"
                        : "pet";
            }

            contador.textContent = quantidade + " " + nomeTipo;
        }

    }

    pesquisa.addEventListener("input", filtrar);
    tipo.addEventListener("change", filtrar);
    if (botao) botao.addEventListener("click", filtrar);

    filtrar();
});

// ========================================
// PESQUISA E FILTRO DE USUÁRIOS
// ========================================


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
