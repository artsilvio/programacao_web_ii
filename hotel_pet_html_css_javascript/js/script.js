
// Valida os campos de login e senha antes de acessar a tela de reservas.

// Obtém o botão de login pelo seu identificador.
const btnLogin = document.getElementById("btn-login");

// Verifica se o botão de login existe nesta página.
if (btnLogin) {

    // Adiciona um evento de clique ao botão de login.
    btnLogin.addEventListener("click", function () {

        // Obtém os valores digitados, removendo espaços das extremidades.
        const loginValor = document.getElementById("login").value.trim();
        const senhaValor = document.getElementById("senha").value.trim();

        // Verifica se ambos os campos estão vazios.
        if (loginValor === "" && senhaValor === "") {
            alert("Por favor, informe o usuário e a senha.");

            // Verifica se o campo de usuário está vazio.
        } else if (loginValor === "") {
            alert("Por favor, informe o usuário.");

            // Verifica se o campo de senha está vazio.
        } else if (senhaValor === "") {
            alert("Por favor, informe a senha.");

            // Se ambos estiverem preenchidos, abre a tela de reservas.
        } else {
            window.location.href = "reservas.html";
        }
    });
}
