import express = require("express");

let router = express.Router();

router.use("/", (req, res, next) => {
    let resetToken = req.headers["reset-token"];

    if (resetToken && resetToken === "reset") {
        next();
    } else {
        res.sendStatus(401);
        // or next(new Error("+ access"));
    }
});

router.get("/ping", (req, res) => {
    res.json(new Date().valueOf()).end();
});

router.use("/words", require("./words"));

module.exports = router;