require('dotenv').config();

module.exports = {
  database: {
    ...require('./database/dbConfig'),
  },
};
