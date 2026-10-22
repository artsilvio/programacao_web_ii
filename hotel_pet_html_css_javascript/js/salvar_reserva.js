
// Obtém o formulário de fazer reserva pelo seu identificador.
const formFazerReserva = document.getElementById("form-fazer-reserva");

// Adiciona um evento para detectar o envio do formulário.
formFazerReserva.addEventListener("submit", function (evento) {

    // Impede o envio tradicional do formulário e o recarregamento da página.
    evento.preventDefault();

    // Pergunta se o usuário deseja cadastrar outra reserva.
    const fazerOutra = confirm(
        "Reserva cadastrada com sucesso!\n\nDeseja cadastrar outra reserva?"
    );

    // Verifica se o usuário clicou em OK (Sim).
    if (fazerOutra) {

        // Se clicou em Sim, abre novamente o formulário de reserva.
        window.location.href = "fazer_reserva.html";

    } else {

        // Se clicou em Cancelar (Não), retorna à lista de reservas.
        window.location.href = "reservas.html";
    }
});
