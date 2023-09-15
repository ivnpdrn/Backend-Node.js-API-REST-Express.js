const express = require('express');
const routerApi = require('./routes');

const { logErrors, errorHandler } = require('./middlewares/error.handler');

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

app.use(logErrors);            // en el orden que los coloquemos en estas lineas, los middlewares
                               // en este mismo orden se ejecutara. Comportamiento de forma secuencial.
                               // WARNING: el primer MIDDLEWARE en la secuencia debe tener un NEXT para que pase
                               // al siguiente
app.use(errorHandler);

 
app.listen(port, () => {
  console.log('Mi port ' + port);
});
