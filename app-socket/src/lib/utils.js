"use strict";

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const logger = require('./logger');
let sequenceNumber = 0;

function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        return null;
    }
}

function handleIncomingMessage(ws, req, message) {


    const token = req.url.split('token=')[1];
    if (!token) {
        sendNack(ws, 'Empty Token');
        return;
    }

    const userData = verifyToken(token);
    if (!userData) {
        sendNack(ws, 'Invalid Token');
        logger.info(`user : none from ${req.socket.remoteAddress}`);
        return;
    } else {
        logger.info(`user : ${userData.username} from ${req.socket.remoteAddress}`);
    }



    let parsedData;
    let isValidJson = true;

    sequenceNumber++;

    try {
        parsedData = JSON.parse(message);
        if (typeof parsedData !== 'object' || parsedData === null) {
            isValidJson = false;
        }
    } catch (error) {
        isValidJson = false;
    }

    if (isValidJson) {
        sendAck(ws, 'Success', sequenceNumber);
    } else {
        sendNack(ws, 'Invalid JSON format', sequenceNumber);
    }
}

function sendAck(ws, message, seq = null) {
    ws.send(JSON.stringify({
        result: 'ACK',
        seq: seq,
        message: message
    }));
}

function sendNack(ws, message, seq = null) {
    ws.send(JSON.stringify({
        result: 'NACK',
        seq: seq,
        message: message
    }));
}

module.exports = {
    verifyToken,
    handleIncomingMessage,
    sendAck,
    sendNack
};