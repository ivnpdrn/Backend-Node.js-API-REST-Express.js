const express = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');


function routerApi(app) {
  const router = express.Router(); // nos traemos el Router de express

  app.use('/api/v1',router); // definimos un endpoint en especifico y global
    
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);

  //forma valida pero no practica
  //  app.use('/api/v1/products', productsRouter);
  //  app.use('/api/v1/categories', categoriesRouter);
  //  app.use('/api/v1/users', usersRouter);

}

module.exports = routerApi;

