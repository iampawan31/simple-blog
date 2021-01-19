module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      required: true,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      required: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  Category.associate = function (models) {
    Category.hasMany(models.Post, { as: 'Posts', foreignKey: 'categoryId' });
  };

  return Category;
};
