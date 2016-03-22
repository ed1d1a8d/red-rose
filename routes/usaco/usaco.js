var express = require('express');
var router = express.Router();
var path = require('path');

//default path
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/leaderboard.html'));
});

//static files
router.use('/js', express.static(path.join(__dirname + '/js')));
router.use('/results', express.static(path.join(__dirname + '/results')));

module.exports = router;
