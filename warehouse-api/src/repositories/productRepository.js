const db = require("../models");
const { Product, Article, ProductArticle } = require("../models");

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: ec47e708-e668-4774-8ad0-5520097e0707
 *         name:
 *           type: string
 *           example: Gaming chair
 *         description:
 *           type: string
 *           example: Such a nice and comfy chair to wreck opponents online
 *         price:
 *           type: number
 *           format: float
 *           example: 389.90
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         articles:
 *           type: array
 *           items:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: f2bbbfe0-d33c-437f-969e-d24ef1ef49f2
 *                 name:
 *                   type: string
 *                   example: Chair component A
 *                 stock:
 *                   type: integer
 *                   example: 90
 *                 createdAt:
 *                   type: string
 *                   example: 4/20/2022, 2:21:56 PM
 *                 updatedAt:
 *                   type: string
 *                   example: 4/20/2022, 2:21:56 PM
 *                 product_article:
 *                   type: object
 *                   properties:
 *                     amount:
 *                       type: integer
 *                       example: 5
 *                     createdAt:
 *                       type: string
 *                       example: 4/20/2022, 2:21:56 PM
 *                     updatedAt:
 *                       type: string
 *                       example: 4/20/2022, 2:21:56 PM
 *                     articleId:
 *                       type: string
 *                       example: f2bbbfe0-d33c-437f-969e-d24ef1ef49f2
 *                     productId:
 *                       type: string
 *                       example: ec47e708-e668-4774-8ad0-5520097e0707
 */
const getAllProducts = async () => {
    try {
        const allProducts = await Product.findAll({ include: Article });
        return allProducts;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

const getProductById = async (productId) => {
    try {
        const requestedProduct = await Product.findByPk(productId, { include: Article });
        return requestedProduct;
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
                if (articleExists) {
                    const productArticle = {
                        productId: createdProduct.id,
                        articleId: articleDetails.id,
                        amount: articleDetails.amount,
                    };

                    return await ProductArticle.create(productArticle, { transaction: t })
                } else {
                    throw { status: 404, message: `No article with id '${articleDetails.id}' was found` };
                }
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