'use strict';

const AWS = require('aws-sdk');

AWS.config.region = 'ap-northeast-1';
const s3 = new AWS.S3({signatureVersion: 'v4'});

function getSignedUrlByAwsSdk(task, s3Params, callback) {
  return function() {
    s3.getSignedUrl(task, s3Params, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        return callback(data);
      }
    });
  };
}

module.exports = {getSignedUrlByAwsSdk: getSignedUrlByAwsSdk};
