const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const internalUser = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING,
    },
    fullName: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    federatedID: {
      type: Sequelize.STRING
    },
    promoCode: {
      type: Sequelize.STRING
    },
    lastActive: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    active: {
      type: Sequelize.Boolean,
    },
    otp: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
      tableName: 'users',
  })

  return internalUser;
}

