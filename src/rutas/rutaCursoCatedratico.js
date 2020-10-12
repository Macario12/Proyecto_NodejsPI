var express = require('express')
var controlador = require('../controladores/controladorCursoCatedratico')
let api = express.Router()

api.post('/crearCursoCatedratico', controlador.crearCursoCatedratico)

api.put('/actualizarCursoCatedratico/:id', controlador.actualizarCursoCatedratico)

api.delete('/EliminarCursoCatedratico/:id', controlador.EliminarCursoCatedratico)

api.get('/mostrarCursoCatedratico/:id', controlador.mostrarCursoCatedratico)
api.get('/mostrarCursoCatedraticos', controlador.mostrarCursoCatedraticos)

module.exports = api
