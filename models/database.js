var pg = require("pg");
var connectionString = "postgres://localhost:5432/track";

var client = new pg.Client(connectionString);
client.connect();
var query = client.query("CREATE TABLE visitor(\
  handle VARCHAR(15) PRIMARY KEY,\
  score BIGINT)");
query.on("end", function() { client.end(); });
