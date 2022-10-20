module.exports = (sequelize, Sequelize, DataTypes) => {
  const Article = sequelize.define("article", {
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
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  });

  return Article;
};