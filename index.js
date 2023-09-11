const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());  // agregado para poder recibir informacion tipo json a traves del post, en este caso de Insomnia

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy una nueva ruta o endpont');
});

routerApi(app);

 
app.listen(port, () => {
  console.log('Mi port ' + port);
});
