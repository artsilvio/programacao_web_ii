
// Obtém o formulário de edição de reserva.
const formEditarReserva = document.getElementById("form-editar-reserva");

// Detecta o envio do formulário.
formEditarReserva.addEventListener("submit", function (evento) {

    // Impede o recarregamento padrão da página.
    evento.preventDefault();

    // Exibe uma mensagem informando que a reserva foi editada.
    alert("Reserva editada com sucesso!");

    // Retorna para a lista de reservas.
    window.location.href = "reservas.html";
});
