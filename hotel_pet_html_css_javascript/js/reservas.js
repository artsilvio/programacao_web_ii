// Recupera as reservas cadastradas.
const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
// Ordena as reservas pelo código.
reservas.sort(function (a, b) {
    return a.codigo.localeCompare(b.codigo);
});

// Recupera os pets cadastrados.
const pets = JSON.parse(localStorage.getItem("pets")) || [];

// Recupera os usuários cadastrados.
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Obtém o espaço onde os cartões serão exibidos.
const listaReservas = document.getElementById("lista-reservas-container");

// Obtém o contador de reservas.
const contadorReservas = document.getElementById("contador-reservas");

// Atualiza o contador.
contadorReservas.textContent =
    reservas.length + (reservas.length === 1 ? " reserva" : " reservas");

console.log("Reservas:", reservas);
console.log("Pets:", pets);
console.log("Usuários:", usuarios);

// Formata a data para o padrão brasileiro.
function formatarData(data) {
    if (!data) {
        return "";
    }

    const partes = data.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
}

// Exibe as reservas cadastradas.
reservas.forEach(function (reserva) {

    // Localiza o pet da reserva.
    const pet = pets.find(function (item) {
        return item.codigo === reserva.pet;
    });

    // Localiza o proprietário.
    const proprietario = usuarios.find(function (item) {
        return item.codigo === reserva.proprietario;
    });

    // Cria o cartão da reserva.
    const cartao = document.createElement("article");
    cartao.classList.add("reserva-card");

    // Preenche o cartão.
    cartao.innerHTML = `
        <div class="codigo-reserva">
            <strong>${reserva.codigo}</strong>
        </div>

        <div>
    <strong>${pet ? pet.nome : "Pet não encontrado"}</strong>
    <p class="tipo-pet-reserva">${pet ? pet.tipo : ""}</p>
</div>

        <div>
            ${proprietario ? proprietario.nome : "Proprietário não encontrado"}
        </div>

        <div>
        ${formatarData(reserva.entrada)}
        </div>

        <div>
        ${formatarData(reserva.saida)}
        </div>

        <div>
    <span class="status-reserva ${reserva.status}">
        ${reserva.status}
    </span>
</div>

<div class="acoes-reserva">
    <a href="ver_reserva.html?codigo=${reserva.codigo}"
       class="botao-visualizar-reserva">
        Visualizar
    </a>

    <a href="editar_reserva.html?codigo=${reserva.codigo}"
       class="botao-editar-reserva">
        Editar
    </a>
</div>        

    `;

    // Adiciona o cartão à página.
    listaReservas.appendChild(cartao);
});