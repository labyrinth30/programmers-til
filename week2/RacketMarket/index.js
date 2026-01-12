const { start } = require('./server');
const router = require('./router');
const { handle } = require('./requestHandler');

const mariadb = require('./database/connect/mariadb');
mariadb.connect();

start(router.route, handle);