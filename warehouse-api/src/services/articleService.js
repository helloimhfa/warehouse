const ArticleModel = require("../database/Article");

const getAllArticles = () => {
    return ArticleModel.getAllArticles();
}
const getArticleById = (productId) => {
    return;
}
const createArticle = () => {
    return;
}
const updateArticle = () => {
    return;
}
const deleteArticle = () => {
    return;
}

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
}