import { IWordStatisticsModel } from '../helpers/WordExtractorHelper';
import dbClient = require("../database");
import { logger } from '../logger';

export class WordsService {

    public save(words: IWordStatisticsModel[]) {
        let wordsToInsert = words.map(x => {
            return { created: new Date(), ...x }
        });

        return dbClient.db.collection("words")
            .insertMany(wordsToInsert)
            .then(res => logger.debug(`Inserted ${res.insertedCount}`));
    }

    public getMostPopular(limit?: number) {
        return new Promise((resolve, reject) => {
            dbClient.db.collection("words")
                .aggregate([
                    {
                        $group: { _id: "$word", count: { $sum: "$count" } }
                    },
                    { $sort: { count: -1 } },
                    { $limit: limit || 10 },
                    {
                        $project: { word: "$_id", count: "$count", _id: 0 }
                    }
                ], (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    }

    public getLessPopular(limit?: number) {
        return new Promise((resolve, reject) => {
            dbClient.db.collection("words")
                .aggregate([
                    {
                        $group: { _id: "$word", count: { $sum: "$count" } }
                    },
                    { $sort: { count: 1 } },
                    { $limit: limit || 10 },
                    {
                        $project: { word: "$_id", count: "$count", _id: 0 }
                    }
                ], (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
        });
    }
}