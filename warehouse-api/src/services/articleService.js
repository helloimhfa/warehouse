const articleRepository = require("../repositories/articleRepository");

const getAllArticles = async () => {
    try {
        const allArticles = await articleRepository.getAllArticles();
        return allArticles;
    } catch (error) {
        throw error;
    }
}

const getArticleById = async (articleId) => {
    try {
        const requestedArticle = await articleRepository.getArticleById(articleId);
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
        const createdArticle = await articleRepository.createArticle(articleToInsert);
        return createdArticle;
    } catch (error) {
        throw error;
    }
}

const updateArticle = async (articleId, updatedFields) => {
    try {
        const updatedArticle = await articleRepository.updateArticle(articleId, updatedFields);
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