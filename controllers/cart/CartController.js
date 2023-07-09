const Cart = require("../../models/Cart");
const User = require("../../models/User");
const Product = require("../../models/Product");

// Get all carts
exports.getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    console.log(`fount all Carts: ${JSON.stringify(carts)}`);
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching carts" });
  }
};

// Get a specific cart by ID
exports.getCartById = async (req, res) => {
  const cartId = req.query.cartId;

  try {
    const cart = await Cart.findOne({ id: cartId });
    console.log(`found ${cartId}`);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json(`Error: cart not found`);
    }
  } catch (error) {
    res.status(500).json(`Error: ${error} : ${error.message}`);
  }
};

// Create a new cart
exports.createCart = async (req, res) => {
  const { username, date, products } = req.query;

  try {
    if (username) {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const newCart = {
        user_id: user._id,
        date,
        products,
      };

      console.log(`Created a new cart for user: ${user.username}`);
      console.log(`newCart: ${newCart}`);
      const savedCart = await Cart.insertMany(newCart);
      // const savedCart = await newCart.save();

      // Insert the new cart into the user's cart array using insertMany
      await User.updateOne(
        { _id: user._id },
        { $push: { cart: { $each: [savedCart], $position: 0 } } }
      );

      res.status(201).json(savedCart);
    } else {
      res.status(400).json({ error: "Missing username" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(`Error: ${error} : ${error.message}`);
  }
};

// Update a cart
exports.updateCart = async (req, res) => {
  const cartId = req.params.cartId;
  const { user_id, date, products } = req.body;

  try {
    const cart = await Cart.findOneAndUpdate(
      { id: cartId },
      { user_id, date, products },
      { new: true }
    );
    console.log(`trying to update cart ${cart.id} of user ${user_id}`);
    if (cart) {
      console.log(`sucess ! cart ${cart.id} updated`);
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating cart" });
  }
};

// Delete a cart
exports.deleteCart = async (req, res) => {
  const cartId = req.params.cartId;

  try {
    const cart = await Cart.findOneAndDelete({ id: cartId });
    if (cart) {
      res.status(200).json({ message: "Cart deleted successfully" });
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting cart" });
  }
};
// Add a product to a cart
exports.addProductToCart = async (req, res) => {
  const cartId = req.query.cartId;
  const productId = req.query.productId;

  try {
    const cart = await Cart.findOne({ _id: cartId });
    console.log(`Cart: ${cart}`)
    if (cart) {
      // Find the product by ID
      const product = await Product.findOne({ _id: productId });
      console.log(`Product: ${product}`);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Add the product to the cart's products array
      cart.products.push({ product, quantity });
      const updatedCart = await cart.save();
      console.log(`Updated cart: ${updatedCart}`);
      res.status(200).json(updatedCart);
    } else {
      res.status(404).json(`Error adding a product to the cart ${product}`);
    }
  } catch (error) {
    res.status(500).json(`Error: ${error} : ${error.message}`);
  }
};

// Remove a product from a cart
exports.removeProductFromCart = async (req, res) => {
  const cartId = req.query.cartId;
  const productId = req.query.productId;

  try {
    const cart = await Cart.findOne({ _id: cartId });
    if (cart) {
      // Remove the product from the cart's products array
      console.log(`Cart: ${cart}`);
      cart.products = cart.products.filter(
        (product) => product.productId !== productId
      );
      console.log(`Product: ${products}`);
      const updatedCart = await cart.save();
      console.log(`Updated cart: ${updatedCart}`);
      res.status(200).json(updatedCart);
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error removing product from cart" });
  }
};
