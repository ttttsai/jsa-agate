const dbUtility = require('./db-utility');
const MongoClient = require('mongodb').MongoClient;
const collectionName = 'businesses';

const fetchBusinesses = function(callback) {
  const url = dbUtility.createDatabaseUrl();
  MongoClient.connect(url, function(err, db) {
    if (err === null) {
      let collection = db.collection(collectionName);
      collection.find({}).toArray(function(err, docs) {
        if (err === null) {
          callback(true, docs);
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
  fetchBusinesses: fetchBusinesses,
};
