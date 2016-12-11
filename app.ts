import http = require("http");
import { logger } from './logger';

http.createServer((req, res) => {
    logger.debug("Request", req);

    res.end(new Date().valueOf().toString());

}).listen(3000, () => {
    logger.debug("Server is listening on 3000 port");
});