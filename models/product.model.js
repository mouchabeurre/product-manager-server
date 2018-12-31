import mongoose from "mongoose"
import shortid from "shortid"

const Schema = mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const Model = mongoose.model("Product", Schema)

const Product = {}

Product.create = (name, price) => {
  const product = new Model({
    name,
    price,
  })
  return new Promise(async (resolve, reject) => {
    try {
      const newProduct = await product.save()
      resolve(newProduct)
    } catch (err) {
      reject(err)
    }
  })
}

Product.update = (id, fields) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedProduct = await Model.findByIdAndUpdate(id, fields, {
        new: true,
      })
      resolve(updatedProduct)
    } catch (err) {
      reject(err)
    }
  })
}

Product.delete = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Model.findByIdAndDelete(id)
      resolve(true)
    } catch (err) {
      reject(err)
    }
  })
}

Product.getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const foundProduct = await Model.findById(id)
      resolve(foundProduct)
    } catch (err) {
      reject(err)
    }
  })
}

Product.getMany = (offset, limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      const foundProducts = await Model.find()
        .skip(offset)
        .limit(limit)
        .sort({ date: -1 })
        .select("id name price date")
      resolve(foundProducts)
    } catch (err) {
      reject(err)
    }
  })
}

Product.existsOneByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const foundProduct = await Model.find({ name })
      foundProduct.length !== 0 ? resolve(true) : resolve(false)
    } catch (err) {
      reject(err)
    }
  })
}

export default Product
