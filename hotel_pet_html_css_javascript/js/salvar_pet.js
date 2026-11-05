// =================================================
// CARREGAR PROPRIETÁRIOS CADASTRADOS
// =================================================

document.addEventListener("DOMContentLoaded", function () {

    const proprietario = document.getElementById("proprietario");

    // Recupera os usuários cadastrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Filtra todos os usuários ativos
    const proprietariosAtivos = usuarios.filter(usuario =>
        usuario.status === "ativo"
    );

    // Adiciona os clientes ao campo Proprietário
    proprietariosAtivos.forEach(usuario => {

        const opcao = document.createElement("option");

        opcao.value = usuario.codigo;
        opcao.textContent = usuario.nome;

        proprietario.appendChild(opcao);

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
        const proprietario = document.getElementById("proprietario").value;
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