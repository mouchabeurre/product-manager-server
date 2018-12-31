import Product from "../models/product.model"

const ProductController = {}
ProductController.create = async (req, res) => {
  try {
    let { name, price } = req.body
    price = parseInt(price, 10)
    if (name && price) {
      const newProduct = await Product.create(name, price)
      return res.status(200).json({
        success: true,
        data: newProduct,
      })
    } else {
      return res.status(400).json({
        success: false,
        error: "invalid arguments",
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "internal server error",
    })
  }
}

ProductController.delete = async (req, res) => {
  try {
    const { id } = req.params
    if (id) {
      await Product.delete(id)
      return res.status(200).json({
        success: true,
      })
    } else {
      return res.status(400).json({
        success: false,
        error: "invalid arguments",
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "internal server error",
    })
  }
}

ProductController.update = async (req, res) => {
  try {
    const { price, name } = req.body
    const { id } = req.params
    if (id && (name || price)) {
      const fields = {}
      if (name) {
        fields.name = name
      }
      if (price) {
        fields.price = parseInt(price, 10)
      }
      const newProduct = await Product.update(id, fields)
      return res.status(200).json({
        success: true,
        data: newProduct,
      })
    } else {
      return res.status(400).json({
        success: false,
        error: "invalid arguments",
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "internal server error",
    })
  }
}

ProductController.getMany = async (req, res) => {
  try {
    const { offset = 0, limit = 0 } = req.body
    const products = await Product.getMany(offset, limit)
    // res.render("list", { products });
    return res.status(200).json({
      success: true,
      data: products,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "internal server error",
    })
  }
}

ProductController.getOne = async (req, res) => {
  try {
    const { id } = req.params
    if (id) {
      const product = await Product.getOne(id)
      return res.status(200).json({
        success: true,
        data: product,
      })
    } else {
      return res.status(400).json({
        success: false,
        error: "invalid arguments",
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "internal server error",
    })
  }
}

ProductController.existsByName = async (req, res) => {
  try {
    const { name } = req.params
    if (name) {
      const exists = await Product.existsOneByName(name)
      return res.status(200).json({
        exists,
      })
    } else {
      return res.status(400).json({
        success: false,
        error: "invalid arguments",
      })
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "internal server error",
    })
  }
}

export default ProductController
