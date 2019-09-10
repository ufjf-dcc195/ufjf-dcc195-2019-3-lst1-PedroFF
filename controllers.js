var qs = require("querystring");
var fs = require('fs');
var tabuleiro = require('./html/tabuleiro');

exports.index = function trataRequisicao(req, res) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
    <html>
    <head>
        <meta charset="utf-8" />
        <title>Página Inicial</title>
    </head>
    <body>
    <h2>Lista de exercício</h2>
    <a href='sobre.html'>Sobre</a><br/>
    <a href='aleatorios.html'>Listas aleatórias</a><br/>
    <a href='primos.html'>Primos</a><br/>
    <a href='equacao.html'>Equção segundo grau</a><br/>
    <a href='xadrez.html'>Xadrez</a>`);
    res.end();
}

exports.notfound = function (req, res) {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write(`
    <html>
    <head>
        <meta charset="utf-8" />
        <title>Página não encontrada</title>
    </head>
    <body>
    <h1>Página não encontrada: ${req.url} <br/>
    <a href='index.html'>Home</a>`);
    res.end();
}

exports.sobre = (res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
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
    <h3>Curso: Sistemas de Informação</h3>
    <br/>
    <a href='index.html'>Home</a>`);
    res.end();
}

exports.aleatorios = (res) => {
    var listaPar = [];
    var listaImpar = [];
    for (let i = 0; i < 100; i++) {
        let num = Math.floor(Math.random() * 1000);
        num % 2 === 0 ? listaPar.push(num) : listaImpar.push(num)
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`
    <html>
    <head>
        <meta charset="utf-8" />
        <title>Listas Aleatórias</title>
    </head>
    <body>
    <h3>Listas aleatórias:</h3>`);
    res.write('<p>Lista par: ' + listaPar)
    res.write('<p>Lista ímpar: ' + listaImpar)
    res.write(`<br/><br/><a href='index.html'>Home</a>`)
    res.end();
}

function isPrimo(numero) {
    if (numero != 1) {
        for (let i = 2; i < numero; i++) {
            if (numero % i == 0) return false
        }
        return true
    }
    return false
}


function calcularPrimos(res, num1, num2) {
    res.write(`<h3>Resultado: </h3> `)
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
    res.write(`<br/><br/><a href='index.html'>Home</a>`)
    res.end()
}

exports.equacao = (req, res) => {
    if (req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
        res.write("<h2> Equação </h2>")
        formEquacao(res)
        res.end()
    } else {
        let body = ''
        req.on('data', function (data) { body += data })
        req.on('end', function () {
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
            let dados = qs.parse(body)
            let a = parseFloat(dados.a)
            let b = parseFloat(dados.b)
            let c = parseFloat(dados.c)
            resultadoEq(res, a, b, c)
            res.end()
        })
    }


}

function formEquacao(res) {
    res.write("<form method=post>")
    res.write(`<label>Digite valor de A: </label><input type=text name=a><br/>
    <label>Digite valor de B: </label><input type=text name=b><br/>
    <label>Digite valor de C: </label><input type=text name=c><br/>
    <input type=submit />
    </form>
    <a href='index.html'>Home</a>`)
}

function resultadoEq(res, num1, num2, num3) {
    let d = (num2 * num2) - (4 * num1 * num3)
    if (d >= 0) {
        let raizd = Math.sqrt(d)
        let x1 = (-num2 + raizd) / (2 * num1)
        let x2 = (-num2 - raizd) / (2 * num1)
        res.write(`<h4>Resultados:</h4>
        <p>Valor x1 =  ${x1.toFixed(2)} </p>
        <p>Valor x2 = ${x2.toFixed(2)} </p><br/>`)
    } else res.write("Números inválidos")
    res.write("<a href='index.html'>Home</a>")
}


exports.xadrez = (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    if (req.method === 'GET') {
        formXadrez(res);
        fs.readFile('./html/tabuleiro.html', null, (error, data) => {
            if (error) {
                res.writeHead(404);
                res.write('Arquivo html não encontrado');
                res.end();
            } else {
                res.write(`<h3>Tabuleiro</h3>`);
                res.write(data);
                res.write(`<a href='index.html'>Home</a>`)
                res.end();
            }

        })
    } else {
        {
            let body = ''
            req.on('data', function (data) { body += data })
            req.on('end', function () {
                let dados = qs.parse(body)
                let linha = parseInt(dados.linha)
                let coluna = parseInt(dados.coluna)
                let tab = tabuleiro.desenharCavalo(linha, coluna);
                tabuleiro.css(res);
                res.write(tab);
                res.write("<a href='xadrez.html'>Voltar</a> \n")
                res.end()
            })
        }
    }
}

function formXadrez(res) {
    res.write("<form method=post>")
    res.write(`<label>Digite valor de linha: </label><input type=number min="1" max="8" name=linha><br/><br/>
    <label>Digite valor de coluna: </label><input type=number min="1" max="8" name=coluna><br/><br/>
    <input type=submit />
    </form>`)
}
