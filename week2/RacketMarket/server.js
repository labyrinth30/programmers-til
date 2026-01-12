const http = require('http');
const url = require('url');

function start(route, handle) {
    function onRequest(request, response) {
        let pathname = url.parse(request.url).pathname;
        let queryData = url.parse(request.url, true).query;
        let productId = queryData.productId;
        route(pathname, handle, response, productId);
    }
    http.createServer(onRequest).listen(3000);
}

module.exports = { start };