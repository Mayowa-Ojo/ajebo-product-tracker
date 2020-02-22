const express = require('express');
require('dotenv').config();

const app = express();
// Globals
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

require('./config/database_config');
// require('./utils/check_diff').checkDiff()
// require('./utils/scraper').scrapeURL();
// require('./database/seed');
// require('./jobs/cron');
require('./utils/mail');

app.get('/', (req, res) => {
   res.json({
      name: 'John Doe',
      age: 34,
      occupation: 'UI desginer',
      gender: 'M'
   });
});


app.listen(PORT, () => {
   console.log(`server started in ${NODE_ENV} on port: ${PORT}`);
});