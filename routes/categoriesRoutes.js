const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categories/CategoryController");

// Add a category (Admin only)
router.post('/addCategory', categoryController.addCategory);

module.exports = router;
