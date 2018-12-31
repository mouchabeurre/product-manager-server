import express from "express"
import ProductController from "./controllers/product.controller"

const router = express.Router()

router
  .get("/product/:id", ProductController.getOne)
  .put("/product/:id", ProductController.update)
  .delete("/product/:id", ProductController.delete)
  .get("/", ProductController.getMany)
  .get("/existsByName/:name", ProductController.existsByName)
  .post("/create", ProductController.create)
export default router
