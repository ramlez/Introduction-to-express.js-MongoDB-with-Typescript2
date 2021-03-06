import http = require("http");
import express = require("express");
import bodyParser = require("body-parser");
import cookieParser = require("cookie-parser");
import path = require("path");
import mongodb = require("mongodb");

import { logger } from './logger';
import dbClient = require("./database");

let app = express();

app.use(bodyParser.urlencoded({ limit: "100mb", extended: false }));
app.use(bodyParser.json({ limit: "100mb" }));

app.use(cookieParser());

// process.cwd() returns a root path where application was launched
app.use(express.static(path.join(process.cwd(), "public")));

// The below command sets the default view engine for express. Last time jade was renamed to https://github.com/pugjs/pug
app.set("view engine", "jade")

// Take look at the first paramater err        
function errorHandler(err, req, res, next) {
    logger.error("Global error handler", err);
    res.status(500).end();
}

app.all("*", (req, res, next) => {
    logger.debug("Incoming request: " + req.originalUrl);
    next();
});

app.use(require("./routes"));

app.use(errorHandler);

dbClient.connect()
    .then(db => {
        let server = http
            .createServer(app)
            .listen(process.env.PORT || 3000, () => {
                let host = server.address().address;
                let port = server.address().port;

                logger.debug(`Server is listening on ${host}:${port}`);
            });
    })
    .catch(err => {
        logger.error("Unable to connect to databse;", err);
    });

export = app;