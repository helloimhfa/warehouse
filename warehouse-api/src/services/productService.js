const productRepository = require("../repositories/productRepository");

const getAllProducts = async () => {
    try {
        const allProducts = await productRepository.getAllProducts();
        return allProducts;
    } catch (error) {
        throw error;
    }
}

const getProductById = async (productId) => {
    try {
        const requestedProduct = await productRepository.getProductById(productId);
        return requestedProduct;
    } catch (error) {
        throw error;
    }
}

const createProduct = async (newProductDetails) => {
    try {
        const createdProduct = await productRepository.createProduct(newProductDetails);
        return createdProduct;
    } catch (error) {
        throw error;
    }
}

const updateProduct = async () => {
    return;
}

const deleteProduct = async () => {
    return;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}