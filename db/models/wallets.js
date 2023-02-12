"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wallets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.users);
      this.hasMany(models.transactions, { foreignKey: "user_id" });
    }
  }
  Wallets.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          // Sequelize docs suggest this should be plural table name and not singular model name
          // https://sequelize.org/api/v6/class/src/model.js~model#static-method-init
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "wallets",
      underscored: true,
    }
  );
  return Wallets;
};
