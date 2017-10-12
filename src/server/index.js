const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const DatabaseHealth = require('./database-check');
const BusinessessEndpoint = require('./business-endpoint');
const dbUtility = require('./db-utility');
const businessesJson = require('./businesses.json');
const login = require('./login');
const loginStatusCode = require('./status-code');

const app = express();
const collectionName = 'businesses';
const PORT = process.env.PORT || 3000;
const dataFeedStatus = {insert: 'ok'};
const okStatus = {status: 'ok', database: 'ok'};
const errorStatus = {status: 'ok', database: 'error'};
const apiErrorMessage = {error: 'something went wrong'};
const secret = 'epam jsa agate';
const JWTMiddleware = expressJWT({secret: secret});

app.use(bodyParser.json());

app.get('/feed', function(req, res) {
  dbUtility.insertFileToDatabase(businessesJson, collectionName);
  res.json(dataFeedStatus);
});

app.get('/heartbeat', function(req, res) {
  DatabaseHealth.checkDatabaseHealth((isWorking) => {
    isWorking ? res.json(okStatus) :
      res.json(errorStatus);
  });
});

app.get('/api/businesses', function(req, res) {
  BusinessessEndpoint.fetchBusinesses((isWorking, docs) => {
    if (isWorking) {
      let data = docs[0] ? docs[0].businesses : [];
      let businesses = {businesses: data};
      res.status(200).json(businesses);
    } else {
      res.status(500).json(apiErrorMessage);
    }
  });
});

app.get(['/', '/login', '/register'], (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.post('/api/login', (req, res) => {
  login.validation(req, (status) => {
    if (status === loginStatusCode.WRONG_CONTENT_TYPE) {
      return res.status(400).
        json({error: 'content-type should be application/json'});
    } else if (status === loginStatusCode.WRONG_USERNAME_PASSWORD) {
      return res.status(400).json({error: 'usename and password required'});
    }
  });
  login.createTokenForExistingUser(req.body,
    (status) => {
      if (status === loginStatusCode.CORRECT) {
        const token = jwt.sign({username: req.body.username}, secret);
        return res.status(200).json({token: token});
      } else if (status === loginStatusCode.MISSING_CREDENTIALS) {
        return res.status(403).json({error: 'Bad credentials'});
      } else if (status === loginStatusCode.WRONG_SERVER) {
        return res.status(500).json({error: 'Something went wrong'});
      } else if (status === loginStatusCode.MISSING_CREDENTIALS) {
        return res.status(403).json({error: 'Bad credentials'});
      }
    }
  );
});

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
