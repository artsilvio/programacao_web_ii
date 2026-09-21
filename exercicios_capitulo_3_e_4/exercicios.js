/*
EXERCÍCIOS CAPÍTULO 3 E 4
Nestes exercícios iremos  exercitar os métodos auxiliares para  array:
•  forEach
•  map
•  ﬁlter
•  ﬁnd
•  every
•  some
•  reduce
*/
/*
Exercício 1 - Par ou ímpar?
Altere o código a seguir  para  utilizar o método forEach de modo que a saída permaneça a mesma.
var numeros = [0,1,2,3,4,5];
for(var i = 0; i<= numeros.length; i++) {
if(i % 2 === 0) {
console.log(i  + ' é par');
} else {
console.log(i  + ' é ímpar');
}
}
// saída:
// 0 é par
// 1 é ímpar
// 2 é par
// 3 é ímpar
// 4 é par
// 5 é ímpar
*/

// RESPOSTA - EXERCÍCIO 1
var numeros = [0, 1, 2, 3, 4, 5];
console.log('Resposta exercício 01:');
numeros.forEach(function (numero) {
    if (numero % 2 === 0) {
        console.log(numero + ' é par');
    } else {
        console.log(numero + ' é ímpar');
    }
});

/*
Exercício 2 - Quero o dobro
Utilizando o método map, escreva o método dobrar que recebe um array de números inteiros e retorna um array com todos  os valores do array original dobrados.
•  Exemplo:  dobrar([1,2,3]) → [2,4,6]
*/

// RESPOSTA - EXERCÍCIO 2

function dobrar(numeros) {
    return numeros.map(function (numero) {
        return numero * 2;
    });
}
console.log('Resposta exercício 02:');
console.log(dobrar([1, 2, 3]));

/*
Exercício 3 - Reprovado!
Dada  uma lista de objetos que contém o nome  de um aluno e sua média  ﬁnal, crie o método 'aprovados' que recebe esta lista e retorna somente os alunos que foram aprovados.
Para isto, utilize o método filter.
var alunos = [
{ nome: 'Diogo', media: 5.5 },
{ nome: 'Julia', media: 9.5 },
{ nome: 'Roberto', media: 1.5 },
{ nome: 'Tiago', media: 6.0 }
];
•  Exemplo:  aprovados(alunos, 6.5) → [ { nome:  'Julia', media:  9.5 } ]
*/

// RESPOSTA - EXERCÍCIO 3

var alunos = [
    { nome: 'Diogo', media: 5.5 },
    { nome: 'Julia', media: 9.5 },
    { nome: 'Roberto', media: 1.5 },
    { nome: 'Tiago', media: 6.0 }
];

function aprovados(alunos, mediaMinima) {
    return alunos.filter(function (aluno) {
        return aluno.media >= mediaMinima;
    });
}
console.log('Resposta exercício 03:');
console.log(aprovados(alunos, 6.5));

/*
Exercício 4 - E tem alguma diferença?
Diga, em poucas palavras, qual a diferença entre  os métodos auxiliares
forEach e map.
*/

console.log('Resposta exercício 04:');
console.log('O forEach percorre os elementos para executar uma ação. Já o map percorre os elementos e retorna um novo array com os novos valores gerados pela função.')

/*
Exercício 5 - Você  está muito longe
Nestes exercício iremos  exercitar os conceitos de Iteradores e Iteráveis.
Implemente uma função  chamada calculaDistancia que recebe
uma lista de objetos que representam ruas  e faça a soma de seus tamanhos. Cada objeto rua da lista possui as seguintes propriedades:
•  nome:  String que representa o nome  da rua
•  tamanho: Número  intero que representa a comprimento da rua em metros
Utilize somente os conceitos que foram apresentados neste capítulo para  iterar as ruas.  Assuma que sempre haverá pelo menos uma rua no array.
Tome como exemplo, a entrada abaixo.
var ruas = [
{ nome:'Rua 1', tamanho: 2500 },
{ nome:'Rua 2', tamanho: 3400 },
{ nome:'Rua 3', tamanho: 1400 }
];
•  Exemplo:  calculaDistancia(ruas) → 7300
*/

// RESPOSTA - EXERCÍCIO 5

var ruas = [
    { nome: 'Rua A', tamanho: 2500 },
    { nome: 'Rua B', tamanho: 3400 },
    { nome: 'Rua C', tamanho: 1400 }
];

function calculaDistancia(ruas) {
    var iterador = ruas[Symbol.iterator]();
    var resultado = iterador.next();
    var distancia = 0;

    while (!resultado.done) {
        distancia += resultado.value.tamanho;
        resultado = iterador.next();
    }

    return distancia;
}

console.log('Resposta exercício 05:');
console.log('A soma das ruas é:', calculaDistancia(ruas), 'metros.');

/*
Exercício 6 - Tem alguém ai?
Desenvolva a função  'isListaVazia' que recebe como parâmetro uma lista de números inteiros qualquer e retorna o valor true caso esta lista não tenha nenhum item e false para  os demais resultados. A lógica deve  ser feita usando somente a propriedade done do objeto que é obtido ao executar o next no iterador  do array.
*/

// RESPOSTA - EXERCÍCIO 6

function isListaVazia(lista) {
    var iterador = lista[Symbol.iterator]();

    return iterador.next().done;
}

var listaVazia = [];
var listaComItens = [10, 20, 30];

console.log('Resposta exercício 06:');
console.log('Lista vazia:', isListaVazia(listaVazia));
console.log('Lista com itens:', isListaVazia(listaComItens));