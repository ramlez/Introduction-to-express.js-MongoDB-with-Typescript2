import mongodb = require("mongodb");
import { logger } from '../logger';

// connection string = mongodb://host:port/database_name
let connectionString = "mongodb://" + process.env.MONGODB_HOST + "/reset";

class DbClient {

    public db: mongodb.Db;

    public async connect() {
        this.db = await mongodb.MongoClient.connect(connectionString);
        logger.debug("Connected to MongoDb database", this.db.databaseName);

        return this.db;
    }
}

/** Create singleton instance */
export = new DbClient();