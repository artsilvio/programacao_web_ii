// Exercício 1 - Hora de usar as setas
/*
Utilize o que foi aprendido neste capítulo e refatore a função `imprimeProduto` para utilizar arrow functions. Não deixe de customizar o método para utilizar templates strings.
``` javascript
let carrinho = [
    { nome: 'abacaxi', preco: '2.00' },
    { nome: 'detergente', preco: '2.50' },
    { nome: 'bolacha', preco: '3.80' }
]

carrinho.forEach(function(produto) {
    imprimeProduto(produto.nome, produto.preco);
})

function imprimeProduto(nome, preco) {
    console.log('Produto: ' + nome + ' | ' + 'Preço: ' + preco);
}
```
*/

// RESPOSTA - EXERCÍCIO 1

let carrinho = [
    { nome: 'abacaxi', preco: '2.00' },
    { nome: 'detergente', preco: '2.50' },
    { nome: 'bolacha', preco: '3.80' }
];

const imprimeProduto = (nome, preco) => {
    console.log(`Produto: ${nome} | Preço: ${preco}`);
};

console.log('\nRESPOSTA - EXERCÍCIO 1:')
carrinho.forEach(produto => {
    imprimeProduto(produto.nome, produto.preco);
});

//Exercício 2 - Vou lavar sua boca com sabão!
/*
Utilize as arrow funcions para deixar o código a seguir ainda menor.
``` javascript

let palavroes = [
    "Inconstitucionalíssimo",
    "Otorrinolaringologista",
    "Pneumoultramicroscopicossilicovulcanoconiose",
    "Oftalmotorrinolaringologista"
];

let tamanhos =  palavroes.map(function(palavrao){ return palavrao.length });

console.log(tamanhos); // [ 22, 22, 44, 28 ]
*/

// RESPOSTA - EXERCÍCIO 2

let palavroes = [
    "Inconstitucionalíssimo",
    "Otorrinolaringologista",
    "Pneumoultramicroscopicossilicovulcanoconiose",
    "Oftalmotorrinolaringologista"
];

let tamanhos = palavroes.map(palavrao => palavrao.length);
console.log('RESPOSTA - EXERCÍCIO 2:')
console.log(tamanhos);


// Exercício 3 - Não são só umas reticências?
/*
Qual a diferença básica entre os operadores Rest e Spread?
*/

// RESPOSTA - EXERCÍCIO 3

console.log('\nRESPOSTA - EXERCÍCIO 3:');

console.log(
    'A diferença básica entre os operadores Rest e Spread está na sua finalidade. ' +
    'O operador Rest (...) é utilizado para agrupar vários argumentos em um único array, ' +
    'permitindo que uma função receba uma quantidade variável de parâmetros. ' +
    'Já o operador Spread (...) é utilizado para expandir os elementos de um array, ' +
    'facilitando sua utilização em chamadas de funções ou na criação de novos arrays.'
);

console.log('Portanto, o Rest reúne valores, enquanto o Spread expande valores.');

// Exemplo 1 — Operador Rest com números

console.log('\nExemplo 1 — Rest com números:');

function somar(...numeros) {
    return numeros.reduce((total, numero) => total + numero, 0);
}

console.log('Soma:', somar(10, 20, 30));

// Exemplo 2 — Operador Rest com palavras

console.log('\nExemplo 2 — Rest com palavras:');

function listarPalavras(...palavras) {
    console.log(palavras);
}

listarPalavras('Feijão', 'Arroz', 'Carne', 'Batata', 'Tomate');

// Exemplo 3 — Operador Spread com números

console.log('\nExemplo 3 — Spread com números:');

const numeros1 = [1, 2, 3];
const numeros2 = [2, 5, 6];

const todosNumeros = [...numeros1, ...numeros2];

console.log(todosNumeros);

// Exemplo 4 — Operador Spread com frutas

console.log('\nExemplo 4 — Spread com frutas:');

const frutas1 = ['Maçã', 'Banana'];
const frutas2 = ['Uva', 'Manga'];

const todasFrutas = [...frutas1, ...frutas2];

console.log(todasFrutas);

// Exercício 4 - A união faz a força
/*
Refatore o código a seguir para utilizar o operador `Spread` ao invés do método `concat`.
``` javascript
const equipeMarketing = ['Joana', 'Marcela', 'Bruna'];
const equipeComercial = ['Talita', 'Luisa', 'Vitória'];

const timeCompleto = equipeMarketing.concat(equipeComercial);

realizaBrainstorm(timeCompleto);
*/

// RESPOSTA - EXERCÍCIO 4

const equipeMarketing = ['Joana', 'Marcela', 'Bruna'];
const equipeComercial = ['Talita', 'Luisa', 'Vitória'];

const timeCompleto = [...equipeMarketing, ...equipeComercial];

console.log('\nRESPOSTA - EXERCÍCIO 4:');
console.log(timeCompleto);

//Exercício 5 - Pegando a propriedade na lata
/*
Refatore o trecho de código a seguir para utilizar a técnica de desestruturamento.
``` javascript
const email = usuario.email;
const nome = usuario.nome;
const idade = usuario.idade
*/

// RESPOSTA - EXERCÍCIO 5

const usuario = {
    email: 'jose_da_silva@email.com',
    nome: 'José da Silva',
    idade: 37
};

const { email, nome, idade } = usuario;

console.log('\nRESPOSTA - EXERCÍCIO 5:');
console.log(email);
console.log(nome);
console.log(idade);

console.log(
    '\nA desestruturação permite extrair várias propriedades de um objeto em ' +
    'uma única declaração, deixando o código mais conciso. Os dois métodos ' +
    'produzem os mesmos valores; a diferença está na forma de obtê-los.'
);

//Exercício 6 - Cara-Crachá
/*
Otimize o trecho de código a seguir utilizando o desestruturamento.
``` javascript
const profissional = {
  titulo: 'Engenheiro de Software',
  departamento: 'Engenharia'
};

function isEngenheiro(profissional) {
  const titulo = profissional.titulo;
  const departamento = profissional.departamento;

  return titulo.indexOf("Engenheiro") > -1 && departamento === 'Engenharia';
}

isEngenheiro(profissional); // true
profissional.titulo = 'Marketing';
isEngenheiro(profissional); // false
```
*/

// RESPOSTA - EXERCÍCIO 6

const profissional = {
    titulo: 'Engenheiro de Software',
    departamento: 'Engenharia'
};

function isEngenheiro({ titulo, departamento }) {
    return titulo.indexOf('Engenheiro') > -1 &&
        departamento === 'Engenharia';
}

console.log('\nRESPOSTA - EXERCÍCIO 6:');

console.log(isEngenheiro(profissional));

profissional.titulo = 'Marketing';

console.log(isEngenheiro(profissional));

// Exercício 7 - O meu videogame é muito melhor que o seu
/*
Aproveitando a classe `VideoGame` criada no exercício anterior, implemente a classe `PlayStation` que contém todas as propriedades do `VideoGame` mais as seguintes proprieades:
nEntradasUSB: inteiro que representa a quantidade de entradas usb do console
voltagem: inteiro que representa a voltagem do console.
adicionais: array de strings que representam os nomes dos adicionais do videogame (ex: adicionais=['Controle sem fio', 'Volante'])
Não esqueça de invocar um objeto da classe.
*/

// RESPOSTA - EXERCÍCIO 7

// Classe pai criada para demonstrar a herança
class VideoGame {
    constructor(nome, marca) {
        this.nome = nome;
        this.marca = marca;
    }
}

// Classe filha
class PlayStation extends VideoGame {
    constructor(nome, marca, nEntradasUSB, voltagem, adicionais) {
        super(nome, marca);

        this.nEntradasUSB = nEntradasUSB;
        this.voltagem = voltagem;
        this.adicionais = adicionais;
    }
}

// Criando um objeto da classe PlayStation
const meuPlayStation = new PlayStation(
    'PlayStation 5',
    'Sony',
    3,
    110,
    ['Controle sem fio', 'Volante']
);

console.log('\nRESPOSTA - EXERCÍCIO 7:');
console.log(meuPlayStation);

// Exercício 8 - Você cumpre as suas promessas?
/*
Implemente o método simulaPromise() que recebe um parâmetro chamado `sucesso` que é um Boolean que indicará se a Promise foi realizada com sucesso ou não. O método deve receber esta parâmetro e imprimir a mensagem: `ok` em caso de sucesso e `not ok` no caso contrário.
Exemplo:
``` javascript
simulaPromise(false); // not ok
simulaPromise(true); // ok
```
Não se esqueça de utilizar o `resolve`, `reject`, `then` e `catch` para resolver o exercício.
*/

// RESPOSTA - EXERCÍCIO 8


function simulaPromise8(sucesso) {
    const promessa = new Promise((resolve, reject) => {
        if (sucesso) {
            resolve('ok');
        } else {
            reject('not ok');
        }
    });

    promessa
        .then((mensagem) => console.log(mensagem))
        .catch((erro) => console.log(erro));
}

console.log('\nRESPOSTA - EXERCÍCIO 8:');

simulaPromise8(false);
simulaPromise8(true);

// Exercício 9 - Você cumpre as suas promessas em tempo?
/*
Para melhorar a simulação de Promise criada no exercício anterior, faça com o método receba mais um argumento chamado `delay` que é um inteiro que representa os milisegundos que a solicitação demora para responder. Ao executar o método, ele deve demorar o tempo do `delay` para exibir a mensagem no console.
Exemplo:
``` javascript
simulaPromise(true, 2000); // ok
simulaPromise(false, 1000); // not ok

// ordem que aparece no console
// not ok
// ok
```
*/

// RESPOSTA - EXERCÍCIO 9

function simulaPromise9(sucesso, delay) {
    const promessa = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (sucesso) {
                resolve('ok');
            } else {
                reject('not ok');
            }
        }, delay);
    });

    promessa
        .then((mensagem) => console.log(mensagem))
        .catch((mensagem) => console.log(mensagem));
}

console.log('\nRESPOSTA - EXERCÍCIO 9:');

simulaPromise9(true, 2000);
simulaPromise9(false, 1000);

// Exercício 10 - Passando promessa de pai para filho
/*
Qual é o problema com o trecho de código a seguir? E como consertá-lo?
``` javascript
// ...
promise
  .then((data) => console.log(`resultado positivo: ${data}`))
  .then((data) => console.log(`resultado positivo 2: ${data}`))
  .catch((data) => console.log(`resultado negativo: ${data}`));
```
*/

// RESPOSTA - EXERCÍCIO 10

let promise10 = new Promise((resolve, reject) => {
    resolve('deu tudo certo!');
});

console.log('\nRESPOSTA - EXERCÍCIO 10:');

promise10
    .then((data) => {
        console.log(`resultado positivo: ${data}`);
        return data;
    })
    .then((data) => console.log(`resultado positivo 2: ${data}`))
    .catch((data) => console.log(`resultado negativo: ${data}`));
