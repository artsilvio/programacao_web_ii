
document.addEventListener("DOMContentLoaded", function () {

    // =================================================
    // IDENTIFICAR O PET PELA URL
    // =================================================

    const parametros = new URLSearchParams(window.location.search);
    const codigoPet = parametros.get("codigo");

    const pets = JSON.parse(localStorage.getItem("pets")) || [];
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const pet = pets.find(item => item.codigo === codigoPet);

    // Verifica se o pet existe.
    if (!pet) {
        alert("Pet não encontrado!");
        window.location.href = "pets.html";
        return;
    }

    // =================================================
    // REFERÊNCIAS AOS CAMPOS
    // =================================================

    const nome = document.getElementById("nome");
    const tipo = document.getElementById("tipo");
    const raca = document.getElementById("raca");
    const tamanho = document.getElementById("tamanho");
    const proprietario = document.getElementById("proprietario");
    const foto = document.getElementById("foto");
    const fotoAtual = document.getElementById("foto-atual");
    const observacoes = document.getElementById("observacoes");
    const formulario = document.getElementById("form-editar-pet");
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
    // CARREGAR PROPRIETÁRIOS ATIVOS
    // =================================================

    const proprietariosAtivos = usuarios.filter(usuario =>
        usuario.status === "ativo"
    );

    proprietariosAtivos.forEach(usuario => {

        const opcao = document.createElement("option");

        opcao.value = usuario.codigo;
        opcao.textContent = usuario.nome;

        proprietario.appendChild(opcao);

    });

    // =================================================
    // CARREGAR RAÇAS CONFORME O TIPO DE PET
    // =================================================

    function carregarRacas(tipoSelecionado, racaAtual) {

        // Limpa as opções anteriores.
        raca.innerHTML = "";

        // Cria a opção inicial.
        const opcaoInicial = document.createElement("option");

        opcaoInicial.value = "";
        opcaoInicial.textContent = "Selecione a raça";
        opcaoInicial.disabled = true;

        raca.appendChild(opcaoInicial);

        // Recupera as raças do tipo selecionado.
        const racasDisponiveis = racasPets[tipoSelecionado] || [];

        // Adiciona as raças disponíveis.
        racasDisponiveis.forEach(function (nomeRaca) {

            const opcao = document.createElement("option");

            opcao.value = nomeRaca;
            opcao.textContent = nomeRaca;

            raca.appendChild(opcao);

        });

        // Preserva raças antigas ou não cadastradas na lista.
        if (racaAtual && !racasDisponiveis.includes(racaAtual)) {

            const opcaoAntiga = document.createElement("option");

            opcaoAntiga.value = racaAtual;
            opcaoAntiga.textContent = racaAtual;

            raca.appendChild(opcaoAntiga);

        }

        // Seleciona a raça já cadastrada.
        raca.value = racaAtual || "";

    }

    // =================================================
    // PREENCHER OS DADOS DO PET
    // =================================================

    nome.value = pet.nome;
    tipo.value = pet.tipo;

    // Carrega a lista e mantém a raça atual.
    carregarRacas(pet.tipo, pet.raca);

    // Atualiza a lista quando o tipo do pet for alterado.
    tipo.addEventListener("change", function () {

        carregarRacas(tipo.value, "");

    });

    tamanho.value = pet.tamanho;
    proprietario.value = pet.proprietario;
    observacoes.value = pet.observacoes || "";

    // Exibe a foto atual.
    if (pet.foto) {
        fotoAtual.src = pet.foto;
    } else {
        fotoAtual.removeAttribute("src");
    }

    // =================================================
    // VISUALIZAR NOVA FOTO SELECIONADA
    // =================================================

    foto.addEventListener("change", function () {

        const arquivo = foto.files[0];

        if (!arquivo) return;

        const leitor = new FileReader();

        leitor.onload = function () {
            fotoAtual.src = leitor.result;
        };

        leitor.readAsDataURL(arquivo);

    });

    // =================================================
    // SALVAR ALTERAÇÕES
    // =================================================

    formulario.addEventListener("submit", async function (evento) {

        evento.preventDefault();

        try {

            let novaFoto = pet.foto || "";

            // Se uma nova foto foi selecionada, converte para Data URL.
            if (foto.files[0]) {

                novaFoto = await new Promise((resolve, reject) => {

                    const leitor = new FileReader();

                    leitor.onload = () => resolve(leitor.result);
                    leitor.onerror = () => reject(
                        new Error("Não foi possível carregar a foto.")
                    );

                    leitor.readAsDataURL(foto.files[0]);

                });

            }

            // Atualiza os dados do pet.
            pet.nome = nome.value.trim();
            pet.tipo = tipo.value;
            pet.raca = raca.value.trim();
            pet.tamanho = tamanho.value;
            pet.proprietario = proprietario.value;
            pet.foto = novaFoto;
            pet.observacoes = observacoes.value.trim();

            // Atualiza o cadastro no localStorage.
            const indice = pets.findIndex(item =>
                item.codigo === codigoPet
            );

            pets[indice] = pet;

            localStorage.setItem("pets", JSON.stringify(pets));

            alert("Pet atualizado com sucesso!");

            window.location.href = "pets.html";

        } catch (erro) {

            alert("Erro ao atualizar o pet: " + erro.message);

        }

    });

});
