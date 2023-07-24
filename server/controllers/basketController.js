const { Router } = require("express");

const { Basket } = require("../models/model");

exports.addOne = async (req, res, next) => {
  try {
    try {
      // Assuming the request body contains the necessary product details
      const { title, price, itemImage, role } = req.body;

      // Save the product details to the Basket table in the database
      const newBasketItem = await Basket.create({
        title,
        price,
        itemImage,
        role,
      });

      res.json(newBasketItem);
    } catch (error) {
      res.status(500).json({ error: "Failed to add product to basket" });
    }
  } catch (e) {
    console.log(e);
  }
};
