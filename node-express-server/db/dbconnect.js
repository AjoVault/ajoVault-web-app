const { Sequelize, DataTypes } = require('sequelize');
//const env = require('../config/env');
const env = require('../config/env-remote');
const mysqlConnection = {}

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host, 
  port: env.port,
  dialect: env.dialect
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    }).catch(err => {
        console.log('Unable to connect to the database:', err);
    })

mysqlConnection.sequelize = sequelize;
mysqlConnection.Sequelize = Sequelize;

// Add tables
mysqlConnection.users = require('../models/users')(sequelize, DataTypes);

// sync all models
// force: false will not drop the table if it already exists
mysqlConnection.sequelize.sync({ force: false })
    .then(() => {
        console.log('Database & tables synced');
    }).catch(err => {
        console.error('Unable to sync database & tables:', err);
    })

 //export the connection
module.exports = mysqlConnection;