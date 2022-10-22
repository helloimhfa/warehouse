const express = require("express");
const articleRouter = express.Router();
const articleController = require("../controllers/articleController");

/**
 * @openapi
 * /api/articles:
 *   get:
 *     tags:
 *       - Articles
 *     summary: Retrieve all articles
 *     responses:
 *       200:
 *         description: Request processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Article"
 *       204:
 *         description: Request processed successfully with no results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   maxItems: 0   
 *                   items:
 *                     $ref: "#/components/schemas/Article"                  
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 *   post:
 *     tags:
 *       - Articles
 *     summary: Create a new article
 *     requestBody:
 *       description: Article object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Request processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *                     name:
 *                       type: string
 *                       example: Screw
 *                     stock:
 *                       type: integer
 *                       example: 12
 *                     createdAt:
 *                       type: string
 *                       example: 4/20/2022, 2:21:56 PM
 *                     updatedAt:
 *                       type: string
 *                       example: 4/20/2022, 2:21:56 PM
*       400:
 *         description: Invalid params
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Parameter/s 'name' or 'stock' missing or empty in request body"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 * /api/articles/{id}:
 *   get:
 *     tags:
 *       - Articles
 *     summary: Retrieve an article given its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           title: Article ID
 *           type: string
 *         description: The id of the article to retrieve
 *     responses:
 *       200:
 *         description: Request processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Article"
*       400:
 *         description: Invalid params
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "No article id was specified"
 *       404:
 *         description: Article id not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "No article with id 'XXXX' was found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 *   patch:
 *     tags:
 *       - Articles
 *     summary: Modify an existing article
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           title: Article ID
 *           type: string
 *         description: The id of the article to modify
 *     requestBody:
 *       description: Object with fields to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fields:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   stock:
 *                     type: integer
 *     responses:
 *       200:
 *         description: Request processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: string
 *                   example: Article XXXXX updated successfully
 *       400:
 *         description: Invalid params
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Error message with details about wrong or missing params"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Some error message"
 *       501:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Article XXXX update failed"
 */
articleRouter
    .get("/", articleController.getAllArticles)
    .get("/:articleId", articleController.getArticleById)
    .post("/", articleController.createArticle)
    // .patch("/", articleController.updateProductSaleArticles)
    .patch("/:articleId", articleController.updateArticle)
    .delete("/:articleId", articleController.deleteArticle)

module.exports = articleRouter;