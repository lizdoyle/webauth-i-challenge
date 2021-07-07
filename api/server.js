const express = require("express");
const session = require('express-session');

const apiRouter = require("./api-router.js");
const configureMiddleware = require("./configure-middleware.js");

const server = express();

const sessionConfig = {
        name: 'sunglasses',
        secret: "ilovesecretstheyarefunandoverlycomplicated",

        cookie: {
            maxAge: 1000 * 30,
            secure: false,
            httpOnly: true,
        }

        resave: false,
        saveUninitialized: false,
}

configureMiddleware(server);

server.use(session(sessionConfig))

server.use("/api", apiRouter);

server.get('/', (req, res) => {
    res.json({api: "This is working"})
});

module.exports = server;
