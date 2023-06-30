const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user/UserController");

// Register a new user
router.post("/register", UserController.createUser);
// Login a user
router.post("/login", UserController.login);
// Logout
router.get("/logout", UserController.logout);
// User routes (requires authentication)
router.use(UserController.authenticateUser);
router.get("/user-action", UserController.userAction);
// 


// Admin routes (requires authentication and admin role)
router.use(UserController.authenticateUser);
router.use(UserController.adminAction);
// Get all users (admin only)
router.get("/", UserController.getAllUsers);
// Get a specific user by ID (admin only)
router.get("/:id", UserController.getUserById);
// Update a user by ID (admin only)
router.put("/:id", UserController.updateUser);
// Delete a user by ID (admin only)
router.delete("/:id", UserController.deleteUser);



module.exports = router;
