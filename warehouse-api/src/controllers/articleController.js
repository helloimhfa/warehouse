const getAllArticles = (req, res) => {
    res.send(`Get all supplies`);
}

const getArticleById = (req, res) => {
    res.send(`Get article with id ${req.params.articleId}`);
}

const createArticle = (req, res) => {
    res.send(`Create new article`);
}

const updateArticle = (req, res) => {
    res.send(`Update article with id ${req.params.articleId}`);
}

const deleteArticle = (req, res) => {
    res.send(`Delete article with id ${req.params.articleId}`);
}

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
}