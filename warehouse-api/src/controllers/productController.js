const productService = require("../services/productService");

const getAllProducts = async (req, res) => {
    try {
        const allProducts = await productService.getAllProducts();
        const httpResponseCode = (allArticles.length > 0) ? 200 : 204;
        res.status(httpResponseCode).send({
            status: "OK",
            data: allProducts,
        });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error },
        });
    }

}

const getProductById = async (req, res) => {
    const {
        params: { productId }
    } = req;

    if (!productId) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "No product ID was specified" },
        });
    }

    try {
        const requestedProduct = await productService.getProductById(productId);
        res.status(200).send({
            status: "OK",
            data: requestedProduct,
        });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error },
        });
    }

}

const createProduct = async (req, res) => {
    const { body } = req;
    if (
        !body.name ||
        !body.description ||
        !body.price ||
        body.price === 0 ||
        !body.articles ||
        body.articles.length === 0 ||
        body.articles.some(article => !article.id || !article.amount || Number(article.amount) < 1)
    ) {
        res.status(400).send({
            status: "FAILED",
            data: { error: "Parameter/s 'name', 'description' 'price' or 'articles' missing or empty in request body" },
        });
        return;
    }

    const newProductDetails = {
        product: {
            name: body.name,
            description: body.description,
            price: body.price,
        },
        articles: body.articles,
    }

    try {
        const createdProduct = await productService.createProduct(newProductDetails);
        res.status(201).send({
            status: "OK",
            data: createdProduct,
        });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error },
        });
    }

}

const updateProduct = async (req, res) => {
    res.send(`Update product with id ${req.params.productId}`);
}

const deleteProduct = async (req, res) => {
    res.send(`Delete product with id ${req.params.productId}`);
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}