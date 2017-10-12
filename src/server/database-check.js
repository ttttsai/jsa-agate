'use strict';

const MongoClient = require('mongodb').MongoClient;
const dbUtility = require('./db-utility');

const checkDatabaseHealth = function(callback) {
  const url = dbUtility.createDatabaseUrl();
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
      console.log('err', err);
      callback(false);
    }
    db.close();
  });
};

module.exports = {
  checkDatabaseHealth: checkDatabaseHealth,
};
