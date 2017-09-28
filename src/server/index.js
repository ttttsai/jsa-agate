const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log(`app is listening on port ${PORT}`);
});
