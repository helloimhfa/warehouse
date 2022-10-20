const articlesServices = require("../services/articleService");

const getAllArticles = async (req, res) => {
    try {
        const allArticles = await articlesServices.getAllArticles();
        res.status(201).send({
            status: "OK",
            data: allArticles,
        });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error },
        });
    }
}

const getArticleById = async (req, res) => {
    const {
        params: { articleId }
    } = req;

    if (!articleId) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "No article ID was specified" },
        });
    }

    try {
        const requestedArticle = await articlesServices.getArticleById(articleId);
        res.status(201).send({
            status: "OK",
            data: requestedArticle,
        });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error },
        });
    }
}

const createArticle = async (req, res) => {
    const { body } = req;

    if (!body.name || !body.stock) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Parameter/s 'name' or 'stock' missing or empty in request body" },
        });
    }

    const newArticle = {
        name: body.name,
        stock: body.stock,
    }

    try {
        const createdArticle = await articlesServices.createArticle(newArticle);
        res.status(201).send({
            status: "OK",
            data: createdArticle,
        });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error },
        });
    }
}

const updateArticle = async (req, res) => {
    const {
        params: { articleId }
    } = req;

    const {
        body: { updatedFields }
    } = req;

    if (!articleId) {
        res.status(401).send({
            status: "FAILED",
            data: { error: "No article ID was specified" },
        });
    }

    if (!updatedFields) {
        res.status(402).send({
            status: "FAILED",
            data: { error: "No fields where specified" },
        });
    }

    try {
        const updatedArticle = await articlesServices.updateArticle(articleId, updatedFields);
        res.status(201).send({
            status: "OK",
            data: updatedArticle,
        });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error },
        });
    }
}

const deleteArticle = async (req, res) => {
    res.send(`Delete article with id ${req.params.articleId}`);
}

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
}