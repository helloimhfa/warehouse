const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");

productRouter
    .get("/", productController.getAllProducts)
    .get("/:productId", productController.getProductById)
    .post("/", productController.createProduct)
    .patch("/:productId", productController.updateProduct)
    .delete("/:productId", productController.deleteProduct)

module.exports = productRouter;