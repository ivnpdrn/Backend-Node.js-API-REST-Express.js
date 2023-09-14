const express = require('express');

const ProductsService = require('./../services/product.service');

const router = express.Router();
const service = new ProductsService();

router.get('/', (req, res) => {
  const products = service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = service.findOne(id);
  res.json(product);
});

// preparando POST para Insomnia

router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct);
 });

// preparando PATCH para Insomnia, para el PUT se debe enviar todos los parametros
// al PUT se debe enviar todos los parametros

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body);
  res.json(product);
 });

// preparando el DELETE, no va a tener un cuerpo porque solo tiene la instruccion de eliminar

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const rta = service.delete(id);
  res.json(rta);
});


module.exports = router;
