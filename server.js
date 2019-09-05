let http = require("http");
const url = require("url");

function start(route, routes) {
    

    let server = http.createServer(function(req, res){
        route(url.parse(req.url).pathname, routes, req, res);
    });
    server.listen(8888);

    console.log("Servidor na porta http://localhost:8888");
}

exports.start = start;