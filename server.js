var express = require('express');
var app = express();

var logger = require('morgan');
app.use(logger('dev'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('static'));

//routes
app.use('/track', require('./routes/track/track'));

//create server
var http = require('http');

http.createServer(app).listen(2222);
console.log("Listening on port 2222");
