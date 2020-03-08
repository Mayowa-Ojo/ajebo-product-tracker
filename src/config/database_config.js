const mongoose = require('mongoose');

// check node env
if(process.env.NODE_ENV !== 'production') {
   require('dotenv').config();
}

// globals
const { 
   DATABASE_LOCAL_URI,
   DATABASE_TEST_URI,
   DATABASE_USER,
   DATABASE_PASS
 } = process.env;

const CLOUD_URI = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASS}@ajebo-0-nuq67.mongodb.net/ajebo?retryWrites=true&w=majority`;

// setup mongoose connection
exports.connect = function(env) {

   mongoose.connect(env == 'dev' ? DATABASE_LOCAL_URI : env == 'test' ? DATABASE_TEST_URI : CLOUD_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
   })
   .then(() => console.log(`-- Database: connected to database in ${env}`))
   .catch(err => console.error(err));

};

module.exports = exports;