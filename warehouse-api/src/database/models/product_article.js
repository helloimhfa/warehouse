module.exports = (sequelize, Sequelize, DataTypes) => {
    const Product_Article = sequelize.define("product_article", {
        articleCount: {
            type: Sequelize.INTEGER
        }
    });

    return Product_Article;
};