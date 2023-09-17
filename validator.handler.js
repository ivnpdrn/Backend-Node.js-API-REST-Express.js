

// no es un validador del tipo error, por eso no tiene el parametro "err"
// necesitamos configurar un MIDDLEWARES que sea dinamico
// debidoa que nonos interesa recibir, o no vamos a recibir, el REQ, el RES, y no necesitamos el NEXT
// a diferencia queremos recibir el SCHEMA que queremos validar y la propiedad
// se va a evaluar de cada REQUEST de alguna propiedad en especifico: el BODY, PARAM o QUERY
// sacar del REQUEST esa informacion y entonces aplicar un SCHEMA
// vamos a RETURN una FUNCION que tenga el FORMATO de una MIDDLEWARE
// se comporta como el creador de un MIDDLEWARE pero hecho de una forma dinamica
// va a retornar un MIDDLEWARE, creandolo en forma dinamica\
// usando la propiedad de CLOSURE de JavaScript
// la informacion dentro de un REQUEST puede venir en varios lugares
// depende de si es un POST, es un GET
// si es un POST la informacion vendria del BODY
// si es un GET vendria de un PARAMS
// o puede venir de un QUERY
// * CLOSURE: funcion que retorna una funcion, en este caso creamos un MIDDELWARE en forma dinamica

const boom = require('@hapi/boom');

function validatorHandler(schema, property) {    
  return (req, res, next) => {                // creando un MIDDLEWARE para que se construya en forma automatica,
                                              // usando la propiedad de CLOSURE

    const data = req[property];  // sabemos de donde sacar la informacion del REQUEST 

    // la informacion desde el lado de un REQUEST puede venir dependiendo de si es un POST, o un GET
    // si es un POST la informacion vendria en un BODY: req.body
    // si es un GET la informacion vendria en un PARAMS: req.params
    // la informacion en un GET tambien podria veneir en un QUERY: req.query

    const { error } = schema.validate(data, {abortEarly: false});  // esta, nos va a devolver un error como una propiedad
    if (error) {                              // si hay un error porque no cumple con la validacion
      next(boom.badRequest(error));           // bad REQUEST, porque se hizo en forma incorrecta,
                                              // ve al MIDDLEWARE que procesa
    }
    next();
  }
}

module.exports = validatorHandler;




