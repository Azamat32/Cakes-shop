"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {


   
  
   
    // Remove the BasketItems table
    await queryInterface.dropTable("BasketItems");
  },

  down: async (queryInterface, Sequelize) => {
    // Revert the changes in the up function
    await queryInterface.removeColumn("Baskets", "created_at");

    // Recreate the BasketItems table
    await queryInterface.createTable("BasketItems", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      basket_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Baskets",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },
};
