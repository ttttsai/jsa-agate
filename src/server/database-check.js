'use strict';

const MongoClient = require('mongodb').MongoClient;

const config = function() {
  if (process.env.NODE_ENV !== 'production') {
    return require('../../.application-config.json');
  } else {
    return {};
  }
}();

const createDatabaseUrl = function() {
  const address = config.database.url || process.env.MONGO_ADDRESS;
  const port = config.database.port || process.env.MONGO_PORT;
  const databaseName = config.database.databaseName || process.env.MONGO_DBNAME;
  return `${address}:${port}/${databaseName}`;
};

const checkDatabaseHealth = function(callback) {
  const url = createDatabaseUrl();
  MongoClient.connect(url, function(err, db) {
    if (err === null) {
      let collection = db.collection('heartbeat');
      collection.find({}).toArray(function(err, docs) {
        if (err === null && docs.length > 0) {
          callback(true);
        } else {
          callback(false);
        }
      });
    } else {
      callback(false);
    }
    db.close();
  });
};

module.exports = {
  checkDatabaseHealth: checkDatabaseHealth,
};
