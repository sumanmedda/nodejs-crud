import express from "express"
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../productsController/productsController.mjs"

const productRoute = express.Router()

productRoute.post("/create-product", createProduct)
productRoute.get("/get-allproducts", getProducts)
productRoute.get("/get-product/:id", getProductById)
productRoute.put("/update-product/:id", updateProduct)
productRoute.delete("/delete-product/:id", deleteProduct)

export default productRoute
