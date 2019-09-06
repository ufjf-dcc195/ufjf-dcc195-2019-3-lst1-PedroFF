exports.index  = function trataRequisicao(req, res) {
    res.writeHead(200, {"Content-Type":"text/html"});
    res.write(`
    <html>
    <head>
        <meta charset="utf-8" />
        <title>Página Inicial</title>
    </head>
    <body>
    <h2>Lista de exercício</h2>`);
    res.end();
}

exports.notfound  = function (req, res) {
    res.writeHead(404, {"Content-Type":"text/html"});
    res.write(`
    <html>
    <head>
        <meta charset="utf-8" />
        <title>Página não encontrada</title>
    </head>
    <body>
    <h1>Página não encontrada: ${req.url}`);
    res.end();
}

exports.sobre = (req,res)=>{
    res.writeHead(200, {"Content-Type":"text/html"});
    res.write(`
    <html>
    <head>
        <meta charset="utf-8" />
        <title>Sobre</title>
    </head>
    <body>
    <h3>Nome: Pedro Fernandes Freitas</h3>
    <h3>Matrícula: 201576039</h3>
    <h3>Email: soufreitas.pedro@gmail.com</h3>
    <h3>Curso: Sistemas de Informação</h3>`);
    res.end();
}

exports.aleatorios = (req, res) => {
    var listaPar = [];
    var listaImpar = [];
    while(listaPar.length <100){
        let num = Math.floor(Math.random()*1000);
        num%2 === 0 ? listaPar.push(num) : listaPar.push(num+1)

    }
    
    while(listaImpar.length <100){
        let num = Math.floor(Math.random()*1000);
        num%2 === 0 ? listaImpar.push(num+1) : listaImpar.push(num)

    }

    res.writeHead(200, {"Content-Type":"text/html"});
    res.write(`
    <html>
    <head>
        <meta charset="utf-8" />
        <title>Listas Aleatórias</title>
    </head>
    <body>
    <h3>Listas aleatórias:</h3>`);
    res.write('<p>Lista par: '+listaPar)
    res.write('<p>Lista ímpar: '+listaImpar)
    res.end();
}

function isPrimo(numero){
    if (numero != 1) {
        for (let i = 2; i < numero; i++) {
            if (numero % i == 0) return false
        }
        return true
    }
    return false
}


function calcularPrimos(res,num1,num2) {
    if (num1 < num2 && num2 < 100) {
        res.write("Intervalo de primos: ")
        while (num1 <= num2) {
            if (isPrimo(num1)) {
                res.write(" " + num1 + " ")
            }
            num1++
        }
    } else res.write("Números ausentes ou inválidos")
}
exports.primos = (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
    res.write("<h4>Calcular primos entre os parâmetros e menores que 100</h4>")
    res.write("<p>Insira os parâmetros pela URL</p>")
    let url = require('url')
    let numeros = url.parse(req.url, true).query
    let num1 = numeros.num1
    let num2 = numeros.num2
    calcularPrimos(res, num1, num2)
    res.end()
}