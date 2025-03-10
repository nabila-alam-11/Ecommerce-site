const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  size: [
    {
      type: String,
      required: true,
    },
  ],
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 0,
  },
  description: [
    {
      type: String,
      required: true,
    },
  ],
  category: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  isReturnable: {
    type: Boolean,
    default: false,
  },
  returnPeriod: {
    type: Number,
    default: 0,
  },
  payment: {
    codAvailable: { type: Boolean, default: false },
    charges: { type: Number, default: 0 },
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  isNewArrival: {
    type: Boolean,
    default: false,
  },
  brand: {
    type: String,
  },
  securePayment: {
    type: Boolean,
    default: true,
  },
  img: [
    {
      type: String,
      required: true,
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

const responseSchema = new mongoose.Schema({
  data: {
    products: [productSchema],
  },
});

const ResponseModel = mongoose.model("Response", responseSchema);

module.exports = { Product, ResponseModel };
