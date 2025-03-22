const express = require("express");
const app = express();

const { initializeDatabase } = require("./db/db.connect");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

initializeDatabase();
const { Category } = require("./models/category.model");
const { Product } = require("./models/product.model");

app.get("/", (req, res) => {
  res.send("Welcome!!");
});

app.post("/api/categories", async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json({ message: "Category added", category });
  } catch (error) {
    res.status(500).json({ error: "Failed to add category", error });
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    let { category, ...productData } = req.body;

    // Check if the category exists in the database
    let existingCategory = await Category.findOne({ name: category });

    // If the category does not exist, create it
    if (!existingCategory) {
      existingCategory = new Category({ name: category });
      await existingCategory.save();
    }

    // Create a new product with the category ID
    const product = new Product({
      ...productData,
      category: existingCategory._id, // Store category ID, not name
    });

    await product.save();
    res.status(201).json({ message: "Product added", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add product" });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.delete("/api/categories/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

app.get("/api/categories/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to fetch category" });
  }
});

app.get("/api/products/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found.", error });
    }
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch product." });
  }
});

app.get("/api/products/category:categoryName", async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.params.categoryName });
    if (!category) {
      console.log(category);
      return res.status(404).json({ error: "Category not found" });
    }

    const products = await Product.find({ category: category._id }).populate(
      "category",
      "name"
    );
    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.post("/api/categories/:id", async (req, res) => {
  try {
    // Find category by ID and update it
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json({ message: "Category updated successfully", updatedCategory });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to update category" });
  }
});

// Filter products
app.get("/api/products/search/result", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.json([]);
    }

    const searchWords = query.toLowerCase().split(" ");

    // Find products that match any word in either name or category
    const products = await Product.find().populate("category", "name");

    const filteredProducts = products.filter((product) => {
      const productName = product.name.toLowerCase();
      const categoryName = product.category?.name.toLowerCase() || "";

      return searchWords.some(
        (word) => productName.includes(word) || categoryName.includes(word)
      );
    });

    res.json(filteredProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});
