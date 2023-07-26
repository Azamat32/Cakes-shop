"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Products", "img", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "default_image.jpg", // Provide a default value here
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Products", "img");
  },
};
