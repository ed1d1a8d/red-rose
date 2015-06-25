var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '../static')));

app.get('/', function(req, res) {
	res.send("Here is the homepage.");
});

app.get('/about', function(req,res) {
	res.sendfile('views/about.html', {root: "../"})
});

app.listen(2222);
console.log('Listening on port 2222');