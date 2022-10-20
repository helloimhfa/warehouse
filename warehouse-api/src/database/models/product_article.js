module.exports = (sequelize, Sequelize, DataTypes) => {
    const Product_Article = sequelize.define("product_article", {
        amount: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    });

    
    return Product_Article;
};