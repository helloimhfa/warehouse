const lockedArticleService = require("../services/lockedArticleService");

const getAllLockedArticles = async (req, res) => {
    try {
        const allLocksResponse = await lockedArticleService.getAllLockedArticles();

        res.status(allLocksResponse.code).send({
            status: "OK",
            data: allLocksResponse.data,
        });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error },
        });
    }
}

const getLockedArticleById = async (req, res) => {
    const {
        params: { lockId }
    } = req;

    if (!lockId) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "No lock id was specified" },
        });
    }

    try {
        const requestedLock = await lockedArticleService.getLockedArticleById(lockId);
        res.status(200).send({
            status: "OK",
            data: requestedLock,
        });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error },
        });
    }
}

const getLockedArticleByArticleId = async (req, res) => {
    res.send(`Getting all locks with the article id ${req.params.articleId}`);
}

const createLockedArticle = async (req, res) => {
    const { body } = req;

    if (!body.articleId) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Parameter 'articleId' missing or empty in request body" },
        });
    }

    try {
        const createdLock = await lockedArticleService.createLockedArticle(body.articleId);
        res.status(201).send({
            status: "OK",
            data: createdLock,
        });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error },
        });
    }
}

// TODO: document errors for Swagger
const deleteLockedArticle = async (req, res) => {
    if (!req.params || !req.params.lockId) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Parameter 'lockId' missing or empty in request body" },
        });
    }
    try {
        const deletedLockResponse = await lockedArticleService.deleteLockedArticle(req.params.lockId);
        res.status(deletedLockResponse.code).send({
            status: "OK",
            data: deletedLockResponse.data,
        });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error },
        });
    }
}

// TODO: document errors for Swagger
const deleteLockedArticleByArticleId = async (req, res) => {
    if (!req.params || !req.params.articleId) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Parameter 'articleId' missing or empty in request body" },
        });
    }
    try {
        const deletedLocks = await lockedArticleService.deleteLockedArticleByArticleId(req.params.articleId);
        return deletedLocks;
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error },
        });
    }
}

module.exports = {
    getAllLockedArticles,
    getLockedArticleById,
    getLockedArticleByArticleId,
    createLockedArticle,
    deleteLockedArticle,
    deleteLockedArticleByArticleId,
}