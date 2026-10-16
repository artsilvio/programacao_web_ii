
// Exercício 1: Alterando o conteúdo de um elemento

document.getElementById("titulo-boas-vindas").textContent =
    "Bem-vindo ao Curso de Desenvolvimento de Sistemas!";

// Exercício 2: Criando e adicionando elementos dinamicamente

function adicionarItem(texto) {
    const novoItem = document.createElement("li");
    novoItem.textContent = texto;

    document.getElementById("lista-tarefas").appendChild(novoItem);
}

document.getElementById("btn-adicionar").addEventListener("click", function () {
    const campo = document.getElementById("nova-tarefa");

    if (campo.value.trim() !== "") {
        adicionarItem(campo.value);
        campo.value = "";
    }
});

// Exercício 3: Alternando e alterando estilos CSS com classList

const painel = document.getElementById("painel");

painel.classList.remove("oculto");
painel.classList.add("destaque");


// Exercício 4: Remoção de elementos da árvore

function removerPrimeiraNotificacao() {
    const lista = document.getElementById("notificacoes");

    if (lista.firstElementChild) {
        lista.removeChild(lista.firstElementChild);
    }
}

document.getElementById("btn-remover-notificacao")
    .addEventListener("click", removerPrimeiraNotificacao);


// Exercício 5: Manipulação com eventos de clique

document.getElementById("btn-exibir").addEventListener("click", function () {
    const nome = document.getElementById("campo-nome").value.trim();

    if (nome !== "") {
        document.getElementById("resposta").textContent =
            "Olá, " + nome + "! Seja bem-vindo(a)!";
    } else {
        document.getElementById("resposta").textContent =
            "Por favor, digite seu nome.";
    }
});