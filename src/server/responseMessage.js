const responseMessage = {
  OK_STATUS: {status: 'ok', database: 'ok'},
  ERROR_STATUS: {status: 'ok', database: 'error'},
  API_ERROR_MESSAGE: {error: 'something went wrong'},
  CONTENTTYPE_ERROR: {status: '400', description:
  'request\'s content-type header is not set to application/json'},
  USERNAME_MISSING: {status: '400', description: 'username required'},
  PASSWORD_MISSING: {status: '400', description: 'password required'},
  USERNAME_CONFLICT: {status: '409', description: 'conflict user name'},
  OTHER_ERROR: {status: '500', description: 'something else went wrong'},
  REGISTER_SUCCESS: {status: '201'},
};

module.exports = responseMessage;
