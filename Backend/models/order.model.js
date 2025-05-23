const mongoose = require("mongoose");

// Order Item Schema
const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: Number,
    price: Number,
  },
  { _id: false }
);

const embeddedAddressSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    phoneNumber: String,
    street: String,
    landmark: String,
    city: String,
    state: String,
    pinCode: String,
    isDefault: Boolean,
  },
  { _id: false }
);

// Order Schema
const orderSchema = new mongoose.Schema(
  {
    user: String,
    address: embeddedAddressSchema, 
    items: [orderItemSchema],
    totalPrice: Number,
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = { Order };
