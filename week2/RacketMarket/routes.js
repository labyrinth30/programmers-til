function route(pathname, handle, req, res) {
    const decodedPathname = decodeURIComponent(pathname);

    if (typeof handle[decodedPathname] == 'function') {
        handle[decodedPathname](req, res, decodedPathname);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.write('404 Not Found, 찾으시는 페이지는 존재하지 않는 페이지입니다.');
        res.end();

        console.log(`No handler found for ${decodedPathname}`);
    }
}

module.exports = { route };