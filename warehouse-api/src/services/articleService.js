const ArticleDAO = require("../dao/ArticleDAO");

const getAllArticles = async () => {
    try {
        const allArticles = await ArticleDAO.getAllArticles();
        return allArticles;
    } catch (error) {
        throw error;
    }
}

const getArticleById = async (articleId) => {
    try {
        const requestedArticle = await ArticleDAO.getArticleById(articleId);
        return requestedArticle;
    } catch (error) {
        throw error;
    }
}

const createArticle = async (newArticle) => {
    // TODO: check existing name (?) 
    const articleToInsert = {
        ...newArticle,
    }

    try {
        const createdArticle = await ArticleDAO.createArticle(articleToInsert);
        return createdArticle;
    } catch (error) {
        throw error;
    }
}

const updateArticle = async (articleId, updatedFields) => {
    try {
        const updatedArticle = await ArticleDAO.updateArticle(articleId, updatedFields);
        return updatedArticle;
    } catch (error) {
        throw error;
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
}