"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class portfolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users, { foreignKey: "userId" });
    }
  }
  portfolio.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dates: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: true,
      },
      days: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "portfolios",
      underscored: true,
    }
  );
  return portfolio;
};
