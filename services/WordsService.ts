import { IWordStatisticsModel } from '../helpers/WordExtractorHelper';
import dbClient = require("../database");
import { logger } from '../logger';

export class WordsService {

    public save(words: IWordStatisticsModel[]): Promise<any> {
        let wordsToInsert = words.map(x => {
            return { created: new Date(), ...x }
        });

        return dbClient.db.collection("words")
            .insertMany(wordsToInsert)
            .then(res => logger.debug(`Inserted ${res.insertedCount}`));
    }
}