const { Router } = require("express");
const { Product } = require("../models/model");

exports.getAll = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

exports.postOne = async (req, res, next) => {
  try {
    // Assuming you will send the product details in the request body
    const { name, type, price } = req.body;

    // Check if all required fields are present
    if (!name || !type || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create the product in the database
    const newProduct = await Product.create({ name, type, price });

    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
};
