var path = require('path');
var config = require(path.join(__dirname + '/../../config'));
var awscred =  require('awscred');
var dynamodb = require('dynamodb');

awscred.load(function(err, data) {
  if (err) throw err;

  ddb = dynamodb.ddb({
    accessKeyId: data.credentials.accessKeyId,
    secretAccessKey: data.credentials.secretAccessKey,
    sessionToken: data.credentials.sessionToken,
    sessionExpires: data.credentials.expiration,
    endpoint: config.track.ddb_endpoint
  });

  ddb.createTable(
    'track', 
    { hash: ['handle', ddb.schemaTypes().string] },
    { read: config.track.readcap, write: config.track.writecap },
    function(err, details) {
      if (err) throw err;
      console.log('Created DynamoDB table: track');
    }
  );
});
