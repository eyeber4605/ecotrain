"use strict";

require('dotenv').config();

const express = require('express');
const http = require('http');
const { Server } = require('ws');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');
const Layout = require('express-ejs-layouts');
const App = express();

// middleware
App.use(express.json());
App.use(express.urlencoded({ extended: false }));

App.set('views', './src/views/layout');
App.set('view engine', 'ejs');
App.use(Layout);

const main = require('./src/controllers/mainController');
const api = require('./src/controllers/apiController');
const error = require('./src/controllers/errorController');
const { handleIncomingMessage } = require('./src/lib/utils');

App.use('/', main);
App.use('/api/getToken', api);

App.use(error.handle404Error);
App.use(error.handle500Error);

const server = http.createServer(App);
const wss = new Server({ server });

wss.on('connection', (ws, req) => {
    ws.on('message', (message) => {
        handleIncomingMessage(ws, req, message);
    });
    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});


const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`WebSocket server is running on ws://localhost:${PORT}`);
});