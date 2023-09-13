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
  res.status(201).json({            // added status
    message: 'created',
    data: body
  });
});

// preparando PATCH para Insomnia, para el PUT se debe enviar todos los parametros
// al PUT se debe enviar todos los parametros

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id
  });
});

// preparando el DELETE, no va a tener un cuerpo porque solo tiene la instruccion de eliminar

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'deleted',
    id,
  });
});


module.exports = router;
