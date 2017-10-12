const dbUtility = require('./db-utility');
const loginStatusCode = require('./status-code');
const bcrypt = require('bcrypt');

const collectionName = 'login';

const createTokenForExistingUser = function(body, callback) {
  const url = dbUtility.createDatabaseUrl();
  dbUtility.connectMongo(url, findUser(body, callback));
};

const findUser = function(body, callback) {
  return function(err, db) {
    if (err === null) {
      db.collection(collectionName).findOne({username: body.username},
        function(err, docs) {
          if (docs !== null) {
            const reqPassword = body.password;
            const queryPassword = docs.password;
            verifyPassword(reqPassword, queryPassword, callback);
          } else {
            return callback(loginStatusCode.MISSING_CREDENTIALS);
          }
        });
    } else {
      return callback(loginStatusCode.WRONG_SERVER);
    }
  };
};

const verifyPassword = function(reqPassword, queryPassword, callback) {
  if (bcrypt.compare(reqPassword, queryPassword)) {
    return callback(loginStatusCode.CORRECT);
  }
  return callback(loginStatusCode.MISSING_CREDENTIALS);
};

const validation = function(req, callback) {
  if (req.headers['content-type'] !== 'application/json') {
    return callback(loginStatusCode.WRONG_CONTENT_TYPE);
  }
  if (!req.body.username && !req.body.password) {
    return callback(loginStatusCode.WRONG_USERNAME_PASSWORD);
  }
};

module.exports={
  createTokenForExistingUser: createTokenForExistingUser,
  validation: validation,
};

