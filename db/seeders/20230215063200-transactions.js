"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "transactions",
      [
        {
          user_id: 1,
          wallet_id: 1,
          wallet: "My Metamask Wallet",
          date: new Date(),
          type: "Buy",
          coin: "ETH",
          quantity: 2.23,
          price: 1534.25,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          wallet_id: 1,
          wallet: "My Metamask Wallet",
          date: new Date(),
          type: "Sell",
          coin: "ETH",
          quantity: 1,
          price: 1600.25,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          wallet_id: 2,
          wallet: "My Cold Wallet",
          date: new Date(),
          type: "Buy",
          coin: "BTC",
          quantity: 0.53,
          price: 20140,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          wallet_id: 2,
          wallet: "My Cold Wallet",
          date: new Date(),
          type: "Sell",
          coin: "BTC",
          quantity: 0.23,
          price: 20000,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          wallet_id: 3,
          wallet: "My Metamask Wallet",
          date: new Date(),
          type: "Buy",
          coin: "GMX",
          quantity: 51.2,
          price: 45.32,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          wallet_id: 3,
          wallet: "My Metamask Wallet",
          date: new Date(),
          type: "Buy",
          coin: "GMX",
          quantity: 20.2,
          price: 56.32,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 2,
          wallet_id: 3,
          wallet: "My Metamask Wallet",
          date: new Date(),
          type: "Sell",
          coin: "GMX",
          quantity: 40.2,
          price: 76.2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("transactions", null, {});
  },
};
