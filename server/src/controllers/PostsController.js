const { Post, User, Category } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const posts = await Post.findAll({
        include: [
          { model: User, as: 'User' },
          { model: Category, as: 'Category' },
        ],
      });
      res.send(posts);
    } catch (error) {
      res.status(400).send({
        error,
      });
    }
  },
  async post(req, res) {
    try {
      const post = await Post.create(req.body);

      res.send(post);
    } catch (error) {
      res.status(400).send({
        error,
      });
    }
  },
  async show(req, res) {
    try {
      const post = await Post.findOne({
        where: { slug: req.params.slug },
        include: [
          { model: User, as: 'User' },
          { model: Category, as: 'Category' },
        ],
      });
      res.send(post);
    } catch (error) {
      res.status(400).send({
        error,
      });
    }
  },
};
