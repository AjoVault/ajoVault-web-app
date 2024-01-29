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
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
    },
    fullName: {
      type: DataTypes.STRING
    },
    phone: {
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
    otp: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
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

