var url = require('url');
var querystring = require('querystring');
var address = "http://somedomain.com/pasta/arquivo.html?p1=v1&p2=v2#ids";

console.log("host: ",url.parse(address).host);
console.log("path: ",url.parse(address).path);
console.log("pathname: ",url.parse(address).pathname);
var query = url.parse(address).query;
console.log("query: ",query);
console.log("hash: ",url.parse(address).hash);
console.log("querystring", querystring.parse(query));
