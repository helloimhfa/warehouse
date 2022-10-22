const articlesServices = require("../services/articleService");

const getAllArticles = async (req, res) => {
    try {
        const allArticlesResponse = await articlesServices.getAllArticles();
        
        res.status(allArticlesResponse.code).send({
            status: "OK",
            data: allArticlesResponse.data,
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
            data: { error: "No article id was specified" },
        });
    }

    try {
        const requestedArticle = await articlesServices.getArticleById(articleId);
        res.status(200).send({
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

    try {
        const createdArticle = await articlesServices.createArticle(body.name, body.stock);
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

// TODO: call to update on cascade each article stock based on the product sold (req.body.productId)
const updateProductSaleArticles = async (req, res) => {
    return;
}

const updateArticle = async (req, res) => {
    const {
        params: { articleId }
    } = req;

    const {
        body: { fields }
    } = req;

    if (!articleId) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "No article ID was specified" },
        });
    }

    if (!fields) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "No fields where specified" },
        });
    }

    try {
        const updatedArticle = await articlesServices.updateArticle(articleId, fields);
        res.status(200).send({
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
    // updateProductSaleArticles,
    deleteArticle,
}