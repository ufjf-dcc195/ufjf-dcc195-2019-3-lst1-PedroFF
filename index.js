const server = require("./server");
const router = require("./router");
const controllers = require("./controllers");

const rotas = {};
rotas["/"] = controllers.index;
rotas["/index.html"] = controllers.index;
rotas["/sobre.html"] = controllers.sobre;
rotas["/aleatorios.html"] = controllers.aleatorios;
rotas["/primos.html"] = controllers.primos;
rotas["404"] = controllers.notfound;

server.start(router.route, rotas);
