const Product = require("../../models/Product");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    console.log("getting all products");
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

// Get a specific product by ID
exports.getProductById = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findOne({ id: productId });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { id, category, price, title, description, image } = req.body;

  try {
    const newProduct = new Product({
      id,
      category,
      price,
      title,
      description,
      image,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const { category, price, title, description, image } = req.body;

  try {
    const product = await Product.findOneAndUpdate(
      { id: productId },
      { category, price, title, description, image },
      { new: true }
    );

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findOneAndDelete({ id: productId });
    if (product) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
};
