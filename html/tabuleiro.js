
exports.desenharCavalo = (linha, coluna) => {
    var tabuleiro = "<table>";
    for (let i = 1; i < 9; i++) {
        tabuleiro += '<tr>'
        for (let j = 1; j < 9; j++) {
            if( (i+j)%2 === 0){
                if (i === linha && j === coluna) {
                    tabuleiro += '<td class="preto">&#9816;</td>'
                } else if (possiveis(linha, coluna, i, j)) {
                    tabuleiro += '<td class="preto">&otimes;</td>'
                } else {
                    tabuleiro += '<td class="preto"></td>'
                }
            } else {
                if (i === linha && j === coluna) {
                    tabuleiro += '<td >&#9822;</td>'
                } else if (possiveis(linha, coluna, i, j)) {
                    tabuleiro += '<td >&otimes;</td>'
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


exports.css = (response) => {
    response.write("<h2>Tabuleiro</h2>")
    response.write("<style type='text/css'>");
    response.write("  table { border: 2px solid; }");
    response.write(" td {line-height: 60px; text-align:center; font-size: 50px; width:60px; height:60px; }");
    response.write(".preto {background-color: gray;}</style>");
    response.write("</style>");
}


