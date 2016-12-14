import log4js = require("log4js");

log4js.configure({
    appenders: [
        { type: "console" },
        // before enabling the below command you need to create a logs folder
        // { type: 'file', filename: 'logs/app.log' }
    ]
});

let logger = log4js.getLogger();

export { logger };