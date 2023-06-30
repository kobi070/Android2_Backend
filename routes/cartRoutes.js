const express = require("express");
const router = express.Router();
const cartController = require("../controllers/user/CartController");

// Get all carts
router.get("/", cartController.getAllCarts);

// Get a specific cart by ID
router.get("/:cartId", cartController.getCartById);

// Create a new cart
router.post("/", cartController.createCart);

// Update a cart
router.put("/:cartId", cartController.updateCart);

// Delete a cart
router.delete("/:cartId", cartController.deleteCart);

// Add a product to a cart
router.post("/:cartId/products", cartController.addProductToCart);

// Remove a product from a cart
router.delete("/:cartId/products/:productId", cartController.removeProductFromCart);

module.exports = router;
