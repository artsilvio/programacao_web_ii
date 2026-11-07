
document.addEventListener("DOMContentLoaded", function () {

    const campoValorDiaria = document.getElementById("valor_diaria");
    const campoCapacidade = document.getElementById("capacidade");

    // Recupera as configurações salvas
    const configuracoes = JSON.parse(
        localStorage.getItem("configuracoes") || "{}"
    );

    // Carrega o valor da diária
    if (configuracoes.valorDiaria !== undefined) {
        campoValorDiaria.value = configuracoes.valorDiaria;
    }

    // Carrega a capacidade de hospedagem
    if (configuracoes.capacidade !== undefined) {
        campoCapacidade.value = configuracoes.capacidade;
    }

    // Salva as configurações ao enviar o formulário
    const formulario = document.querySelector("form");

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        configuracoes.valorDiaria = Number(campoValorDiaria.value);
        configuracoes.capacidade = Number(campoCapacidade.value);

        localStorage.setItem(
            "configuracoes",
            JSON.stringify(configuracoes)
        );

        alert("Configurações salvas com sucesso!");

    });

});
