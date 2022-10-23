const ProductHelpers = {
    getMaximumStockForArticle: (available, required) => {
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
    },
    getMaximumAvailableProducts: (availabilities) => {
        if (!Array.isArray(availabilities) || availabilities.length === 0) {
            return null;
        }
        return Math.max(...availabilities);
    },

}

export default ProductHelpers;