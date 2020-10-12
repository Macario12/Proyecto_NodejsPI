var express = require('express')
var controlador = require('../controladores/controladorPublicacion')
let api = express.Router()

api.post('/crearPublicacion', controlador.crearPublicacion)

api.put('/actualizarPublicacion/:id', controlador.actualizarPublicacion)

api.delete('/EliminarPublicacion/:id', controlador.EliminarPublicacion)

api.get('/mostrarPublicacion/:id', controlador.mostrarPublicacion)
api.get('/mostrarPublicaciones', controlador.mostrarPublicaciones)

module.exports = api
