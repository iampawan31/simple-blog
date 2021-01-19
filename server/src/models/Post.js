module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
    imageUrl: DataTypes.STRING,
    content: DataTypes.TEXT,
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  });

  Post.associate = function (models) {
    Post.belongsTo(models.Category, {
      as: 'Category',
      foreignKey: 'categoryId',
    });
    Post.belongsTo(models.User, { as: 'User', foreignKey: 'userId' });
  };

  return Post;
};
