const { start } = require('./server');
const router = require('./routes');
const { handle } = require('./requestHandler');

start(router.route, handle);