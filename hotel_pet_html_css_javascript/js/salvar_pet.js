// =================================================
// LISTAS DE RAÇAS
// =================================================

const racasPets = {

    // Raças de cachorros.
    cachorro: [
        "Akita",
        "Beagle",
        "Bichon Frisé",
        "Border Collie",
        "Boxer",
        "Bulldog Francês",
        "Bulldog Inglês",
        "Bull Terrier",
        "Cane Corso",
        "Chihuahua",
        "Chow Chow",
        "Cocker Spaniel",
        "Dachshund (Salsicha)",
        "Dálmata",
        "Doberman",
        "Golden Retriever",
        "Husky Siberiano",
        "Labrador Retriever",
        "Lhasa Apso",
        "Maltês",
        "Pastor Alemão",
        "Pastor Australiano",
        "Pinscher",
        "Pit Bull",
        "Poodle",
        "Pug",
        "Rottweiler",
        "Schnauzer",
        "Shih Tzu",
        "Spitz Alemão",
        "Yorkshire Terrier",
        "SRD (Sem Raça Definida)",
        "Outra raça"
    ],

    // Raças de gatos.
    gato: [
        "Abissínio",
        "Angorá",
        "Azul Russo",
        "Bengal",
        "Birmanês",
        "British Shorthair",
        "Maine Coon",
        "Norueguês da Floresta",
        "Persa",
        "Ragdoll",
        "Siamês",
        "Sphynx",
        "Scottish Fold",
        "Siberiano",
        "SRD (Sem Raça Definida)",
        "Outra raça"
    ]

};

// =================================================
// CARREGAR PROPRIETÁRIOS CADASTRADOS
// =================================================

document.addEventListener("DOMContentLoaded", function () {

    const campoProprietario = document.getElementById("proprietario");

    // Recupera os usuários cadastrados.
    const usuarios = JSON.parse(
        localStorage.getItem("usuarios") || "[]"
    );

    // Identifica o usuário conectado.
    const codigoLogado = localStorage.getItem("usuarioLogado");

    const usuarioLogado = usuarios.find(function (usuario) {
        return usuario.codigo === codigoLogado;
    });

    if (!usuarioLogado) {
        alert("Usuário não identificado. Faça login novamente.");
        window.location.replace("index.html");
        return;
    }

    // Cliente: mostra somente o próprio nome.
    // Funcionário e gerente: mostram os clientes ativos.
    const proprietariosDisponiveis =
        usuarioLogado.funcao === "cliente"
            ? [usuarioLogado]
            : usuarios.filter(function (usuario) {
                return usuario.funcao === "cliente" &&
                    usuario.status === "ativo";
            });

    // Preenche o campo Proprietário.
    proprietariosDisponiveis.forEach(function (usuario) {

        const opcao = document.createElement("option");

        opcao.value = usuario.codigo;
        opcao.textContent = usuario.nome;

        campoProprietario.appendChild(opcao);

    });

    // Cliente: seleciona automaticamente o próprio nome.
    if (usuarioLogado.funcao === "cliente") {
        campoProprietario.value = usuarioLogado.codigo;
        campoProprietario.disabled = true;
    }

});

// =================================================
// CARREGAR RAÇAS CONFORME O TIPO DE PET
// =================================================

document.addEventListener("DOMContentLoaded", function () {

    const campoTipo = document.getElementById("tipo");
    const campoRaca = document.getElementById("raca");

    // Aguarda o usuário selecionar o tipo de pet.
    campoTipo.addEventListener("change", function () {

        const tipoSelecionado = campoTipo.value;

        // Limpa as opções anteriores.
        campoRaca.innerHTML = "";

        // Cria a opção inicial.
        const opcaoInicial = document.createElement("option");
        opcaoInicial.value = "";
        opcaoInicial.textContent = "Selecione a raça";
        opcaoInicial.disabled = true;
        opcaoInicial.selected = true;

        campoRaca.appendChild(opcaoInicial);

        // Recupera as raças correspondentes ao tipo selecionado.
        const racasDisponiveis = racasPets[tipoSelecionado] || [];

        // Adiciona as raças ao campo de seleção.
        racasDisponiveis.forEach(function (raca) {

            const opcao = document.createElement("option");

            opcao.value = raca;
            opcao.textContent = raca;

            campoRaca.appendChild(opcao);

        });

    });

});

// =================================================
// SALVAR CADASTRO DO PET
// =================================================

const formCadastrarPet = document.getElementById("form-cadastrar-pet");

// Lê a foto e converte para uma representação que pode ser armazenada.
function carregarFoto(arquivo) {

    return new Promise((resolve, reject) => {

        if (!arquivo) {
            resolve("");
            return;
        }

        const leitor = new FileReader();

        leitor.onload = function () {
            resolve(leitor.result);
        };

        leitor.onerror = function () {
            reject(new Error("Não foi possível carregar a foto."));
        };

        leitor.readAsDataURL(arquivo);

    });

}

// Gera o próximo código do pet.
function gerarCodigoPet(pets) {

    const maiorCodigo = pets.reduce((maior, pet) => {

        const numero = Number(String(pet.codigo).replace("PET", ""));

        return numero > maior ? numero : maior;

    }, 0);

    return "PET" + String(maiorCodigo + 1).padStart(3, "0");

}

// Controla o envio do formulário.
formCadastrarPet.addEventListener("submit", async function (evento) {

    evento.preventDefault();

    try {

        // Recupera os pets já cadastrados.
        const pets = JSON.parse(localStorage.getItem("pets")) || [];

        // Recupera os dados do formulário.
        const nome = document.getElementById("nome").value.trim();
        const tipo = document.getElementById("tipo").value;
        const raca = document.getElementById("raca").value.trim();
        const tamanho = document.getElementById("tamanho").value;
        // Identifica o usuário conectado.
        const codigoLogado = localStorage.getItem("usuarioLogado");

        const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

        const usuarioLogado = usuarios.find(function (usuario) {
            return usuario.codigo === codigoLogado;
        });

        // Cliente só pode cadastrar pets em seu próprio nome.
        const proprietario = usuarioLogado.funcao === "cliente"
            ? usuarioLogado.codigo
            : document.getElementById("proprietario").value;
        const fotoArquivo = document.getElementById("foto").files[0];
        const observacoes = document.getElementById("observacoes").value.trim();

        // Converte a foto selecionada.
        const foto = await carregarFoto(fotoArquivo);

        // Monta o objeto do novo pet.
        const novoPet = {

            codigo: gerarCodigoPet(pets),
            nome: nome,
            tipo: tipo,
            raca: raca,
            tamanho: tamanho,
            proprietario: proprietario,
            foto: foto,
            observacoes: observacoes

        };

        // Adiciona o novo pet à lista.
        pets.push(novoPet);

        // Salva a lista atualizada no localStorage.
        localStorage.setItem("pets", JSON.stringify(pets));

        // Confirma o cadastro somente depois de salvar.
        const cadastrarOutro = confirm(
            "Pet cadastrado com sucesso!\n\nDeseja cadastrar outro pet?"
        );

        if (cadastrarOutro) {

            window.location.href = "cadastrar_pet.html";

        } else {

            window.location.href = "pets.html";

        }

    } catch (erro) {

        alert("Erro ao cadastrar o pet: " + erro.message);

    }

});