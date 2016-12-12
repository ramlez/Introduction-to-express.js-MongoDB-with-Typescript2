import express = require("express");
import { logger } from '../logger';
import { WordExtracotrHelper } from '../helpers/WordExtractorHelper';

let router = express.Router();

router.post("", (req, res, next) => {

    if (req.body.text) {
        try {
            let results = WordExtracotrHelper.extract(req.body.text);
            logger.debug(JSON.stringify(results));

            // TODO insert to database

            res.sendStatus(200);
        } catch (error) {
            next(error);
        }

    } else {
        res.sendStatus(400);
    }
});

module.exports = router;