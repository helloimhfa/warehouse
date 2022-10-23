const ProductHelpers = require('../helpers/product');

describe('getAvailabilityByArticle', () => {
    test('Returns zero if an argument is missing', () => {
        const expected = 0;
        const result = ProductHelpers.getAvailabilityByArticle(12);
        expect(result).toBe(expected);
    });

    test(`Returns zero if arguments' types are invalid 1/3`, () => {
        const expected = 0;
        const result = ProductHelpers.getAvailabilityByArticle("a", 12);
        expect(result).toBe(expected);
    });

    test(`Returns zero if arguments' types are invalid 2/3`, () => {
        const expected = 0;
        const result = ProductHelpers.getAvailabilityByArticle(6, false);
        expect(result).toBe(expected);
    });

    test('Returns zero if arguments are invalid 3/3', () => {
        const expected = 0;
        const result = ProductHelpers.getAvailabilityByArticle(6, "mdfg");
        expect(result).toBe(expected);
    });

    test('Returns zero if argument is lesser than zero 1/2', () => {
        const expected = 0;
        const result = ProductHelpers.getAvailabilityByArticle(-1, 8);
        expect(result).toBe(expected);
    });

    test('Returns zero if argument lesser than zero 2/2', () => {
        const expected = 0;
        const result = ProductHelpers.getAvailabilityByArticle(20, -5);
        expect(result).toBe(expected);
    });

    test('Returns zero if there are no available articles', () => {
        const expected = 0;
        const result = ProductHelpers.getAvailabilityByArticle(0, 90);
        expect(result).toBe(expected);
    });

    test('Returns zero if product requires zero', () => {
        const expected = 0;
        const result = ProductHelpers.getAvailabilityByArticle(13, 0);
        expect(result).toBe(expected);
    });

    test('Returns a number', () => {
        const expected = 'number';
        const result = ProductHelpers.getAvailabilityByArticle(15, 3);
        expect(expected).toBe(typeof result)
    });

    test('Returns zero if required is greater than available', () => {
        const expected = 0;
        const result = ProductHelpers.getAvailabilityByArticle(3, 5);
        expect(expected).toBe(result)
    });

    test('Returns one if required equals available', () => {
        const expected = 1;
        const result = ProductHelpers.getAvailabilityByArticle(8, 8);
        expect(expected).toBe(result)
    });

    test('Returns a number greater than zero if available is greater than required', () => {
        const expected = 5;
        const result = ProductHelpers.getAvailabilityByArticle(20, 4);
        expect(expected).toBe(result)
    });

});

describe('getMaximumAvailableProducts', () => {
    test('Returns null if argument is not an array', () => {
        const result = ProductHelpers.getMaximumAvailableProducts(12);
        expect(result).toBeNull();
    });

    test('Returns null if argument is empty', () => {
        const result = ProductHelpers.getMaximumAvailableProducts([]);
        expect(result).toBeNull();
    });

    test('Returns maximum value present in the array', () => {
        const expected = 7;
        const result = ProductHelpers.getMaximumAvailableProducts([1, 7, 3, 2]);
        expect(result).toBe(expected);
    });

    test('Returns zero if no value is greater than zero', () => {
        const expected = 0;
        const result = ProductHelpers.getMaximumAvailableProducts([0, 0, 0]);
        expect(result).toBe(expected);
    });
});


module.exports = ProductHelpers;