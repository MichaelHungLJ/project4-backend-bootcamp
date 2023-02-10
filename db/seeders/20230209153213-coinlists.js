"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("coinlists", [], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("coinlists", null, {});
  },
};
