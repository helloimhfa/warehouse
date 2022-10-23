module.exports = (sequelize, Sequelize, DataTypes) => {
  const Locked_Article = sequelize.define("locked_article", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    articleId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return Locked_Article;
};