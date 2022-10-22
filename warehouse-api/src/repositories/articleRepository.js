const { Article } = require("../models");

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
        const allArticles = await Article.findAll();
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
        const requestedArticle = await Article.findAll({ where: { name: articleName}});
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

module.exports = {
    getAllArticles,
    getArticleById,
    getArticleByName,
    createArticle,
    updateArticle,
    deleteArticle,
};