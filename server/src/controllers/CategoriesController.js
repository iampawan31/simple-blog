const { Category } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const categories = await Category.findAll();
      res.send(categories);
    } catch (error) {
      res.status(400).send({
        error,
      });
    }
  },
  async post(req, res) {
    try {
      const category = await Category.create(req.body);
      res.send(category);
    } catch (error) {
      res.status(400).send({
        error,
      });
    }
  },
};
