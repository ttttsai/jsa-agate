const express = require('express');
const DatabaseHealth = require('./database-check');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const okStatus = {status: 'ok', database: 'ok'};
const errorStatus = {status: 'ok', database: 'error'};

app.get('/heartbeat', function (req, res) {
  DatabaseHealth.checkDatabaseHealth((isWorking) => {
    isWorking ? res.json(okStatus) :
      res.json(errorStatus);
  });
});

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.listen(PORT, function () {
  console.log(`app is listening on port ${PORT}`);
});
