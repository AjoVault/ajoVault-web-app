const { Sequelize, DataTypes } = require('sequelize');
const passportLocalSequelize = require('passport-local-sequelize');


module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING
    },
    fullName: {
      type: DataTypes.STRING
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    address: {
      type: DataTypes.STRING
    },
    federatedID: {
      type: DataTypes.STRING
    },
    promoCode: {
      type: DataTypes.STRING
    },
    lastActive: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
    hasLiveImg: {
      type: DataTypes.BOOLEAN,
    },
    otp: {
      type: DataTypes.STRING,
    },
    userPIN: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    dpPath: {
      type: DataTypes.STRING,
    },
    base64Image: {
      type: DataTypes.STRING,
    },
    resetTokenExpiration: {
      type: DataTypes.DATE,
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
      tableName: 'users',
  })
  
  passportLocalSequelize.attachToUser(users, {
    usernameField: 'email',
    hashField: 'password', 
  });

  return users;
}

