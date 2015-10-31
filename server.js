var fs = require('fs'),
    https = require('https'),
    express = require('express'),
    app = express();

var logger = require('morgan');
app.use(logger('dev'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static('static'));

//routes
app.use('/track', require('./routes/track/track'));

//create server
https.createServer({
  key: fs.readFileSync('.ssl/p256v1-private-test.key'),
  cert: fs.readFileSync('.ssl/red-rose-test.crt'),
}, app).listen(2222);
console.log("https server listening on port 2222");
