
document.addEventListener("DOMContentLoaded", function () {

    // Localiza o link Sair.
    const linkSair = document.querySelector(".usuario-area a[href='index.html']");

    // Verifica se o link existe.
    if (linkSair) {

        linkSair.addEventListener("click", function (evento) {

            // Impede a navegação imediata.
            evento.preventDefault();

            // Confirma a saída do sistema.
            const confirmar = confirm("Deseja realmente sair do Hotel Pet?");

            if (confirmar) {

                // Remove o usuário conectado.
                localStorage.removeItem("usuarioLogado");

                // Retorna à tela de login.
                window.location.replace("index.html");
            }
        });
    }

});
