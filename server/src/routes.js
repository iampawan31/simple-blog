const AuthenticationController = require('./controllers/AuthenticationController');
const CategoriesController = require('./controllers/CategoriesController');
const PostsController = require('./controllers/PostsController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');

const authenticateJWT = require('./middlewares/authentication');

module.exports = (app) => {
  app.post(
    '/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  );

  app.post(
    '/login',
    AuthenticationControllerPolicy.login,
    AuthenticationController.login
  );

  app.get('/categories', CategoriesController.index);
  app.post('/categories', CategoriesController.post);

  app.get('/posts/:slug', PostsController.show);
  app.get('/posts', PostsController.index);
  app.post('/posts', authenticateJWT, PostsController.post);
};
