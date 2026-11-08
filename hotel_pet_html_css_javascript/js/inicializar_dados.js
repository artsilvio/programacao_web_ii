
document.addEventListener("DOMContentLoaded", function () {

    // Verifica se já existem usuários cadastrados.
    const dadosUsuarios = localStorage.getItem("usuarios");

    // Inicializa somente quando a chave ainda não existe.
    if (dadosUsuarios === null) {

        const usuariosIniciais = [
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

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuariosIniciais)
        );

        console.log("Usuários iniciais cadastrados!");
    }

});
