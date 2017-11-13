'use strict';

const MongoClient = require('mongodb').MongoClient;
const dbUtility = require('./db-utility');

function checkDatabaseHealth(callback) {
  const url = dbUtility.createDatabaseUrl();

  MongoClient.connect(url, function(err, db) {
    if (err === null) {
      let collection = db.collection('heartbeat');

      collection.find({}).toArray(function(err, docs) {
        const zero = 0;

        if (err === null && docs.length > zero) {
          return callback(true);
        }
        return callback(false);
      });
    } else {
      return callback(false);
    }
    db.close();
  });
}

module.exports = {checkDatabaseHealth: checkDatabaseHealth};
