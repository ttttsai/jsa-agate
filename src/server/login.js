'use strict';

const dbUtility = require('./db-utility');
const loginStatusCode = require('./status-code');
const bcrypt = require('bcrypt');

const collectionName = 'users';

function verifyPassword(reqPassword, queryPassword, avatar, callback) {
  console.log('reqPss', reqPassword, 'query', queryPassword);
  bcrypt.compare(reqPassword, queryPassword).then(
    function(res) {
      console.log('res', res);
      if (res) {
        return callback(loginStatusCode.CORRECT, avatar);
      }
      return callback(loginStatusCode.MISSING_CREDENTIALS);
    }
  );
}

function findUser(body, callback) {
  return function(err, db) {
    if (err === null) {
      db.collection(collectionName).findOne({username: body.username},
        function(err, docs) {
          if (docs !== null && body.password !== null
            && body.password != undefined && err === null) {
            const reqPassword = body.password;
            const queryPassword = docs.password;

            verifyPassword(reqPassword, queryPassword, docs.avatar, callback);
          } else {
            return callback(loginStatusCode.MISSING_CREDENTIALS);
          }
        });
    } else {
      return callback(loginStatusCode.WRONG_SERVER);
    }
  };
}

function createTokenForExistingUser(body, callback) {
  const url = dbUtility.createDatabaseUrl();

  dbUtility.connectMongo(url, findUser(body, callback));
}

function validation(req, callback) {
  if (req.headers['content-type'] !== 'application/json') {
    return callback(loginStatusCode.WRONG_CONTENT_TYPE);
  }
  if (!req.body) {
    if (!req.body.username && !req.body.password) {
      return callback(loginStatusCode.WRONG_USERNAME_PASSWORD);
    }
  }
}

module.exports = {
  createTokenForExistingUser: createTokenForExistingUser,
  validation: validation,
};

