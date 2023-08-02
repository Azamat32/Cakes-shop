const isAuthenticated = require("../middleware/isAuthenticated");
const { Basket } = require("../models/model");

exports.addOne = [
  isAuthenticated, // Use the isAuthenticated middleware here
  async (req, res, next) => {
    try {
      // Assuming the request body contains the necessary product details
      const { title, price, img, role } = req.body;
      console.log("req.body:", req.body);
      // Save the product details to the Basket table in the database
      const newBasketItem = await Basket.create({
        productName: title,
        price,
        img,
        role,
      });

      res.json(newBasketItem);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to add product to basket" });
    }
  },
];

exports.deleteOne = [
  isAuthenticated,
  async (req, res, next) => {
    try {
      // Assuming the request body contains the item ID to be deleted
      const { itemId } = req.body;

      // Find the item in the Basket table by its ID
      const itemToDelete = await Basket.findOne({ where: { id: itemId } });

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
