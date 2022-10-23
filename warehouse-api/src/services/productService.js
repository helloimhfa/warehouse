const productRepository = require("../repositories/productRepository");
const CommonHelpers = require("../helpers/common");
const ProductHelpers = require('../helpers/product');

const getAllProducts = async () => {
    try {
        const allProducts = await productRepository.getAllProducts();
        const responseCode = (allProducts.length > 0) ? 200 : 204;
        const productsObj = CommonHelpers.instanceToPlainObject(allProducts);
        const productsData = ProductHelpers.parseWithStocks(productsObj);
        return {
            code: responseCode,
            data: productsData,
        };
    } catch (error) {
        throw error;
    }
}

const getProductById = async (productId) => {
    try {
        const requestedProduct = await productRepository.getProductById(productId);
        if (requestedProduct) {
            return requestedProduct;
        } else {
            throw { status: 404, message: `No product with id '${productId}' was found` };
        }
    } catch (error) {
        throw error;
    }
}

const createProduct = async (productName, productDescription, productPrice, productArticles) => {

    const newProductDetails = {
        product: {
            name: productName,
            description: productDescription,
            price: productPrice,
            createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
            updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        },
        articles: productArticles,
    }

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