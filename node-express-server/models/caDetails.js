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
      type: DataTypes.STRING,
      unique: true,
    },
    nin: {
      type: DataTypes.STRING,
      unique: true,
      required: true,
    },
    bvn: {
      type: DataTypes.STRING,
      unique: true,
      required: true,
    },
    bankId: {
      type: DataTypes.STRING,
      required: true,
    },
    externalAcctNo: {
      type: DataTypes.STRING,
      required: true,
    },
    occupation: {
      type: DataTypes.STRING
    },
    kycVerified: {
      type: DataTypes.BOOLEAN,
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

