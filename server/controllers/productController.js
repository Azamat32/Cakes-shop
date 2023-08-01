const { Router } = require("express");
const { Product, Category } = require("../models/model");
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const isAdmin = require("../middleware/isAdminMiddleware");
exports.getAll = async (req, res, next) => {
  try {
    const products = await getAllWithSequentialIds();
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Function to get all products with sequential ids
async function getAllWithSequentialIds() {
  try {
    const products = await Product.findAll({
      attributes: [
        [Sequelize.literal("ROW_NUMBER() OVER ()"), "sequential_id"],
        "id",
        "name",
        "type",
        "price",
        "img",
      ],
    });
    return products;
  } catch (error) {
    throw error;
  }
}
exports.postOne = [
  isAdmin,
  async (req, res, next) => {
    try {
      // Assuming you will send the product details in the request body
      const { name, type, price } = req.body;

      // Check if all required fields are present
      if (!name || !type || !price) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Access the image file using req.files
      const { image } = req.files;
      const uniqueFilename = uuid.v4() + "-" + image.name;

      // Move the uploaded image to the 'static' directory
      const imagePath = path.join(__dirname, '..', 'static', uniqueFilename);
      fs.writeFileSync(imagePath, image.data);

      // Create the product in the database with the image data
      const newProduct = await Product.create({
        name,
        type,
        price,
        img: uniqueFilename, // Save the image filename in the database
      });

      res.json(newProduct);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to add product" });
    }
  },
];

exports.addCategory = [
  isAdmin,
  async (req, res, next) => {
    try {
      const { CatalogName } = req.body;

      if (!CatalogName) {
        return res.status(400).json({ error: "All fields are required" });
      }
      let name = CatalogName;
      const newCatalog = await Category.create({
        name,
      });

      res.json(newCatalog);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to add product" });
    }
  },
];

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      attributes: ["id", "name"],
    });
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};
