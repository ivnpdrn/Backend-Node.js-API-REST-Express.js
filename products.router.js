const express = require('express');

const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema} = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Yo soy un filter');
});


// uso de varios MIDDLEWARES

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),  // la informacion viene en PARAMS
                                 // MIDDLEWARE para validar la data, si todo esta bien,
                                 //  va a ir a correr el NEXT
                                 // para ir al proximo MIDDLEWARE 
  async (req, res, next) => {    // se agrega el NEXT para incorporar el MIDDLEWARE
                                 // se agrega el TRY/CATCH para incorporar el MIDDLEWARE
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {                               // detecte el ERROR entonces ejecuta los MIDDLEWARES tipo ERROR
      // que se tiene
      next(error);
    }  
  }
);

// preparando POST para Insomnia

router.post('/',
  validatorHandler(createProductSchema, 'body'),   // la INFORMACION viene en el BODY
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

// preparando PATCH para Insomnia, para el PUT se debe enviar todos los parametros
// al PUT se debe enviar todos los parametros

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),  // primer MIDDLEWARE en secuencia, primero valido el ID
  validatorHandler(updateProductSchema, 'body'), // segundo MIDDLEWARE en secuencia,
                                                 // a diferencia del CREATE que exige todos los campos
                                                 // el UPDATE procesa lo que se le vaya enviando

  async (req, res, next) => {  // because is async can use Try/Catch
    try {
      const { id } = req.params;   // toma informacion del ID a traves de PARAMS
      const body = req.body;       // toma informacion del BODY
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
     }  
 });

// preparando el DELETE, no va a tener un cuerpo porque solo tiene la instruccion de eliminar

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});


module.exports = router;
