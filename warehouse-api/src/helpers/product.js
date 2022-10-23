
const parseWithStocks = (productsData) => {
    return productsData.map(product => {
        const maximumStocksByArticle = product.articles.map(articleInfo => {
            return getStockByArticle(articleInfo.stock, articleInfo.product_article.amount);
        });

        const currentProductStock = getMaximumAvailableProducts(maximumStocksByArticle);
        // const product

        return {
            id: product.id,
            name: product.name,
            price: product.price,
            stock: productsAvailable,
            status: getProductStockStatus(stock),
        }
    });
}

const getStockByArticle = (available, required) => {
    if (
        !Number.isInteger(required) ||
        !Number.isInteger(available) ||
        required < 1 ||
        available < 1 ||
        required > available
    ) {
        return 0;
    }
    return Math.trunc(available / required);
}

const getMaximumAvailableProducts = (availabilities) => {
    if (!Array.isArray(availabilities) || availabilities.length === 0) {
        return null;
    }
    return Math.max(...availabilities);
}

const ProductHelpers = {
    parseWithStocks: parseWithStocks,
    getStockByArticle: getStockByArticle,
    getMaximumAvailableProducts: getMaximumAvailableProducts,
}

export default ProductHelpers;