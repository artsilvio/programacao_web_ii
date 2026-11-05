
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
    // PREENCHER OS DADOS DO PET
    // =================================================

    nome.value = pet.nome;
    tipo.value = pet.tipo;
    raca.value = pet.raca;
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
