// ========================================
// DADOS DOS USUÁRIOS
// ========================================

let usuarios = JSON.parse(
    localStorage.getItem("usuarios")
) || [
        {
            codigo: "001",
            nome: "Carlos Oliveira",
            login: "carlos",
            email: "carlos@email.com",
            senha: "123",
            funcao: "cliente",
            status: "ativo"
        },
        {
            codigo: "002",
            nome: "Ana Souza",
            login: "ana",
            email: "ana@email.com",
            senha: "123",
            funcao: "cliente",
            status: "ativo"
        },
        {
            codigo: "003",
            nome: "João Santos",
            login: "joao",
            email: "joao@email.com",
            senha: "123",
            funcao: "funcionario",
            status: "ativo"
        },
        {
            codigo: "004",
            nome: "Mariana Costa",
            login: "mariana",
            email: "mariana@email.com",
            senha: "123",
            funcao: "gerente",
            status: "ativo"
        },
        {
            codigo: "005",
            nome: "Pedro Almeida",
            login: "pedro",
            email: "pedro@email.com",
            senha: "123",
            funcao: "funcionario",
            status: "inativo"
        }
    ];

// ========================================
// SALVAR USUÁRIOS NO LOCALSTORAGE
// ========================================

function salvarUsuarios() {

    localStorage.setItem(
        "usuarios",
        JSON.stringify(usuarios)
    );

}

// Salva os dados iniciais ou recuperados
salvarUsuarios();

// Identifica o usuário conectado.
const codigoLogado = localStorage.getItem("usuarioLogado");

const usuarioLogado = usuarios.find(function (item) {
    return item.codigo === codigoLogado;
});

// ========================================
// EXIBIR USUÁRIOS NA TABELA
// ========================================

const listaUsuarios = document.getElementById("lista-usuarios");

function renderizarUsuarios() {

    // Limpa o conteúdo atual da tabela
    listaUsuarios.innerHTML = "";

    // Percorre o array de usuários
    usuarios.forEach(function (usuario) {

        // Cria uma nova linha
        const linha = document.createElement("tr");

        // Cria as células com os dados do usuário
        const codigo = document.createElement("td");
        codigo.textContent = usuario.codigo;

        const nome = document.createElement("td");
        nome.textContent = usuario.nome;

        const login = document.createElement("td");
        login.textContent = usuario.login;

        const email = document.createElement("td");
        email.textContent = usuario.email;

        const funcao = document.createElement("td");
        funcao.textContent =
            usuario.funcao.charAt(0).toUpperCase() +
            usuario.funcao.slice(1);

        const status = document.createElement("td");

        const etiquetaStatus = document.createElement("span");

        etiquetaStatus.classList.add("status-usuario");

        if (usuario.status === "ativo") {
            etiquetaStatus.classList.add("ativo");
            etiquetaStatus.textContent = "Ativo";
        } else {
            etiquetaStatus.classList.add("inativo");
            etiquetaStatus.textContent = "Inativo";
        }

        status.appendChild(etiquetaStatus);

        // Cria a célula de ações
        const acoes = document.createElement("td");
        acoes.classList.add("acoes-tabela");

        const linkEditar = document.createElement("a");
        linkEditar.href = "editar_usuario.html?codigo=" + usuario.codigo;
        linkEditar.textContent = "Editar";
        linkEditar.classList.add("acao-botao", "acao-editar");

        const linkExcluir = document.createElement("a");
        linkExcluir.href = "#";
        linkExcluir.textContent = "Excluir";
        linkExcluir.classList.add("acao-botao", "acao-excluir");

        // Evento para excluir o usuário
        linkExcluir.addEventListener("click", function (evento) {

            evento.preventDefault();

            // Verifica a permissão para excluir.
            if (
                usuarioLogado.funcao === "funcionario" &&
                (
                    usuario.funcao !== "cliente" ||
                    usuario.codigo === usuarioLogado.codigo
                )
            ) {
                alert("Funcionários só podem excluir cadastros de clientes.");
                return;
            }

            const confirmar = confirm(
                "Deseja realmente excluir o usuário " + usuario.nome + "?"
            );

            if (confirmar) {

                // Remove o usuário pelo código
                usuarios = usuarios.filter(function (item) {
                    return item.codigo !== usuario.codigo;
                });

                // Atualiza o localStorage
                salvarUsuarios();

                // Atualiza a tabela
                renderizarUsuarios();

                // Atualiza o contador
                const contador = document.getElementById("contador-usuarios");

                if (contador) {
                    contador.textContent =
                        usuarios.length +
                        (usuarios.length === 1 ? " usuário" : " usuários");
                }

                alert("Usuário excluído com sucesso!");
            }

        });

        // Botão para ativar ou inativar usuário
        const linkStatus = document.createElement("a");

        if (usuario.status === "ativo") {
            linkStatus.textContent = "Inativar";
        } else {
            linkStatus.textContent = "Ativar";
        }

        linkStatus.classList.add("acao-botao");

        if (usuario.status === "ativo") {
            linkStatus.classList.add("acao-inativar");
        } else {
            linkStatus.classList.add("acao-ativar");
        }

        linkStatus.href = "#";

        linkStatus.addEventListener("click", function (evento) {

            evento.preventDefault();

            // Verifica a permissão para alterar o status.
            if (
                usuarioLogado.funcao === "funcionario" &&
                (
                    usuario.funcao !== "cliente" ||
                    usuario.codigo === usuarioLogado.codigo
                )
            ) {
                alert("Funcionários só podem alterar o status de clientes.");
                return;
            }

            // Alterna o status do usuário
            usuario.status = usuario.status === "ativo" ? "inativo" : "ativo";

            // Salva a alteração
            salvarUsuarios();

            // Atualiza a tabela
            renderizarUsuarios();

        });

        // Controla as ações conforme a função do usuário conectado.

        if (usuarioLogado) {

            // GERENTE: pode realizar todas as operações.
            if (usuarioLogado.funcao === "gerente") {

                acoes.appendChild(linkEditar);
                acoes.appendChild(linkExcluir);
                acoes.appendChild(linkStatus);

            }

            // FUNCIONÁRIO: permissões limitadas.
            else if (usuarioLogado.funcao === "funcionario") {

                // Pode editar o próprio cadastro e o de clientes.
                if (
                    usuario.codigo === usuarioLogado.codigo ||
                    usuario.funcao === "cliente"
                ) {
                    acoes.appendChild(linkEditar);
                }

                // Só pode excluir clientes, nunca a si mesmo.
                if (
                    usuario.funcao === "cliente" &&
                    usuario.codigo !== usuarioLogado.codigo
                ) {
                    acoes.appendChild(linkExcluir);
                    acoes.appendChild(linkStatus);
                }

            }
        }

        // Adiciona todas as células à linha
        linha.appendChild(codigo);
        linha.appendChild(nome);
        linha.appendChild(login);
        linha.appendChild(email);
        linha.appendChild(funcao);
        linha.appendChild(status);
        linha.appendChild(acoes);

        // Adiciona a linha à tabela
        listaUsuarios.appendChild(linha);
    });
}

// Executa a função para preencher a tabela
renderizarUsuarios();

// Atualiza o contador de usuários
const contadorUsuarios = document.getElementById("contador-usuarios");

if (contadorUsuarios) {
    const quantidade = document.querySelectorAll(
        "#lista-usuarios tr"
    ).length;

    contadorUsuarios.textContent =
        quantidade + (quantidade === 1 ? " usuário" : " usuários");
}

// Exibe os usuários no console
console.table(usuarios);

// Acessando o primeiro usuário
console.log(usuarios[0]);

// Exibindo o nome do primeiro usuário
console.log(usuarios[0].nome);

// Exibindo o nome do terceiro usuário
console.log(usuarios[2].nome);

// Percorrendo todos os usuários
usuarios.forEach(function (usuario) {
    console.log(usuario.nome);
});