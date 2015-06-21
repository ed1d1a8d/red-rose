var path = require('path');
var express = require('express');
var logger = require('morgan');
var app = express();

app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '../static')));

app.get('*', function(req, res) {
	res.send('Hello World');
});

app.listen(2300);
console.log('Listening on port 2300');
