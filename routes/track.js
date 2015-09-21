var express = require("express");
var router = express.Router();
var pg = require("pg");
var conString = "postgres://localhost:5432/track";

router.post("/register", function(req, res) {
    var results = [];
    var data = {handle: req.body.handle, score: 0};
    console.log(req.body);

    pg.connect(conString, function(err, client, done) {
        var handleError = function(err) {
            if (!err) return false;
            if (client) {
                done(client);
            }
            res.writeHead(500, {"content-type": "text/plain"});
            res.end("An error occurred");
            return true;
        };

        if (handleError(err)) return;

        client.query("INSERT INTO visitor (handle, score) VALUES ($1, $2)",
            [data.handle, data.score],
            function(err, result) {
                if (handleError(err)) return;
                done();
                res.writeHead(200, {"content-type": "text/plain"});
                res.end("Welcome " + data.handle + "! Your score is 0.");
            });
    });
});

router.get("/:handle", function(req, res) {
    var handle = req.params.handle;

    pg.connect(conString, function(err, client, done) {
        var handleError = function(err, message) {
            if (!err) return false;
            if (client) {
                done(client);
            }
            res.writeHead(500, {"content-type": "text/plain"});
            res.end("An error occurred: " + message);
            return true;
        };

        if(handleError(err, "can't connect to database")) return;

        client.query("SELECT score FROM visitor\
            WHERE handle = ($1)", [handle],
            function(err, result) {
                if (handleError(err, "database query failed")) return;
                done();
                res.writeHead(200, {"content-type": "text/plain"});
                if (!result.rows[0]) {
                    res.end("Not tracking " + handle + 
                        ". No score available." );
                } else {
                    res.end("Score of " + handle + 
                        " is " + result.rows[0].score + ".");
                }
            });
    });
});

module.exports = router;
