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
const { Address } = require("./models/address.model");

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

// ADDRESS

const newAddress = {
  fullName: "Aisha Khan",
  email: "aisha.khan@example.com",
  phoneNumber: "9876543210",
  street: "456 Main Street, Apt 5C",
  landmark: "Near Government Hospital",
  city: "Bulandshahr",
  state: "UP",
  pinCode: "203001",
  isDefault: false,
};
async function createAddress(newAddress) {
  try {
    const address = new Address(newAddress);
    const saveAddress = await address.save();
    return saveAddress;
  } catch (error) {
    throw error;
  }
}

createAddress(newAddress);

app.post("/address", async (req, res) => {
  try {
    const saveAddress = await createAddress(req.body);
    res.status(201).json({
      success: true,
      message: "Address added successfully",
      Address: saveAddress,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

async function readAllAddress() {
  try {
    const addresses = await Address.find();
    return addresses;
  } catch (error) {
    throw error;
  }
}

app.get("/address", async (req, res) => {
  try {
    const addresses = await readAllAddress();
    if (addresses.length != 0) {
      res.json(addresses);
    } else {
      res.status(404).json({ error: "Addresses not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

async function updateAddress(addressId, dataToUpdated) {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      dataToUpdated,
      { new: true }
    );
    return updatedAddress;
  } catch (error) {
    console.log("Error in updating address: ", error.message);
  }
}

app.post("/address/:addressId", async (req, res) => {
  try {
    const updatedAddress = await updateAddress(req.params.addressId, req.body);
    if (updateAddress) {
      res
        .status(200)
        .json({ message: "Address updated successfully.", updatedAddress });
    } else {
      res.status(404).json({ error: "Address not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update address" });
  }
});

// DELETE
async function deleteAddressById(addressId) {
  try {
    const deletedAddress = await Address.findByIdAndDelete(addressId);
    return deletedAddress;
  } catch (error) {
    console.log("Error in deleting address: ", error);
  }
}

app.delete("/address/:addressId", async (req, res) => {
  try {
    const deletedAddress = await deleteAddressById(req.params.addressId);
    if (deletedAddress) {
      res
        .status(200)
        .json({ message: "Address deleted successfully.", deletedAddress });
    } else {
      res.status(404).json({ error: "Address not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete address." });
  }
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});
