var express = require('express');
var router = express.Router();
var path = require('path');

//default path
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/static/public/html/games-overview.html'));
});

//static files
router.use('/', express.static(
  path.join(__dirname + '/static/public/html')));
router.use('/', express.static(
  path.join(__dirname + '/static/public/images')));
router.use('/', express.static(
  path.join(__dirname + '/static/public/js')));

module.exports = router;
