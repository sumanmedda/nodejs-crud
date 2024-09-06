import productsModel from "../productsModel/productsModel.mjs"

export const createProduct = async (req, res) => {
  try {
    const productData = new productsModel(req.body)
    const productExist = await productsModel.findOne({ name: req.body.name })
    if (productExist) {
      return res.status(400).json({ message: "Product already exists" })
    }
    const product = await productData.save()
    return res.status(201).json({ message: "Product Created", data: product })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await productsModel.find()
    if (!products)
      return res.status(404).json({ message: "Products not found" })
    return res.status(200).json({ message: "All Products", data: products })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getProductById = async (req, res) => {
  try {
    const productID = req.params.id
    const productExist = await productsModel.findById(productID)
    if (!productExist) {
      return res.status(404).json({ message: "Product not found" })
    }
    const products = await productsModel.findById(productID)
    return res.status(200).json({ message: "Product Found", data: products })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const productID = req.params.id
    const productExist = await productsModel.findOne({ _id: productID })
    if (!productExist) {
      return res.status(404).json({ message: "Product not found" })
    }
    const product = await productsModel.findByIdAndUpdate(productID, req.body, {
      new: true,
    })

    return res.status(201).json({ message: "Product Updated", data: product })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const productID = req.params.id
    const productExist = await productsModel.findById(productID)
    if (!productExist) {
      return res.status(404).json({ message: "Product not found" })
    }
    await productsModel.findByIdAndDelete(productID)
    return res.status(200).json({ message: "Product Deleted" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
