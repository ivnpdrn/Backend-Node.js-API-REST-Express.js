const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy una nueva ruta o endpont');
});

app.get('/products', (req, res) => {
  res.json([
    {
      name: 'Product1',
      price: 1000
     },
    {
      name: 'Product2',
      price: 2000
    }
  ]);
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Product 2',
    price: 2000
  });
})
 
    
app.listen(port, () => {
  console.log('Mi port' + port);
});
