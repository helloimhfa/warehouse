const productService = require("../services/productService");

const getAllProducts = (req, res) => {
    const allProducts = productService.getAllProducts();
    res.send({ status: "OK", data: allProducts });
}

const getProductById = (req, res) => {
    const product = productService.getProductById(req.params.productId);
    res.send(`Get product with id ${req.params.productId}`);
}

const createProduct = (req, res) => {
    const { body } = req;
    if (
        !body.name ||
        !body.contain_articles ||
        body.contain_articles.length === 0 ||
        body.contain_articles.some(article => Number(article.amount_of) < 1)
    ) {
        console.log(body)
        return null;
    }

    const newProduct = {
        name: body.name,
        contain_articles: body.contain_articles,
    }

    const createdProduct = productService.createProduct(newProduct);
    res.status(201).send({ status: "OK", data: createdProduct});
}

const updateProduct = (req, res) => {
    const updatedProduct = productService.updateProduct(req.params.productId, req.body);
    res.send(`Update product with id ${req.params.productId}`);
}

const deleteProduct = (req, res) => {
    productService.deleteProduct(req.params.productId);
    res.send(`Delete product with id ${req.params.productId}`);
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
}