const express = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);

  app.use('/products', productsRouter);
  app.use('/categories', categoriesRouter);
  app.use('/users', usersRouter);

  //forma valida pero no practica
  //  app.use('/api/v1/products', productsRouter);
  //  app.use('/api/v1/categories', categoriesRouter);
  //  app.use('/api/v1/users', usersRouter);

}

module.exports = routerApi;

