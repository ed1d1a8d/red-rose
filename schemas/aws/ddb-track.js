var awscred =  require('awscred');
var dynamodb = require('dynamodb');

awscred.load(function(err, data) {
  if (err) throw err;

  ddb = dynamodb.ddb({
    accessKeyId: data.credentials.accessKeyId,
    secretAccessKey: data.credentials.secretAccessKey,
    endpoint: 'dynamodb.us-west-2.amazonaws.com'
  });

  ddb.createTable(
    'track', 
    { hash: ['handle', ddb.schemaTypes().string] },
    { read: 5, write: 5 },
    function(err, details) {
      if (err) throw err;
      console.log('Created DynamoDB table: track');
    }
  );
});
