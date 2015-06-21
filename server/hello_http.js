var http = require('http');

var server = http.createServer(function(req, res) {
	console.log("Request: " + req.url);

	var now = new Date();
	var html = "<p>Hello World, the time is " + now + ".</p>";
	res.end(html);
});

console.log("Listening now...");
server.listen(1337);