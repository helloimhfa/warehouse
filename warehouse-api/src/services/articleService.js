const { v4: uuid } = require("uuid");
const ArticleDAO = require("../database/Article");

const getAllArticles = () => {
    return ArticleDAO.getAllArticles();
}
const getArticleById = (articleId) => {
    return ArticleDAO.getArticleById(articleId);
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

const updateArticle = (articleId) => {
    return ArticleDAO.updateArticle(articleId);
}
const deleteArticle = (articleId) => {
    return;
}

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
}