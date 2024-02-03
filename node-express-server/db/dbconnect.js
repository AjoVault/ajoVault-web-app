const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const mysqlConnection = {}
const sequelize = new Sequelize(process.env.database, process.env.dbusername, process.env.dbpassword, {
  host: process.env.dbhost, 
  port: process.env.dbport,
  dialect: process.env.dialect,
  logging: process.env.NODE_ENV === 'development', // Only log queries in development
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
mysqlConnection.sequelize.sync({ force: true})
    .then(() => {
        console.log('Database & tables synced');
    }).catch(err => {
        console.error('Unable to sync database & tables:', err);
    })

 //export the connection
module.exports = mysqlConnection;