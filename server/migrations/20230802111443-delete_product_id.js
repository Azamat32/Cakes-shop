"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Baskets", "product_id");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Baskets", "product_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Productss", // Assuming 'Products' is the name of the referenced table
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
};
