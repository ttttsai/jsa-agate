'use strict';

const dbUtility = require('./db-utility');
const MongoClient = require('mongodb').MongoClient;
const collectionName = 'businesses';

function fetchBusinesses(callback) {
  const url = dbUtility.createDatabaseUrl();

  MongoClient.connect(url, function(err, db) {
    if (err === null) {
      let collection = db.collection(collectionName);

      collection.find({}).toArray(function(err, docs) {
        if (err === null) {
          return callback(true, docs);
        }
        return callback(false);
      });
    } else {
      return callback(false);
    }
    db.close();
  });
}

module.exports = {fetchBusinesses: fetchBusinesses};
