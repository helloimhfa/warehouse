module.exports = (sequelize, Sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.FLOAT
    }
  });

  return Product;
};