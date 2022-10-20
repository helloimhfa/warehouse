const db = require("../database/models");
const { Product, Article, ProductArticle } = require("../database/models");

const getAllProducts = async () => {
    try {
        const allProducts = await Product.findAll();
        return allProducts;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

const getProductById = async (productId) => {
    try {
        const requestedProduct = await Product.findByPk(productId);
        if (requestedProduct) {
            return requestedProduct;
        } else {
            throw { status: 400, message: `No product with id '${productId}' was found` };
        }
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

const createProduct = async (newProductDetails) => {
    const { product } = newProductDetails;
    const { articles } = newProductDetails;

    try {
        const transactionResult = await db.sequelize.transaction(async (t) => {            
            const createdProduct = await Product.create(product, { transaction: t });
            const articlesResults = await Promise.all(articles.map(async (articleDetails) => {
                const articleExists = await Article.findByPk(articleDetails.id);
                if (!articleExists) {
                    throw { status: 401, message: `No article with id '${articleDetails.id}' was found` };
                }                

                const productArticle = {
                    productId: createdProduct.id,
                    articleId: articleDetails.id,
                    amount: articleDetails.amount,
                };

                return await ProductArticle.create(productArticle, { transaction: t })
            }));

            return { product: createdProduct, articles: articlesResults };
        });

        return transactionResult;

    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

const updateProduct = async (productId, updateData) => {
    return;
}

const deleteProduct = async (articleId) => {
    return;
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};