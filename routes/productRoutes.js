const express = require("express");
const router = express.Router();
const productController = require("../controllers/product/ProductController");

// Get all products
router.get("/", productController.getAllProducts);

router.get("/productsTitle", productController.getProductByTitle);

// Get a specific product by ID
router.get("/:productId", productController.getProductById);

// Create a new product
router.post("/", productController.createProduct);

// Update a product
router.put("/:productId", productController.updateProduct);

// Delete a product
router.delete("/:productId", productController.deleteProduct);

module.exports = router;
