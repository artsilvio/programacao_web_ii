// EXERCÍCIOS CAPÍTULOS 6, 7 E 8

/*
Exercício 1 - Comprinhas online

Implemente o método 'calculaValorTotalDaCompra' que recebe quatro parâmetros:

•  produtos: Lista com o nome  dos produtos comprados
•  cidade: String que representa o nome  da cidade
•  caixa: Mapa que contém relação de produtos e preços
•  fretes:  Mapa que contém relação de cidades e fretes

Calcule  o preço  total da compra junto com o frete de acordo com as tabelas a seguir:

Produtos:
Produto	Preço
Arroz	7.10
Feijão	2.30
Macarrão	4.70
Refrigerante	3.00

Fretes:
Cidade	Frete
São  Paulo	10.10
Rio de Janeiro	12.30
Brasília	14.70
Outros	13.00

•  Exemplo:  calculaValorTotalDaCompra(['Arroz'], 'São  Paulo',  caixa, fretes)  → 7.20

*/

// RESPOSTA - EXERCÍCIO 1

var caixa = new Map();

caixa.set('Arroz', 7.10);
caixa.set('Feijão', 2.30);
caixa.set('Macarrão', 4.70);
caixa.set('Refrigerante', 3.00);

var fretes = new Map();

fretes.set('São Paulo', 10.10);
fretes.set('Rio de Janeiro', 12.30);
fretes.set('Brasília', 14.70);
fretes.set('Outros', 13.00);

function calculaValorTotalDaCompra(produtos, cidade, caixa, fretes) {
    var total = 0;

    produtos.forEach(function (produto) {
        total += caixa.get(produto);
    });

    total += fretes.get(cidade);

    return total;
}

console.log('RESPOSTA - EXERCÍCIO 1:')
console.log('Arroz para o estado de São Paulo é: R$ ' + calculaValorTotalDaCompra(['Arroz'], 'São Paulo', caixa, fretes).toFixed(2));
console.log('Arroz para o estado de Rio de Janeiro é: R$ ' + calculaValorTotalDaCompra(['Arroz'], 'Rio de Janeiro', caixa, fretes).toFixed(2));
console.log('Arroz para o estado de Brasília é: R$ ' + calculaValorTotalDaCompra(['Arroz'], 'Brasília', caixa, fretes).toFixed(2));
console.log('Arroz para outros estados é: R$ ' + calculaValorTotalDaCompra(['Arroz'], 'Outros', caixa, fretes).toFixed(2));
console.log('Feijão para o estado de São Paulo é: R$ ' + calculaValorTotalDaCompra(['Feijão'], 'São Paulo', caixa, fretes).toFixed(2));
console.log('Feijão para o estado de Rio de Janeiro é: R$ ' + calculaValorTotalDaCompra(['Feijão'], 'Rio de Janeiro', caixa, fretes).toFixed(2));
console.log('Feijão para o estado de Brasília é: R$ ' + calculaValorTotalDaCompra(['Feijão'], 'Brasília', caixa, fretes).toFixed(2));
console.log('Feijão para outros estados é: R$ ' + calculaValorTotalDaCompra(['Feijão'], 'Outros', caixa, fretes).toFixed(2));
console.log('Macarrão para o estado de São Paulo é: R$ ' + calculaValorTotalDaCompra(['Macarrão'], 'São Paulo', caixa, fretes).toFixed(2));
console.log('Macarrão para o estado de Rio de Janeiro é: R$ ' + calculaValorTotalDaCompra(['Macarrão'], 'Rio de Janeiro', caixa, fretes).toFixed(2));
console.log('Macarrão para o estado de Brasília é: R$ ' + calculaValorTotalDaCompra(['Macarrão'], 'Brasília', caixa, fretes).toFixed(2));
console.log('Macarrão para outros estados é: R$ ' + calculaValorTotalDaCompra(['Macarrão'], 'Outros', caixa, fretes).toFixed(2));
console.log('Refrigerante para o estado de São Paulo é: R$ ' + calculaValorTotalDaCompra(['Refrigerante'], 'São Paulo', caixa, fretes).toFixed(2));
console.log('Refrigerante para o estado de Rio de Janeiro é: R$ ' + calculaValorTotalDaCompra(['Refrigerante'], 'Rio de Janeiro', caixa, fretes).toFixed(2));
console.log('Refrigerante para o estado de Brasília é: R$ ' + calculaValorTotalDaCompra(['Refrigerante'], 'Brasília', caixa, fretes).toFixed(2));
console.log('Refrigerante para outros estados é: R$ ' + calculaValorTotalDaCompra(['Refrigerante'], 'Outros', caixa, fretes).toFixed(2));

console.table([
    {
        Produto: 'Arroz',
        'São Paulo': calculaValorTotalDaCompra(['Arroz'], 'São Paulo', caixa, fretes).toFixed(2),
        'Rio de Janeiro': calculaValorTotalDaCompra(['Arroz'], 'Rio de Janeiro', caixa, fretes).toFixed(2),
        'Brasília': calculaValorTotalDaCompra(['Arroz'], 'Brasília', caixa, fretes).toFixed(2),
        Outros: calculaValorTotalDaCompra(['Arroz'], 'Outros', caixa, fretes).toFixed(2)
    },
    {
        Produto: 'Feijão',
        'São Paulo': calculaValorTotalDaCompra(['Feijão'], 'São Paulo', caixa, fretes).toFixed(2),
        'Rio de Janeiro': calculaValorTotalDaCompra(['Feijão'], 'Rio de Janeiro', caixa, fretes).toFixed(2),
        'Brasília': calculaValorTotalDaCompra(['Feijão'], 'Brasília', caixa, fretes).toFixed(2),
        Outros: calculaValorTotalDaCompra(['Feijão'], 'Outros', caixa, fretes).toFixed(2)
    },
    {
        Produto: 'Macarrão',
        'São Paulo': calculaValorTotalDaCompra(['Macarrão'], 'São Paulo', caixa, fretes).toFixed(2),
        'Rio de Janeiro': calculaValorTotalDaCompra(['Macarrão'], 'Rio de Janeiro', caixa, fretes).toFixed(2),
        'Brasília': calculaValorTotalDaCompra(['Macarrão'], 'Brasília', caixa, fretes).toFixed(2),
        Outros: calculaValorTotalDaCompra(['Macarrão'], 'Outros', caixa, fretes).toFixed(2)
    },
    {
        Produto: 'Refrigerante',
        'São Paulo': calculaValorTotalDaCompra(['Refrigerante'], 'São Paulo', caixa, fretes).toFixed(2),
        'Rio de Janeiro': calculaValorTotalDaCompra(['Refrigerante'], 'Rio de Janeiro', caixa, fretes).toFixed(2),
        'Brasília': calculaValorTotalDaCompra(['Refrigerante'], 'Brasília', caixa, fretes).toFixed(2),
        Outros: calculaValorTotalDaCompra(['Refrigerante'], 'Outros', caixa, fretes).toFixed(2)
    }
]);

console.log('Todos os produtos para o estado de São Paulo são: R$ ' + calculaValorTotalDaCompra(['Arroz', 'Feijão', 'Macarrão', 'Refrigerante'], 'São Paulo', caixa, fretes).toFixed(2));
console.log('Todos os produtos para o estado de Rio de Janeiro são: R$ ' + calculaValorTotalDaCompra(['Arroz', 'Feijão', 'Macarrão', 'Refrigerante'], 'Rio de Janeiro', caixa, fretes).toFixed(2));
console.log('Todos os produtos para o estado de Brasília são: R$ ' + calculaValorTotalDaCompra(['Arroz', 'Feijão', 'Macarrão', 'Refrigerante'], 'Brasília', caixa, fretes).toFixed(2));
console.log('Todos os produtos para o outros são: R$ ' + calculaValorTotalDaCompra(['Arroz', 'Feijão', 'Macarrão', 'Refrigerante'], 'Outros', caixa, fretes).toFixed(2));

/*
Exercício 2 - Retirando o excesso


Implemente o método 'removeDuplicatas' quer recebe o seguinte parâmetro:

•  numeros: lista de números inteiros positivos

O método deve  retornar a lista de número sem  repetições. Utilize a estrutura de dados Set para  resolver este problema.

•  Exemplo:  removeDuplicatas([1,1,2,2,3,3]) → [1,2,3]
*/

// RESPOSTA - EXERCÍCIO 2

function removeDuplicatas(numeros) {
    var conjunto = new Set(numeros);
    var lista = Array.from(conjunto);

    return lista;
}
console.log('RESPOSTA - EXERCÍCIO 2:')
console.log(removeDuplicatas([1, 1, 2, 2, 3, 3]));
console.log(removeDuplicatas([15, 1, 15, 22, 31, 31]));

/*Exercício 3 - Sei tudo sobre variáveis

Considere o trecho  de código abaixo  e responda as questões:

var arrayFuncoes  = [];
for(var i = 0; i < 10; i++){
arrayFuncoes.push(function(){
console.log(i);
});
}

arrayFuncoes.forEach(function(funcao){
funcao();
});

a) Quais  os valores são  exibidos  no console na execução desse código?

b) Como podemos ajustar o comportamento desta função utilizando ES6?
*/

// RESPOSTA - EXERCÍCIO 3
console.log('RESPOSTA - EXERCÍCIO 3:')
console.log('Resposta da Letra a');
console.log('Com var, são exibidos dez valores 10')
var arrayFuncoes = [];

for (var i = 0; i < 10; i++) {
    arrayFuncoes.push(function () {
        console.log(i);
    });
}

arrayFuncoes.forEach(function (funcao) {
    funcao();
});

console.log('Resposta da Letra b');
var arrayFuncoes = [];

for (let i = 0; i < 10; i++) {
    arrayFuncoes.push(function () {
        console.log(i);
    });
}

arrayFuncoes.forEach(function (funcao) {
    funcao();
});

/*
Exercício 4 - Não estou entendendo mais
nada
Uma jovem programadora pensou que havia entendido como
funcionava a declaração de variáveis com let e const até ver o
seguinte trecho de código:
const jogador = {};
jogador.nome = 'Rodrigo';
jogador.idade = 33;
console.log(jogador.nome + '_' + jogador.idade); // saída: Ela achou que este código não funcionaria, pois havia entendido que
não era possível colocar novos valores em variáveis declaradas com
const. Por que este código funciona sem problemas?
*/

// RESPOSTA - EXERCÍCIO 4
console.log('RESPOSTA - EXERCÍCIO 4:')

const jogador = {};
jogador.nome = 'Rodrigo';
jogador.idade = 33;

console.log(jogador.nome + '_' + jogador.idade); // saída: Rodrigo_33
console.log('O código funciona porque const impede a reatribuição da variável, mas não impede a alteração das propriedades de um objeto. Nesse caso, jogador continua referenciando o mesmo objeto; apenas suas propriedades nome e idade são modificadas. O que não seria permitido seria atribuir um novo objeto à variável jogador.');

/*Exercício 5 - Tudo fora de escopo
Refatore o código a seguir utilizando o const e let.

var status = [
{ codigo: 'OK', resposta: 'Sucesso' },
{ codigo: 'FAILED', resposta: 'Erro' },
{ codigo: 'PENDING', resposta: 'Pendente' }
];
var mensagem = '';
var codigoAtual  = 'OK';

for (var i = 0; i < status.length; i++) {
if (status[i].codigo === codigoAtual)  {
mensagem = status[i].resposta;
}
}

console.log(mensagem);
*/
// RESPOSTA - EXERCÍCIO 5
console.log('RESPOSTA - EXERCÍCIO 5:')

const status = [
    { codigo: 'OK', resposta: 'Sucesso' },
    { codigo: 'FAILED', resposta: 'Erro' },
    { codigo: 'PENDING', resposta: 'Pendente' }
];
let mensagem = '';
const codigoAtual = 'OK';

for (let i = 0; i < status.length; i++) {
    if (status[i].codigo === codigoAtual) {
        mensagem = status[i].resposta;
    }
}

console.log(mensagem);
