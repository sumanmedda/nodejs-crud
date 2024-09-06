import mongoose from "mongoose"

const productsScheme = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
})

export default mongoose.model("products", productsScheme)
