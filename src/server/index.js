'use strict';

const responseMessage = require('./responseMessage.js');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const DatabaseHealth = require('./database-check');
const Register = require('./database-post-register');
const BusinessessEndpoint = require('./business-endpoint');
const login = require('./login');
const loginStatusCode = require('./status-code');
const {
  HTTP_200, HTTP_201, HTTP_400, HTTP_401,
  HTTP_403, HTTP_404, HTTP_409, HTTP_500,
} = require('./http-status-code');
const {getSignedUrlByAwsSdk} = require('./file-to-s3-upload');
const app = express();
const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;
const secret = 'epam jsa agate';
const bcrypt = require('bcrypt');
const saltRounds = 10;
const expressJWT = require('express-jwt');
const jwtMiddleware = expressJWT({secret: secret});

app.use(bodyParser.json());
app.use(favicon(path.join(__dirname,'public', '/favicon.ico')));

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

app.get('/api/business/:id', function(req, res) {
  BusinessessEndpoint.fetchSingleBusiness(req.params.id, (status, docs) => {
    if (status === '200') {
      return res.status(HTTP_200).json(docs);
    } else if (status === '500') {
      return res.status(HTTP_500).json(responseMessage.API_ERROR_MESSAGE);
    } else if (status === '404') {
      return res.status(HTTP_404).json(responseMessage.NO_BUSINESS_EXISTS);
    }
  });
});

app.get(['/', '/login', '/register', '/business/:id', '/create-business'], (req, res) => {
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
      (status, avatar) => {
        if (status === loginStatusCode.CORRECT) {
          const token = jwt.sign(
            {username: req.body.username, avatar: avatar}, secret);

          return res.status(HTTP_200).
            json({token: token});
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

function responseContentTypeError(res) {
  res.status(HTTP_400).json(responseMessage.CONTENTTYPE_ERROR);
}

function responseUsernameMissing(res) {
  res.status(HTTP_400).json(responseMessage.USERNAME_MISSING);
}

function responsePasswordMissing(res) {
  res.status(HTTP_400).json(responseMessage.PASSWORD_MISSING);
}

function responseUsernameConflit(dbResponseStatus, res) {
  if (dbResponseStatus === '409') {
    return res.status(HTTP_409).json(responseMessage.USERNAME_CONFLICT);
  }
}

function responseOtherError(dbResponseStatus, res) {
  if (dbResponseStatus === '500') {
    return res.status(HTTP_500).json(responseMessage.OTHER_ERROR);
  }
}

function responseRegisterSuccess(dbResponseStatus, req, res) {
  if (dbResponseStatus === '201') {
    const token = jwt.sign({username: req.body.username, avatar: req.body.avatar}, secret);

    responseMessage.REGISTER_SUCCESS.token = token;
    return res.status(HTTP_201).json(responseMessage.REGISTER_SUCCESS);
  }
}

app.post('/api/register', function(req, res) {
  if (req.headers['content-type'] !== 'application/json') {
    (responseContentTypeError(res));
  } else if (!req.body.username) {
    (responseUsernameMissing(res));
  } else if (!req.body.password) {
    (responsePasswordMissing(res));
  } else {
    const passwordHash = generateHash(req.body.password);

    Register.handleInfo(req.body.username, passwordHash, req.body.avatar,
      (dbResponseStatus) => {
        responseUsernameConflit(dbResponseStatus, res);
        responseOtherError(dbResponseStatus, res);
        responseRegisterSuccess(dbResponseStatus, req, res);
      });
  }
});

function responseRequiredFieldsMissing(res) {
  return res.status(HTTP_400).json(responseMessage.REQUIREDFIELDS_MISSING);
}

function responseCreateBusinessSuccess(res) {
  return res.status(HTTP_201).json(responseMessage.CREATE_BUSINESS_SUCCESS);
}

function validateRequestBody(req) {
  return (!req.body.name || !req.body.description
    || !req.body.address || !req.body.phone
    || !req.body.keyword || !req.body.longitude
    || !req.body.latitude || !req.body.images);
}

app.post('/api/businesses', function(req, res) {
  if (req.headers['content-type'] !== 'application/json') {
    (responseContentTypeError(res));
  } else if (validateRequestBody(req)) {
    (responseRequiredFieldsMissing(res));
  } else {
    BusinessessEndpoint.createBusiness(req.body,
      (dbResponseStatus) => {
        if (dbResponseStatus === '500') {
          responseOtherError(dbResponseStatus, res);
        } else {
          responseCreateBusinessSuccess(res);
        }
      });
  }
});

app.post('/api/businesses/:id/comments', jwtMiddleware,
  function(req, res) {
    if (req.headers['content-type'] !== 'application/json') {
      responseContentTypeError(res);
    } else if (req.body.rating === undefined) {
      res.status(HTTP_400).json(
        responseMessage.RATING_MISSING);
    } else if (req.user.username) {
      BusinessessEndpoint.createComment(req.params.id,
        req.user.username, req.body,
        (dbResponseStatus, commentId) => {
          if (dbResponseStatus === '201') {
            res.set('Location', '/api/business/' + req.params.id + '/comments/'
            + commentId).status(HTTP_201).json(
              responseMessage.CREATE_COMMENT_SUCCESS);
          } else if (dbResponseStatus === '400') {
            res.status(HTTP_404).json({error: 'User not found.'});
          } else if (dbResponseStatus === '404') {
            res.status(HTTP_404).json({error: 'Business not found.'});
          } else {
            responseOtherError(dbResponseStatus, res);
          }
        });
    } else {
      res.status(HTTP_401).json({error: 'Invalid signature.'});
    }
  });

app.get('/sign-s3', (req, res) => {
  const {fileName, fileType} = req.query;
  const task = 'putObject';
  const s3Params = {
    Bucket: process.env.S3_BUCKET,
    Key: fileName,
    ContentType: fileType,
    ACL: 'public-read',
  };

  getSignedUrlByAwsSdk(task, s3Params, (data) => {
    res.json({
      signedRequest: data,
      url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    });
  })();
});

app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(err.status).json({error: err.message});
  }
});

app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
