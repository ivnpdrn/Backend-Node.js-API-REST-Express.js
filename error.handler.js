function logErrors(err, req, res, next) {   // este middleware es para log errores
  console.log('logErrors');
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {    // crear un formato estandar cada vez que tengamos un error
                                                // se debe incluir el next aun cuando no
                                                // se use porque es un middleware de error 
  console.log('errorHandler'); 
  res.status(500).json({
    message: err.message,
    stack: err.stack,                  // para saber donde ocurrio el error
  });
}

module.exports = { logErrors, errorHandler }

// los middlewares deben hacerse despues que se han definido los reuters

