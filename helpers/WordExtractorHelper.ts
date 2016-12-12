import _ = require("lodash");
import { logger } from '../logger';

export interface IWordStatisticsModel {
    word: string;
    count: number;
}

export class WordExtracotrHelper {

    static extract(text: string): IWordStatisticsModel[] {
        logger.debug("WordExtracotrHelper.extract`");

        let words = text
            .toLowerCase()
            .replace(/\d+/g, " ")
            .split(/\W+/)
            .filter(x => x.length > 3);

        let grouped = _.groupBy(words);

        let results: IWordStatisticsModel[] = [];

        _.forIn(grouped, (value: string[], key: string) => {
            results.push({ word: key, count: value.length });
        });

        return results;
    }
}