var express = require('express')
var controlador = require('../controladores/controladorPensum')
let api = express.Router()

api.get('/mostrarPensum', controlador.mostrarPensums)
api.get('/mostrarPensum/:id', controlador.mostrarPensum)

api.post('/crearPensum', controlador.crearPensum)

api.put('/actualizarPensum/:id', controlador.actualizarPensum)

api.delete('/eliminarPensum/:id', controlador.EliminarPensum)

module.exports = api