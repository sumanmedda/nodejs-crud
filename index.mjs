import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import userRoute from "./users/routes/userRoute.mjs"
import productsRoute from "./products/productsRoute/productsRoute.mjs"

const app = express()

app.use(bodyParser.json())
dotenv.config()
const port = process.env.PORT || 5000
const mongoUrl = process.env.MONGO_URL

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Datebase Connected"),
      app.listen(port, () => console.log(`Server Started on Port : ${port}`))
  })
  .catch((err) => console.log(`${err} didn't connect`))

app.use("/api/product", productsRoute)
app.use("/api/user", userRoute)
app.use("/", (req, res) => {
  res.send("Welcome to the NodeJs API")
})
