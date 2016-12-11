import http = require("http");

http.createServer((req, res) => {
    console.log(req);

    res.end(new Date().valueOf().toString());

}).listen(3000, () => {
    console.log("Server is listening on 3000 port");
});