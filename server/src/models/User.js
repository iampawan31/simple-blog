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

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
