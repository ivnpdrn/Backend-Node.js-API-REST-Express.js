function logErrors(err, req, res, next) {   
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
    stack: err.stack,                  
  });
}


function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {                                      // si es del tipo BOOM aqui queda
    const { output } = err;
    res.status(output.statusCode).json(output.payload); // si el error es tipo BOOM corre esta linea,
                      //ya modificamoscreando la respuesta al request, y aca deberia terminar,
                      // por eso hasta aca deberia llegar entonces la necesidad del ELSE. 
  } else {           // debe agregarse el ELSE si no se coloca siempre se ejecutara y dara el error:
                    //  "Cannot set headers after they are sent to the clent"
                    //  No se puede configurar el header dos veces.
    next(err);     // si no es tipo Boom, va al siguiente MIDDLEWARES
  }  
}

module.exports = { logErrors, errorHandler, boomErrorHandler }

// los middlewares deben hacerse despues que se han definido los reuters

