const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
};

// // // const Article = sequelize.define("article", {
// // //   name: {
// // //     type: Sequelize.STRING
// // //   },
// // //   stock: {
// // //     type: Sequelize.INTEGER
// // //   }
// // // });

// // // const Product = sequelize.define("product", {
// // //   name: {
// // //     type: Sequelize.STRING
// // //   },
// // //   description: {
// // //     type: Sequelize.STRING
// // //   },
// // //   price: {
// // //     type: Sequelize.FLOAT
// // //   }
// // // });

// // // const Product_Article = sequelize.define("product_article", {
// // //   articleCount: {
// // //     type: Sequelize.INTEGER
// // //   }
// // // });

// // // Article.belongsToMany(Product, { through: Product_Article });
// // // Product.belongsToMany(Article, { through: Product_Article });

// // // db.articles = Article;
// // // db.products = Product;
// // // db.product_articles = Product_Article;

db.articles = require("./article")(sequelize, Sequelize, DataTypes);
db.products = require("./product")(sequelize, Sequelize);
db.product_articles = require("./product_article")(sequelize, Sequelize);

db.articles.belongsToMany(db.products, {
  through: db.product_articles,
});

db.products.belongsToMany(db.articles, {
  through: db.product_articles,
});

module.exports = db;