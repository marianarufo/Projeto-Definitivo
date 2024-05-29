const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Posts extends Model {
  static init(sequelize) {
    super.init(
      {
        image: Sequelize.STRING,
        description: Sequelize.STRING,
        number_likes: Sequelize.INTEGER,
        author_user_name: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'author_user_name', as: 'user' });
  }
}

module.exports = Posts;