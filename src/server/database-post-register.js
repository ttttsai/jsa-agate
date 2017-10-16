'use strict';

const MongoClient = require('mongodb').MongoClient;

function createDatabaseUrl() {
  const address = process.env.DB_URL;
  const port = process.env.DB_PORT;
  const databaseName = process.env.DB_NAME;

  return `${address}:${port}/${databaseName}`;
}

function handleInfo(username, passwordHash, callback) {
  const url = createDatabaseUrl();

  MongoClient.connect(url, function(err, db) {
    const filter = {username: username};

    if (err === null) {
      let collection = db.collection('register');

      collection.findOne(filter, function(err, docs) {
        if (err) {
          return callback('500');
        }
        if (docs !== null) {
          return callback('409');
        }
        collection.insertOne({username: username, password: passwordHash},
          function(err, doc) {
            if (err) {
              return callback('500');
            }
            db.close();
            return callback('201');
          });
      });
    } else {
      return callback('500');
    }
  });
}

module.exports = {handleInfo: handleInfo};
