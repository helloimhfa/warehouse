const dbConfig = require("./db.config.js");
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  logging: false,
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

db.Article = require("./article")(sequelize, Sequelize, DataTypes);
db.Product = require("./product")(sequelize, Sequelize, DataTypes);
db.ProductArticle = require("./product_article")(sequelize, Sequelize, DataTypes);
db.LockedArticle = require("./locked_article")(sequelize, Sequelize, DataTypes);

db.Article.belongsToMany(db.Product, {
  through: db.ProductArticle,
});

db.Product.belongsToMany(db.Article, {
  through: db.ProductArticle,
});

db.Article.hasOne(db.LockedArticle, {
  foreignKey: 'articleId',
});

db.LockedArticle.belongsTo(db.Article);

module.exports = db;