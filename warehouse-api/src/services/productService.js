const ProductDAO = require("../dao/ProductDAO");

const getAllProducts = async () => {
    try {
        const allProducts = await ProductDAO.getAllProducts();
        return allProducts;
    } catch (error) {
        throw error;
    }
}

const getProductById = async (productId) => {
    try {
        const requestedProduct = await ProductDAO.getProductById(productId);
        return requestedProduct;
    } catch (error) {
        throw error;
    }
}

const createProduct = async (newProductDetails) => {
    try {
        const createdProduct = await ProductDAO.createProduct(newProductDetails);
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