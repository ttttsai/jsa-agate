'use strict';

const responseMessage = {
  OK_STATUS: {status: 'ok', database: 'ok'},
  ERROR_STATUS: {status: 'ok', database: 'error'},
  API_ERROR_MESSAGE: {error: 'Something went wrong.'},
  CONTENTTYPE_ERROR: {
    status: '400', description:
  'Request\'s content-type header is not set to application/json.',
  },
  USERNAME_MISSING: {status: '400', description: 'Username required.'},
  PASSWORD_MISSING: {status: '400', description: 'Password required.'},
  USERNAME_CONFLICT: {status: '409', description: 'Conflict user name.'},
  OTHER_ERROR: {status: '500', description: 'Something else went wrong.'},
  REGISTER_SUCCESS: {status: '201'},
  NO_BUSINESS_EXISTS: {status: '404', description: 'No business exists.'},
};

module.exports = responseMessage;
