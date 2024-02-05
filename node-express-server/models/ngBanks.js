const { Sequelize, DataTypes } = require('sequelize');
const passportLocalSequelize = require('passport-local-sequelize');


module.exports = (sequelize, DataTypes) => {
  const ngBanks = sequelize.define("ngBanks", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
    }
  }
  )
  
  return ngBanks;
}

