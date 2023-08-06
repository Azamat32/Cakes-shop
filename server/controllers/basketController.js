const isAuthenticated = require("../middleware/isAuthenticated");
const { Basket } = require("../models/model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.addOne = [
  isAuthenticated, // Use the isAuthenticated middleware here
  async (req, res, next) => {
    try {
      // Assuming the request body contains the necessary product details
      const { productName, price, img, role, user_id } = req.body;
      console.log("req.body:", req.body);
      const existingProduct = await Basket.findOne({
        where: {
          user_id,
          productName,
        },
      });

      if (existingProduct) {
        // If the product exists, update the quantity instead of adding a new item
        existingProduct.quantity += 1;
        await existingProduct.save();
        res.json(existingProduct);
      } else {
        // If the product does not exist, add it as a new item to the basket
        const newBasketItem = await Basket.create({
          user_id,
          productName,
          price,
          img,
          role,
        });

        res.json(newBasketItem);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to add product to basket" });
    }
  },
];

exports.getAll = [
  isAuthenticated, // Use the isAuthenticated middleware here
  async (req, res, next) => {
    try {
      const token = req.headers.authorization; // Assuming the JWT token is passed in the "Authorization" header
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Replace "your_secret_key" with your actual JWT secret key

      const userId = decodedToken.userId; // Assuming the user ID is stored in the "id" field of the JWT token payload
      console.log(req.body);
      // Fetch all products from the Basket model where user_id matches the authenticated user's ID
      const products = await Basket.findAll({
        where: {
          user_id: userId,
        },
      });

      res.json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to get products from basket" });
    }
  },
];
exports.deleteOne = [
  isAuthenticated,
  async (req, res, next) => {
    try {
      // Assuming the request body contains the item ID to be deleted
      const { id } = req.params;

      // Find the item in the Basket table by its ID
      const itemToDelete = await Basket.findOne({ where: { id: id } });

      // If the item is not found, return an error
      if (!itemToDelete) {
        return res.status(404).json({ error: "Item not found in basket" });
      }

      // Delete the item from the database
      await itemToDelete.destroy();

      res.json({ message: "Item deleted from basket" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete item from basket" });
    }
  },
];

// controllers/basketController.js

exports.increaseQuantity = [
  isAuthenticated,
  async (req, res, next) => {
    try {
      // Assuming the request body contains the item ID to be updated
      const { id } = req.params;

      // Find the item in the Basket table by its ID
      const itemToUpdate = await Basket.findOne({ where: { id: id } });

      // If the item is not found, return an error
      if (!itemToUpdate) {
        return res.status(404).json({ error: "Item not found in basket" });
      }

      // Increase the quantity of the item by 1 and save it to the database
      itemToUpdate.quantity += 1;
      await itemToUpdate.save();

      res.json(itemToUpdate);
    } catch (error) {
      res.status(500).json({ error: "Failed to increase quantity" });
    }
  },
];

exports.decreaseQuantity = [
  isAuthenticated,
  async (req, res, next) => {
    try {
      // Assuming the request body contains the item ID to be updated
      const { id } = req.params;

      // Find the item in the Basket table by its ID
      const itemToUpdate = await Basket.findOne({ where: { id: id } });

      // If the item is not found, return an error
      if (!itemToUpdate) {
        return res.status(404).json({ error: "Item not found in basket" });
      }

      // Decrease the quantity of the item by 1 and save it to the database
      itemToUpdate.quantity = Math.max(itemToUpdate.quantity - 1, 1);
      await itemToUpdate.save();

      res.json(itemToUpdate);
    } catch (error) {
      res.status(500).json({ error: "Failed to decrease quantity" });
    }
  },
];

exports.getOne = [
  isAuthenticated,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const itemInBasket = await Basket.findOne({ where: { id: id } });
      if (!itemInBasket) {
        return res.status(404).json({ error: "Item not found in basket" });
      }
      res.json(itemInBasket);
    } catch (error) {
      console.log(error);
    }
  },
];
