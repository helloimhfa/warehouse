const articlesServices = require("../services/articleService");

const getAllArticles = (req, res) => {
    res.send(`Get all supplies`);
}

const getArticleById = (req, res) => {
    res.send(`Get article with id ${req.params.articleId}`);
}

const createArticle = async (req, res) => {
    const { body } = req;

    // TODO: controlar valores
    
    const newArticle = {
        name: body.name,
        stock: body.stock,
    }

    try {
        const createdArticle = await articlesServices.createArticle(newArticle);
        console.log(">>>>>", createdArticle);
        res.status(201).send({ status: "OK", data: createdArticle });
    } catch (error) {
        console.log("-- - - - - -", error);
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
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