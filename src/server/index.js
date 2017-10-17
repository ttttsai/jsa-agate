'use strict';

const responseMessage = require('./responseMessage.js');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const DatabaseHealth = require('./database-check');
const Register = require('./database-post-register');
const BusinessessEndpoint = require('./business-endpoint');
const login = require('./login');
const loginStatusCode = require('./status-code');
const {HTTP_200, HTTP_400, HTTP_403, HTTP_500} = require('./http-status-code');
const app = express();
const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;
const secret = 'epam jsa agate';
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(bodyParser.json());

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds));
}

app.get('/heartbeat', function(req, res) {
  DatabaseHealth.checkDatabaseHealth((isWorking) =>
    isWorking ? res.json(responseMessage.OK_STATUS) :
      res.json(responseMessage.ERROR_STATUS));
});

app.get('/api/businesses', function(req, res) {
  BusinessessEndpoint.fetchBusinesses((isWorking, docs) => {
    if (isWorking) {
      let [...data] = docs;
      let businesses = {businesses: data};

      res.status(HTTP_200).json(businesses);
    } else {
      res.status(HTTP_500).json(responseMessage.API_ERROR_MESSAGE);
    }
  });
});

app.get(['/', '/login', '/register'], (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.post('/api/login', (req, res) => {
  login.validation(req, (status) => {
    if (status === loginStatusCode.WRONG_CONTENT_TYPE) {
      return res.status(HTTP_400).
        json({error: 'Content-type should be application/json.'});
    } else if (status === loginStatusCode.WRONG_USERNAME_PASSWORD) {
      return res.status(HTTP_400).
        json({error: 'Usename and password required.'});
    }
  });
  if (!res._headerSent) {
    login.createTokenForExistingUser(req.body,
      (status) => {
        if (status === loginStatusCode.CORRECT) {
          const token = jwt.sign({username: req.body.username}, secret);

          return res.status(HTTP_200).json({token: token});
        } else if (status === loginStatusCode.MISSING_CREDENTIALS) {
          return res.status(HTTP_403).json({error: 'Bad credentials.'});
        } else if (status === loginStatusCode.WRONG_SERVER) {
          return res.status(HTTP_500).json({error: 'Something went wrong.'});
        }
      }
    );
  }
});

app.use(express.static(path.resolve(__dirname, '../../dist')));

function validateHeader(req, res) {
  if (req.headers['content-type'] !== 'application/json') {
    return res.json(responseMessage.CONTENTTYPE_ERROR);
  }
}

function validateUsername(req, res) {
  if (!req.body.username) {
    return res.json(responseMessage.USERNAME_MISSING);
  }
}

function validatePassword(req, res) {
  if (!req.body.password) {
    return res.json(responseMessage.PASSWORD_MISSING);
  }
}

function responseUsernameConflit(dbResponseStatus, res) {
  if (dbResponseStatus === '409') {
    return res.json(responseMessage.USERNAME_CONFLICT);
  }
}

function responseOtherError(dbResponseStatus, res) {
  if (dbResponseStatus === '500') {
    return res.json(responseMessage.OTHER_ERROR);
  }
}

function responseRegisterSuccess(dbResponseStatus, req, res) {
  if (dbResponseStatus === '201') {
    const token = jwt.sign({username: req.body.username}, secret);

    responseMessage.REGISTER_SUCCESS.token = token;
    return res.json(responseMessage.REGISTER_SUCCESS);
  }
}

app.post('/api/register', function(req, res) {
  validateHeader(req, res);
  validateUsername(req, res);
  validatePassword(req, res);

  const passwordHash = generateHash(req.body.password);

  Register.handleInfo(req.body.username, passwordHash,
    (dbResponseStatus) => {
      responseUsernameConflit(dbResponseStatus, res);
      responseOtherError(dbResponseStatus, res);
      responseRegisterSuccess(dbResponseStatus, req, res);
    });
});

app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
