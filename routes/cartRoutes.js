    const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart/CartController");

// Get all carts
router.get("/", cartController.getAllCarts);

// Get a specific cart by ID
router.get("/", cartController.getCartById);

// Create a new cart
router.post("/createCart", cartController.createCart);

// Update a cart
router.put("/:cartId", cartController.updateCart);

// Delete a cart
router.delete("/:cartId", cartController.deleteCart);

// Add a product to a cart
router.post("/addProduct", cartController.addProductToCart);

// Add a product to the cart by the product title v1.1
router.post("/addProductBy", cartController.addProductToCartBy)

// Remove a product from a cart
router.delete("/removeProduct", cartController.removeProductFromCartBy);

module.exports = router;
