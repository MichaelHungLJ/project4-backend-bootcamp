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
          name: "My Metamask Wallet",
          address: "0x9b325f65bd5a5b8c5b5dd71dd5a38e1f8ce8aabd",
          type: "Metamask",
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Wallet 1",
          address: "0x2a82ae142b2e62cb7d10b55e323acb1cab663a26",
          type: "Exchange wallet",
          user_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Wallet 2",
          address: "0xf68a4b64162906eff0ff6ae34e2bb1cd42fef62d",
          type: "Exchange wallet",
          user_id: 3,
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
