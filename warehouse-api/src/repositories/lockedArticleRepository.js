const { LockedArticle } = require("../models");

/**
 * @openapi
 * components:
 *   schemas:
 *     LockedArticle:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         articleId:
 *           type: string
 *           example: 8d6376d6-14ae-4750-b809-f2fe00927fab
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 */
const getAllLockedArticles = async () => {
    try {
        const allLockedArticles = await LockedArticle.findAll();
        return allLockedArticles;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

const getLockedArticleByLockId = async (lockedArticleId) => {
    try {
        const requestedLockedArticle = await LockedArticle.findByPk(lockedArticleId);
        return requestedLockedArticle;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

const getLockedArticleByArticleId = async (articleId) => {
    try {
        const requestedLockedArticle = await LockedArticle.findAll({ where: { articleId: articleId } });
        return requestedLockedArticle;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

const createLockedArticle = async (newLockedArticle) => {
    try {
        const createdLockedArticle = await LockedArticle.create(newLockedArticle);
        return createdLockedArticle;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}
const deleteLockedArticle = async (lockId) => {
    try {
        const deletedLockedArticle = await LockedArticle.destroy({
            where: { id: lockId }
        });
        return deletedLockedArticle;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

const deleteLockedArticleByArticleId = async (lockedArticleId) => {
    try {
        const deletedLockedArticle = await LockedArticle.destroy({
            where: { id: lockedArticleId }
        });
        return deletedLockedArticle;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

module.exports = {
    getAllLockedArticles,
    getLockedArticleByLockId,
    getLockedArticleByArticleId,
    createLockedArticle,
    deleteLockedArticle,
    deleteLockedArticleByArticleId,
};