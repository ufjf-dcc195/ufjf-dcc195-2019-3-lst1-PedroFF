
exports.desenharCavalo = (linha, coluna) => {
    var tabuleiro = "<table>";
    for (let i = 1; i < 9; i++) {
        tabuleiro += '<tr>'
        for (let j = 1; j < 9; j++) {
            if ((i + j) % 2 === 0) {
                if (i === linha && j === coluna) {
                    tabuleiro += '<td class="preto">&#9816;</td>'
                } else if (possiveis(linha, coluna, i, j)) {
                    tabuleiro += '<td class="preto possivel"></td>'
                } else {
                    tabuleiro += '<td class="preto"></td>'
                }
            } else {
                if (i === linha && j === coluna) {
                    tabuleiro += '<td >&#9822;</td>'
                } else if (possiveis(linha, coluna, i, j)) {
                    tabuleiro += '<td class="possivel"></td>'
                } else {
                    tabuleiro += '<td ></td>'
                }
            }

        }
        tabuleiro += '</tr>';
    }
    tabuleiro += '</table>'
    return tabuleiro;
}

function possiveis(linha, coluna, i, j) {
    return ((coluna + 2 === j && (linha + 1 === i || linha - 1 === i))
        || (coluna - 2 === j && (linha + 1 === i || linha - 1 === i))
        || (linha + 2 === i && (coluna + 1 === j || coluna - 1 === j))
        || (linha - 2 === i && (coluna + 1 === j || coluna - 1 === j)));
}


exports.css = (res) => {
    res.write("<h2>Tabuleiro</h2>")
    res.write(`<style type='text/css'>
        table { border: 2px solid; }
        .possivel {background-color: lightgreen !important}
        td {line-height: 60px; text-align:center; font-size: 50px; width:60px; height:60px; }
        .preto {background-color: gray;}</style>
        </style>
    `);
}

exports.jsonFormatter = (linha, coluna) => {
    var json = {};
    json.cavalo = {'linha': linha,'coluna':coluna};
    json.posicoes = [];

    for (var i = 1; i < 9; i++){
        for (var j = 1; j < 9; j++){
            if (possiveis(linha, coluna, i, j)) {
                json.posicoes.push({'linha': i, 'coluna': j});
            } else {
                json.posicoes.push({'linha': '', 'coluna': ''});
            }
        }
    }
    return json;

}


