const express = require('express');
const DatabaseHealth = require('./database-check');
const BusinessessEndpoint = require('./business-endpoint');
const path = require('path');
const dbUtility = require('./db-utility');
const businessesJson = require('./businesses.json');

const collectionName = 'businesses';
const dataFeedStatus = {insert: 'ok'};
const app = express();
const PORT = process.env.PORT || 3000;
const okStatus = {status: 'ok', database: 'ok'};
const errorStatus = {status: 'ok', database: 'error'};
const apiErrorMessage = {error: 'something went wrong'};

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

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.get(['/', '/login', '/register'], (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist/index.html'));
});

app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
