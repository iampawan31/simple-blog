const Joi = require('joi');

module.exports = {
  register(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$')),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address',
          });
          break;
        case 'password':
          res.status(400).send({
            error: 'Password must be between 8 to 32 characters',
          });
          break;
        default:
          res.status(400).send({
            error: 'Invalid registration information',
          });
          break;
      }
    } else {
      next();
    }
  },
  login(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address',
          });
          break;
        default:
          res.status(400).send({
            error: 'Validation error',
          });
          break;
      }
    } else {
      next();
    }
  },
};
