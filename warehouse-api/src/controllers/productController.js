const productService = require("../services/productService");

const getAllProducts = async (req, res) => {
    try {
        const response = await productService.getAllProducts();
        res.status(response.code).send({
            status: "OK",
            data: response.data,
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

    try {
        const createdProduct = await productService.createProduct(body.name, body.description, body.price, body.articles);
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

const sellProduct = async (req, res) => {
    res.send(`Selling a product with id ${req.params.productId}`);
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    sellProduct,
}