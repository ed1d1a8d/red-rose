var express = require('express');
var router = express.Router();
var awscred = require('awscred');
var dynamodb = require('dynamodb');
var path = require('path');

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/../static/projects/track.html'));
});

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

function goodHandle(handle) {
  return ( !isBlank(handle)
            && /^[a-z]+$/.test(handle)
            && handle.length <= 15 );
}

function verifyHandle(res, handle) { //true: valid, false: invalid
  if (!goodHandle(handle)) {
    res.writeHead(400, {'content-type': 'text/plain'});
    res.end(
      'Invalid handle format. '
      + 'Handle must be lowercase and at most 15 characters.'
    );
    return false;
  }
  return true;
}

function handleError(err, res) {
  if (!err) return false;
  res.writeHead(500, {'content-type': 'text/plain'});
  res.end('An error occurred: ' + err.message);
  return true;
}

function checkExistence(ddb, handle, noExistCallback, yesExistCallback) {
  ddb.getItem(
    'track',
    handle,
    null,
    {},
    function(err, retItem, cap) {
      if (!retItem) {
        noExistCallback(err);
      } else {
        yesExistCallback(err, retItem);
      }
    }
  );
}

router.post('/register', function(req, res) {
  var item = {handle: req.body.handle, score: 0};
  if (!verifyHandle(res, item.handle)) return;

  awscred.load(function(err, data) {
    if (handleError(err, res)) return;

    ddb = dynamodb.ddb({
      accessKeyId: data.credentials.accessKeyId,
      secretAccessKey: data.credentials.secretAccessKey,
      sessionToken: data.credentials.sessionToken,
      sessionExpires: data.credentials.expiration,
      endpoint: 'dynamodb.us-west-2.amazonaws.com'
    });

    checkExistence(
      ddb,
      item.handle,
      function(err) {
        if (handleError(err, res)) return;
        ddb.putItem(
          'track',
          item,
          {},
          function(err, retItem, cap) {
            if (handleError(err, res)) return;
            console.log('Registered user: ' + item.handle);
            res.writeHead(200, {'content-type': 'text/plain'});
            res.end('Welcome ' + item.handle + '! Your score is 0.');
          }
        );
      },
      function(err, retItem) {
        if (handleError(err, res)) return;
        res.writeHead(400, {'content-type': 'text/plain'});
        res.end(item.handle + ' has already been registered.');
      }
    );
  });
});

router.get('/:handle', function(req, res) {
  var handle = req.params.handle;
  if (!verifyHandle(res, handle)) return;

  awscred.load(function(err, data) {
    if (handleError(err, res)) return;

    ddb = dynamodb.ddb({
      accessKeyId: data.credentials.accessKeyId,
      secretAccessKey: data.credentials.secretAccessKey,
      sessionToken: data.credentials.sessionToken,
      sessionExpires: data.credentials.expiration,
      endpoint: 'dynamodb.us-west-2.amazonaws.com'
    });

    checkExistence(
      ddb,
      handle,
      function(err) {
        if (handleError(err, res)) return;
        res.writeHead(400, {'content-type': 'text/plain'});
        res.end(handle + ' is not a registered user.');
      },
      function(err, retItem) {
        if (handleError(err, res)) return;
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end('Score of ' + handle + ' is ' + retItem.score + '.');
      }
    );
  });
});

router.get('/roll/:handle', function(req, res) {
  var handle = req.params.handle;
  if (!verifyHandle(res, handle)) return;

  awscred.load(function(err, data) {
    if (handleError(err, res)) return;

    ddb = dynamodb.ddb({
      accessKeyId: data.credentials.accessKeyId,
      secretAccessKey: data.credentials.secretAccessKey,
      sessionToken: data.credentials.sessionToken,
      sessionExpires: data.credentials.expiration,
      endpoint: 'dynamodb.us-west-2.amazonaws.com'
    });

    checkExistence(
      ddb,
      handle,
      function(err) {
        if (handleError(err, res)) return;
        res.writeHead(400, {'content-type': 'text/plain'});
        res.end(handle + ' is not a registered user.');
      },
      function(err, retItem) {
        if (handleError(err, res)) return;
        var add = Math.floor((Math.random() * 13) + 1);
        var newscore = retItem.score + add;
        ddb.updateItem(
          'track',
          handle,
          null,
          { 'score': { value: newscore, action: 'PUT'} },
          {},
          function(err, retItem, cap) {
            if (handleError(err, res)) return;
            res.writeHead(200, {'content-type': 'text/plain'});
            res.end(handle + ' gained ' + add + ' points. ' + handle + 
              '\'s score is now ' + newscore + '.');
          }
        );
      }
    );
  });
});

module.exports = router;
