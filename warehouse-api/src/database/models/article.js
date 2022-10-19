module.exports = (sequelize, Sequelize, DataTypes) => {
  const Article = sequelize.define("article", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      
    },
    name: {
      type: Sequelize.STRING
    },
    stock: {
      type: Sequelize.INTEGER
    }
  });

  return Article;
};