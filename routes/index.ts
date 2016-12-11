import express = require("express");

let router = express.Router();

router.get("/ping", (req, res) => {
    res.json(new Date().valueOf()).end();
});

module.exports = router;