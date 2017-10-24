'use strict';

const dbUtility = require('./db-utility');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
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

function fetchSingleBusiness(searchId, callback) {
  const url = dbUtility.createDatabaseUrl();
  const filter = {_id: new ObjectID(searchId)};

  MongoClient.connect(url, function(err, db) {
    if (err === null) {
      let collection = db.collection(collectionName);

      collection.findOne(filter, function(err, docs) {
        db.close();
        if (docs && !err) {
          return callback('200', docs);
        }
        return callback('404');
      });
    } else {
      return callback('500');
    }
  });
}

function createBusiness(body, callback) {
  const url = dbUtility.createDatabaseUrl();

  MongoClient.connect(url, function(err, db) {
    const businessInfo = {
      name: body.name, description: body.description,
      imageUrl: body.imageUrl, keyword: body.keyword,
      rating: body.rating, longitude: body.longitude,
      latitude: body.latitude,
    };

    if (err === null) {
      let collection = db.collection(collectionName);

      collection.insertOne(businessInfo,
        function(err, doc) {
          db.close();
          if (err) {
            return callback('500');
          }
          return callback('201');
        });
    } else {
      return callback('500');
    }
  });
}

function findBusinessAndPostReview(db, searchId, username, body, callback) {
  const businessCollection = db.collection(collectionName);
  const filter = {_id: new ObjectID(searchId)};
  const commentInfo = {
    username: username,
    comment: body.comment,
    rating: body.rating,
    id: new ObjectID(),
  };

  businessCollection.update(filter, {$addToSet: {comments: commentInfo}},
    function(err, result, state) {
      if (result.result.nModified !== 1) {
        return callback('404');
      } else if (result.result.nModified === 1 && !err) {
        return callback('201', commentInfo.id);
      }
      return callback('500');
    });
}

function findExistingUserAndPostReview(db, searchId, username, body, callback) {
  const usersCollection = db.collection('users');

  usersCollection.findOne({username: username}, function(err, docs) {
    if (err === null && docs !== null) {
      findBusinessAndPostReview(db, searchId, username, body, callback);
    } else {
      return callback('400');
    }
  });
}

function createComment(searchId, username, body, callback) {
  const url = dbUtility.createDatabaseUrl();

  MongoClient.connect(url, function(err, db) {
    if (err === null) {
      findExistingUserAndPostReview(db, searchId, username, body, callback);
    } else {
      return callback('500');
    }
  });
}

module.exports = {
  fetchBusinesses: fetchBusinesses,
  fetchSingleBusiness: fetchSingleBusiness,
  createBusiness: createBusiness,
  createComment: createComment,
};
