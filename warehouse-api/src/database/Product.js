const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllProducts = () => {
    return DB.products;
}

const createNewProduct = (newProduct) => {
    const productNameExists = DB.products.findIndex(product => product.name === newProduct.name) > -1;

    if (productNameExists) {
        return;
    }

    DB.products.push(newProduct);
    saveToDatabase(DB);

    return DB.products;
}

module.exports = {
    getAllProducts,
    createNewProduct,
};