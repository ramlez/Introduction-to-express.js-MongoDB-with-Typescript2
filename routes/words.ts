import express = require("express");
import { logger } from '../logger';
import { WordExtracotrHelper } from '../helpers/WordExtractorHelper';
import { WordsService } from '../services/WordsService';

let router = express.Router();
let wordsService = new WordsService();

router.post("/", (req, res, next) => {

    if (req.body.text) {
        try {
            let results = WordExtracotrHelper.extract(req.body.text);
            logger.debug(JSON.stringify(results));

            wordsService.save(results);

            res.sendStatus(200);
        } catch (error) {
            next(error);
        }

    } else {
        res.sendStatus(400);
    }
});

module.exports = router;