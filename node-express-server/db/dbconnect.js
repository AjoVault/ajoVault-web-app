const { Sequelize, DataTypes } = require('sequelize');
const sequelize_fixtures = require('sequelize-fixtures');
const path = require('path');

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
mysqlConnection.caDetails = require('../models/caDetails')(sequelize, DataTypes);
mysqlConnection.ngBanks = require('../models/ngBanks')(sequelize, DataTypes);

// sync all models
mysqlConnection.sequelize.sync({ force: false})
    .then(() => {
// Populate the ngBanks table if necessary
        const populateBanksTable = async () => {
            const recordCount = await mysqlConnection.ngBanks.count({ where: { id: 1 } });
            if (recordCount === 0) {
                const jsonFilePath = path.join(__dirname, 'banks.json');
                sequelize_fixtures.loadFile(jsonFilePath, mysqlConnection).then(() => {
                    //console.log('ngBanks table populated');
                }).catch(err => {
                    console.error('Unable to populate ngBanks table:', err);
                });
            }
        };

        populateBanksTable();
    
        console.log('Database & tables synced');
        console.log('Server up and running...');
        

    }).catch(err => {
        console.error('Unable to sync database & tables:', err);
    })

 //export the connection
module.exports = mysqlConnection;