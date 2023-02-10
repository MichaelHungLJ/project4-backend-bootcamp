"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      wallet_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "wallets",
          key: "id",
        },
      },
      wallet: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      type: {
        type: Sequelize.STRING,
      },
      coin: {
        type: Sequelize.STRING,
      },
      quantity: {
        type: Sequelize.DECIMAL,
      },
      price: {
        type: Sequelize.DECIMAL,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("transactions");
  },
};
