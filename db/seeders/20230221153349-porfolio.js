"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "portfolios",
      [
        {
          user_id: 1,
          value: 25000,
          dates: new Date("2023-02-01"),
          days: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          value: 20000,
          dates: new Date("2023-02-02"),
          days: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          value: 23000,
          dates: new Date("2023-02-03"),
          days: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          value: 21000,
          dates: new Date("2023-02-04"),
          days: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          value: 24000,
          dates: new Date("2023-02-05"),
          days: 5,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("portfolios", null, {});
  },
};
