const express = require("express");
const articleRouter = express.Router();
const articleController = require("../controllers/articleController");

articleRouter
    .get("/", articleController.getAllArticles)
    .get("/:articleId", articleController.getArticleById)
    .post("/", articleController.createArticle)
    .patch("/:articleId", articleController.updateArticle)
    .delete("/:articleId", articleController.deleteArticle)

module.exports = articleRouter;