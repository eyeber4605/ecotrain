"use strict";

const express = require("express");
const router = express.Router();
// const model = require("../models/tbAdmin");

const output = {
    main: async (req, res) => {
        res.render('../main/index');
    }
};

router.get('/', output.main);

module.exports = router;