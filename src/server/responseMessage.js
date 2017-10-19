'use strict';

const responseMessage = {
  OK_STATUS: {status: 'ok', database: 'ok'},
  ERROR_STATUS: {status: 'ok', database: 'error'},
  API_ERROR_MESSAGE: {error: 'Something went wrong.'},
  CONTENTTYPE_ERROR: {
    error:
  'Request\'s content-type header is not set to application/json.',
  },
  USERNAME_MISSING: {error: 'Username required.'},
  PASSWORD_MISSING: {error: 'Password required.'},
  USERNAME_CONFLICT: {error: 'Conflict user name.'},
  OTHER_ERROR: {error: 'Something else went wrong.'},
  REGISTER_SUCCESS: {status: 'Success Register'},
  NO_BUSINESS_EXISTS: {error: 'No business exists.'},
  REQUIREDFIELDS_MISSING: {error: 'Required fields missing.'},
  CREATE_BUSINESS_SUCCESS: {status: 'Success creating a business.'},
};

module.exports = responseMessage;
