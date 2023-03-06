"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "John Doe",
          email: "johndoe@example.com",
          password: "password123",
          created_at: new Date(),
          updated_at: new Date(),
          biography: null,
          image: null,
        },
        {
          name: "Jane Doe",
          email: "janedoe@example.com",
          password: "password456",
          created_at: new Date(),
          updated_at: new Date(),
          biography: null,
          image: null,
        },
        {
          name: "demouser",
          email: "demo@gmail.com",
          password:
            "$2b$10$aMPC1QkSAVpkGIO.e5zlE.JWfmYA9JS62Fn6wfGGvbdoMEpVi7xoa",
          created_at: new Date(),
          updated_at: new Date(),
          biography: null,
          image: null,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
