var Sequelize = require('sequelize');
const dbConfig = require('../config.json')['MySQL'];

var sequelize = new Sequelize(dbConfig);

sequelize
  .authenticate()
  .then(() => {
    console.log('heroku cleaDB connection has been established successfully.');
  })
  .catch(err => {
     console.error('Unable to connect to the database:', err);
  });

sequelize.Promise = global.Promise;

module.exports = sequelize;