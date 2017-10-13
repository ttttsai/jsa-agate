'use strict';
const MongoClient = require('mongodb').MongoClient;
const createDatabaseUrl = function() {
  const address = process.env.DB_URL;
  const port = process.env.DB_PORT;
  const databaseName = process.env.DB_NAME;
  return `${address}:${port}/${databaseName}`;
};

const handleInfo = function(username, passwordHash, callback) {
  const url = createDatabaseUrl();
  MongoClient.connect(url, function(err, db) {
    const filter = {username: username};
    if (err === null) {
      let collection = db.collection('register');
      collection.findOne(filter, function(err, docs) {
        if (docs !== null) {
          callback('409');
        } else {
          collection.insertOne({username: username, password: passwordHash}, function(err, doc) {
            callback('201');
            db.close();
          });
        }
      });
    } else {
      callback('500');
    }
  });
};

module.exports = {
  handleInfo: handleInfo,
};
