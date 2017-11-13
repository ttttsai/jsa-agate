'use strict';

const MongoClient = require('mongodb').MongoClient;

function createDatabaseUrl() {
  const address = process.env.DB_URL;
  const port = process.env.DB_PORT;
  const databaseName = process.env.DB_NAME;

  return `${address}:${port}/${databaseName}`;
}

function connectToMongoDb(url, callback) {
  MongoClient.connect(url, callback);
}

function insertFile(requiredJsonfile, collectionName) {
  return function(err, db) {
    if (err === null) {
      let collection = db.collection(collectionName);

      collection.find({}).toArray(function(err, docs) {
        const docLength = 0;

        if (err === null && docs.length > docLength) {
          db.close();
        } else {
          collection.insert(requiredJsonfile, function(err, r) {
            if (err === null) {
              db.close();
            }
          });
        }
      });
    } else {
      db.close();
    }
  };
}

function insertFileToDatabase(requiredJsonfile, collectionName) {
  const url = createDatabaseUrl();

  connectToMongoDb(url, insertFile(requiredJsonfile, collectionName));
}

module.exports = {
  createDatabaseUrl: createDatabaseUrl,
  insertFileToDatabase: insertFileToDatabase,
  connectMongo: connectToMongoDb,
};
