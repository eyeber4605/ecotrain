"use strict";

require('dotenv').config();

const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const logger = require('../lib/logger');

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const output = {
    postToken: (req, res) => {
        // logger.info(`Received request with headers: ${JSON.stringify(req.headers)}`);
        // logger.info(`Received request with body: ${JSON.stringify(req.body)}`);

        let username, password;

        try {
            const headerAuth = JSON.parse(req.header('username'));
            username = headerAuth.username;
            password = headerAuth.password;
        } catch (e) {
            username = req.header('username');
            password = req.header('password');
        }

        if (!username || !password) {
            if (req.headers['content-type'] === 'application/json') {
                username = req.body.username;
                password = req.body.password;
            } else {
                try {
                    const parsedBody = JSON.parse(Object.keys(req.body)[0]);
                    username = parsedBody.username;
                    password = parsedBody.password;
                } catch (error) {
                    username = req.body.username;
                    password = req.body.password;
                }
            }
        }

        if (username === 'root' && password === '1234qwer') {
            const token = jwt.sign({ username }, SECRET_KEY, {
                expiresIn: '24h',
                algorithm: 'HS256'
            });
            res.json({ token });
            // logger.info(`token issued success`);
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
            logger.info(`username: ${username} password:${password}`);
        }
    }
};

router.post('/', output.postToken);

module.exports = router;