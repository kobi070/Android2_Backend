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
      res.status(404).json({ error: "Product id not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

// Get product by name
exports.getProductByName = async (req, res) => {
  const { title } = req.params;

  try {
    const product = await Product.findOne({ title: title });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product name not found" });
    }
  } catch (err) {
    res.status(500).json({ error: `Error fetching product - ${err}` });
  }
};

// Get product by category
exports.getProductByCategory = async (req, res) => {
  const category = req.params.name;

  try {
    const product = await Product.findOne({ category: category });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product category not found" });
    }
  } catch (err) {
    res.status(500).json({ error: `Error fetching product - ${err}` });
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

// Group By - Average Spending per User
exports.averageSpendingByUser = async (req, res) => {
  try {
    const result = await Cart.aggregate([
      {
        $group: {
          _id: "$user_id",
          averageSpending: { $avg: { $sum: "$products.quantity" } }
        }
      }
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error performing group by operation" });
  }
};

// Map-Reduce - Total Revenue per Product Category
exports.totalRevenueByCategory = async (req, res) => {
  try {
    const mapFunction = function () {
      emit(this.category, this.price * this.quantity);
    };

    const reduceFunction = function (key, values) {
      return Array.sum(values);
    };

    const options = {
      query: {}, // Add any additional filtering criteria here
      scope: { Product }, // Pass additional variables to the map and reduce functions if needed
      out: { inline: 1 }
    };

    const result = await Cart.mapReduce(mapFunction, reduceFunction, options);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error performing map-reduce operation" });
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
