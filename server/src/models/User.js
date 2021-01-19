const bcrypt = require('bcrypt');

async function hashPassword(user, options) {
  const SALT_FACTOR = 8;

  if (!user.changed('password')) {
    return null;
  }

  const hash = await bcrypt.hash(user.password, SALT_FACTOR);
  user.setDataValue('password', hash);

  return null;
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
        beforeSave: hashPassword,
      },
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Post, { as: 'Posts', foreignKey: 'userId' });
  };

  User.prototype.comparePassword = function (password) {
    const result = bcrypt.compare(this.password, password);
    console.log(37, result);
    return bcrypt.compare(this.password, password);
  };

  return User;
};
