const { Router } = require("express");
const { Product } = require("../models/model");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const isAdmin = require("../middleware/isAdminMiddleware");
exports.getAll = async (req, res, next) => {
  try {
    const products = await getAllWithSequentialIds();
    res.json(products);
  } catch (error) {
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
      ],
    });
    return products;
  } catch (error) {
    throw error;
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./static/"); // Change the path to where you want to store the images
  },
  filename: function (req, file, cb) {
    const uniqueFilename = uuidv4(); // Generate a unique filename using UUID
    cb(null, uniqueFilename + "-" + file.originalname); // Append the original filename to the UUID
  },
});
const upload = multer({ storage: storage });
const uploadImage = upload.single("image");

exports.postOne = [
  isAdmin,
  uploadImage, // Use the uploadImage middleware before calling the controller function
  async (req, res, next) => {
    try {
      // Assuming you will send the product details in the request body
      const { name, type, price } = req.body;

      // Check if all required fields are present
      if (!name || !type || !price) {
        return res.status(400).json({ error: "All fields are required" });
      }
      // Access the imag  e file using req.file
      const imageFilename = req.file.filename;

      console.log(imageFilename);
      // Create the product in the database with the image data
      const newProduct = await Product.create({
        name,
        type,
        price,
        img: imageFilename, // Save the image binary data in the database
      });

      res.json(newProduct);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to add product" });
    }
  },
];
