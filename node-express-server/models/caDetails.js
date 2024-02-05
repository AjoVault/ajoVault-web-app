const { Sequelize, DataTypes } = require('sequelize');
const passportLocalSequelize = require('passport-local-sequelize');


module.exports = (sequelize, DataTypes) => {
  const caDetails = sequelize.define("caDetails", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    internalAcctNo: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    nin: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    bvn: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    bankId: {
      type: DataTypes.STRING
    },
    externalAcctNo: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    occupation: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
      tableName: 'caDetails',
  })
  
  return caDetails;
}

