const Cart = require("../../models/Cart");

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
  const cartId = req.params.cartId;

  try {
    const cart = await Cart.findOne({ id: cartId });
    console.log(`found ${cartId}`);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching cart" });
  }
};

// Create a new cart
exports.createCart = async (req, res) => {
  const { id, user_id, date, products } = req.query;

  try {
    const newCart = new Cart({
      id,
      user_id,
      date,
      products,
    });
    console.log(`Created a new cart: ${newCart.user_id}`);
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ error: "Error creating cart" });
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
  const cartId = req.params.cartId;
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ id: cartId });
    if (cart) {
      // Add the product to the cart's products array
      cart.products.push({ productId, quantity });
      const updatedCart = await cart.save();
      res.status(200).json(updatedCart);
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error adding product to cart" });
  }
};

// Remove a product from a cart
exports.removeProductFromCart = async (req, res) => {
  const cartId = req.params.cartId;
  const productId = req.params.productId;

  try {
    const cart = await Cart.findOne({ id: cartId });
    if (cart) {
      // Remove the product from the cart's products array
      cart.products = cart.products.filter((product) => product.productId !== productId);
      const updatedCart = await cart.save();
      res.status(200).json(updatedCart);
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error removing product from cart" });
  }
};
