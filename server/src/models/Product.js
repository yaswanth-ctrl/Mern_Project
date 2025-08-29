import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: "" },
  description: { type: String, default: "" },
  category: { type: String, default: "" },
  countInStock: { type: Number, default: 0 }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
