const http = require('http');
const url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
        let pathname = url.parse(request.url).pathname;
        route(pathname, handle, request, response);
    }
    http.createServer(onRequest).listen(3000);
}

module.exports = { start };