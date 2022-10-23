const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");

/**
 * @openapi
 * /api/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve all products
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
 *                     $ref: "#/components/schemas/Product"
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
 *                     $ref: "#/components/schemas/Product"                  
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
 *       - Products
 *     summary: Create a new product
 *     requestBody:
 *       description: Product object with the articles it contains
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               articles:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                        id:
 *                          type: string
 *                        amount:
 *                          type: integer
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
 *                       example: Parameter/s 'name', 'description' 'price' or 'articles' missing or empty in request body
 *       404:
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
 *                       example: No article with id 'XXXX' was found
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
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Retrieve a product given its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           title: Product ID
 *           type: string
 *         description: The id of the product to retrieve
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
 *                     $ref: "#/components/schemas/Product"
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
 *                       example: "No product id was specified"
 *       404:
 *         description: Product id not found
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
 *                       example: "No product with id 'XXXX' was found"
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
 */
productRouter
    .get("/", productController.getAllProducts)
    .get("/:productId", productController.getProductById)
    .post("/", productController.createProduct)
    .post("/sale/:productId", productController.sellProduct) // TODO: to avoid creating a whole new domain and services for sales
    .patch("/:productId", productController.updateProduct)
    .delete("/:productId", productController.deleteProduct)

module.exports = productRouter;