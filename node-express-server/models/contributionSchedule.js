const { Sequelize, DataTypes } = require("sequelize");
const passportLocalSequelize = require("passport-local-sequelize");

module.exports = (sequelize, DataTypes) => {
  const contributionschedule = sequelize.define(
    "contributionschedule",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userID: {
        type: DataTypes.INTEGER,
      },
      debitAmount: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      savingsFrequency: {
        type: DataTypes.INTEGER,
        // allowNull: false
      },
      savingsDuration: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      debitDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        // allowNull: false
      },
    },
    {
      tableName: "contributionschedule",
    }
  );

  return contributionschedule;
};
