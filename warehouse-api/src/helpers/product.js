const addStockDetails = (productsData) => {
    return productsData.map(product => {
        const availabilityByArticle = product.articles.map(articleInfo => {
            return getAvailabilityByArticle(articleInfo.stock, articleInfo.product_article.amount);
        });

        const currentProductStock = getMaximumAvailableProducts(availabilityByArticle);
        const productStatus = getProductStatus(currentProductStock);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
            stock: currentProductStock,
            status: productStatus,
        }
    });
}

const getAvailabilityByArticle = (available, required) => {
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

    if (availabilities.some(availability => availability === 0)) {
        return 0;
    }

    return Math.max(...availabilities);
}

const getProductStatus = (stockNumber) => {
    const productStatus = {
        key: "U",
        text: "Unknown",
    }
    if (stockNumber > 4) {
        productStatus.key = "I";
        productStatus.text = "In stock";
    } else if (stockNumber > 0) {
        productStatus.key = "L";
        productStatus.text = "Last units";
    } else if (stockNumber === 0) {
        productStatus.key = "S";
        productStatus.text = "Sold out";
    }
    
    return productStatus;
}

const ProductHelpers = {
    addStockDetails: addStockDetails,
    getAvailabilityByArticle: getAvailabilityByArticle,
    getMaximumAvailableProducts: getMaximumAvailableProducts,
}

module.exports = ProductHelpers;