const productRepository = require("../repositories/productRepository");
const articleRepository = require("../repositories/articleRepository");
const CommonHelpers = require("../helpers/common");
const ProductHelpers = require('../helpers/product');

const getAllProducts = async () => {
    try {
        const allProducts = await productRepository.getAllProducts();
        const responseCode = (allProducts.length > 0) ? 200 : 204;
        const productsObj = CommonHelpers.instanceToPlainObject(allProducts);
        const productsData = ProductHelpers.addStockDetails(productsObj);
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
            const productObj = CommonHelpers.instanceToPlainObject(requestedProduct);
            const productData = ProductHelpers.addStockDetails([productObj]);
            return productData[0];
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

const sellProduct = async (productId) => {
    try {
        const requestedProduct = await productRepository.getProductById(productId);
        if (requestedProduct) {
            const productObj = CommonHelpers.instanceToPlainObject(requestedProduct);
            const articlesToSell = ProductHelpers.getArticlesToSell(productObj);
            const articlesRemoved = await articleRepository.removeSoldArticles(articlesToSell);
            console.log(":>:<>:<?<:",  articlesRemoved)
            return articlesRemoved;
        } else {
            throw { status: 404, message: `No product with id '${productId}' was found` };
        }
        
        return articlesToSell;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    sellProduct,
}