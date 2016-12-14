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

            wordsService.save(results)
                .then(insertedCount => res.json({ insertedCount: insertedCount }))
                .catch(next);

        } catch (error) {
            next(error);
        }
    } else {
        res.sendStatus(400);
    }
});

router.get("/most-popular", (req, res, next) => {
    let limit = parseInt(req.query.limit);
    wordsService.getMostPopular(limit)
        .then(results => {
            res.send(results).end();
        })
        .catch(next);
});

router.get("/less-popular", async (req, res, next) => {
    try {
        let limit = parseInt(req.query.limit);
        let results = await wordsService.getLessPopular(limit);

        res.send(results).end();
    } catch (error) {
        next(error);
    }
});

module.exports = router;