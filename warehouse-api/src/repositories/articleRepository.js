const db = require("../models");
const { Article } = require("../models");
const lockedArticleRepository = require("./lockedArticleRepository");

/**
 * @openapi
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name:
 *           type: string
 *           example: Screw
 *         stock:
 *           type: integer
 *           example: 12
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 */
const getAllArticles = async () => {
    try {
        const allArticles = await Article.findAll({
            order: [
                ['name', 'ASC'],
            ],
        });
        return allArticles;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

const getArticleById = async (articleId) => {
    try {
        const requestedArticle = await Article.findByPk(articleId);
        return requestedArticle;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

const getArticleByName = async (articleName) => {
    try {
        const requestedArticle = await Article.findAll({ where: { name: articleName } });
        return requestedArticle;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

const createArticle = async (newArticle) => {
    try {
        const createdArticle = await Article.create(newArticle);
        return createdArticle;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

const updateArticle = async (articleId, fieldsToUpdate) => {
    try {
        const articleUpdateResult = await Article.update(fieldsToUpdate, {
            where: { id: articleId }
        });
        return articleUpdateResult;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

const deleteArticle = async (articleId) => {
    return;
}

// TODO: check native locking.... -_-'
const removeSoldArticles = async (articlesToRemove) => {
    try {
        // Lock all articles included in the product that's being sold. If one
        // of them is locked, and error is thrown and the transaction is aborted.
        const checkAndLockTransaction = await db.sequelize.transaction(async (t1) => {
            const lockedArticlesResult = await Promise.all(articlesToRemove.map(async (article) => {
                const articleIsLocked = await lockedArticleRepository.getLockedArticleByArticleId(article.id, t1);
                if (articleIsLocked.length > 0) {
                    throw { status: 403, message: `Article with id '${article.id}' is currently locked. Try again later.` };
                } else {
                    const lockItem = {
                        articleId: article.id,
                        createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
                        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
                    }
                    const lockResult = await lockedArticleRepository.createLockedArticle(lockItem, t1);
                    return lockResult;
                }
            }));
            return lockedArticlesResult;
        });

        try {
            // Articles are locked and can't be changed but from here
            // and now, so we update the stocks and release de locks.
            const updateAndReleaseTransaction = await db.sequelize.transaction(async (t2) => {
                const updateArticlesResults = await Promise.all(articlesToRemove.map(async (article) => {
                    const currentArticle = await Article.findByPk(article.id, { transaction: t2 });
                    const stockAfterSale = currentArticle.stock - article.items;
                    const fieldToUpdate = { stock: stockAfterSale };
                    const updateArticle = await Article.update(fieldToUpdate, {
                        where: { id: article.id },
                        transaction: t2,
                    });
                    const releasedArticle = await lockedArticleRepository.deleteLockedArticleByArticleId(article.id, t2);
                    return { stockUpdate: updateArticle, articleRelease: releasedArticle };
                }));

                console.log(updateArticlesResults);
                return updateArticlesResults;
            });

            return updateAndReleaseTransaction
        } catch (error) {
            // Transaction was aborted
            throw { status: error?.status || 500, message: error?.message || error };
        }
    } catch (error) {
        // Transaction was aborted
        throw { status: error?.status || 500, message: error?.message || error };
    }


}

module.exports = {
    getAllArticles,
    getArticleById,
    getArticleByName,
    createArticle,
    updateArticle,
    deleteArticle,
    removeSoldArticles,
};