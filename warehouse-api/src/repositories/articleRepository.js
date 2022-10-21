const { Article } = require("../database/models");

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
        if (requestedArticle) {
            return requestedArticle;
        } else {
            throw { status: 404, message: `No article with id '${articleId}' was found` };
        }
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

const createArticle = async (newArticle) => {
    try {
        const createdArticle = await Article.create(newArticle).then(data => data).catch(error => {
            throw { status: 400, message: `An article with the name '${newArticle.name}' already exists` };
        });
        return createdArticle;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

const updateArticle = async (articleId, updateData) => {
    try {
        const articleUpdateResult = await Article.update(updateData, {
            where: { id: articleId }
        }).then(result => {
            if (result === 1) {
                return `Article ${articleId} updated successfully`;
            } else {
                throw { status: 501, message: `Article ${articleId} updated failed` };
            }
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
    createArticle,
    updateArticle,
    deleteArticle,
};