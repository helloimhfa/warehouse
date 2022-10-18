const { v4: uuid } = require("uuid");
const ProductModel = require("../database/Product");

const getAllProducts = () => {
    return ProductModel.getAllProducts();
}
const getProductById = (productId) => {
    return;
}
const createProduct = (newProduct) => {
    const productToInsert = {
        ...newProduct,
        id: uuid()
        // TODO: createdAt (?)
    }

    const createdProduct = ProductModel.createNewProduct(productToInsert);
    return createdProduct;
}
const updateProduct = () => {
    return;
}
const deleteProduct = () => {
    return;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}