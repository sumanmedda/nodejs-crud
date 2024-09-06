import userModel from "../models/userModel.mjs"

export const createUser = async (req, res) => {
  const userDate = new userModel(req.body)
  try {
    const usedEmail = await userModel.findOne({ email: req.body.email })
    if (usedEmail) {
      return res.status(400).json({ message: "Email already exists" })
    }
    const saveUser = await userDate.save()
    return res
      .status(201)
      .json({ message: "User Created Successfully", data: saveUser })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getAllUser = async (req, res) => {
  try {
    const allUsers = await userModel.find()
    if (allUsers.length === 0) {
      return res.status(404).json({ message: "No Users Found" })
    }
    return res.status(200).json({ message: "All Users", data: allUsers })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id
    const userExist = await userModel.findOne({ _id: userId })
    if (!userExist) {
      return res.status(404).json({ message: "User Not Found" })
    }
    const user = await userModel.findById(userId)
    return res.status(200).json({ message: "User Found", data: user })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const updateUser = async (req, res) => {
  try {
    const userID = req.params.id
    const userExist = await userModel.findOne({ _id: userID })
    if (!userExist) {
      return res.status(404).json({ message: "User Not Found" })
    }
    const userUpdated = await userModel.findByIdAndUpdate(userID, req.body, {
      new: true,
    })
    res
      .status(201)
      .json({ message: "User Updated Successfully", updatedUser: userUpdated })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id
    const userExist = await userModel.findOne({ _id: userId })
    if (!userExist) {
      return res.status(404).json({ message: "User Not Found" })
    }
    await userModel.findByIdAndDelete(userId)
    return res.status(200).json({ message: "User Deleted Successfully" })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
