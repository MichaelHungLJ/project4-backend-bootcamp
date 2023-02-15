"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "wallets",
      [
        {
          name: "My Metamask Wallet",
          address: "0x3a9F1Fb7c4B446eD4f1d4fC4B4F17afFc8D6827D",
          type: "Metamask",
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "My Cold Wallet",
          address: "0x6Ea0440fD5b31c8fD7B9c0B08151E73685F8c6b3",
          type: "Cold Wallet",
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "My Metamask Wallet",
          address: "0x9b325f65bd5a5b8c5b5dd71dd5a38e1f8ce8aabd",
          type: "Metamask",
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("wallets", null, {});
  },
};
