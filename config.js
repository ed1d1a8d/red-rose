var config = {};

config.track = {};
config.track.ddb_endpoint = 'dynamodb.us-west-2.amazonaws.com';
config.track.readcap = 5;
config.track.writecap = 5;
config.track.range_const = 0;

module.exports = config;
