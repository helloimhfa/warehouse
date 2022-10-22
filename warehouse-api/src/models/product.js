module.exports = (sequelize, Sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,      
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,      
    },
    description: {
      type: Sequelize.STRING,
      defaultValue: "Product description",
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,      
    }
  });

  return Product;
};