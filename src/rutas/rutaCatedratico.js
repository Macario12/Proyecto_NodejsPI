var express = require('express')
var controlador = require('../controladores/controladorCatedratico')
let api = express.Router()

api.post('/crearCatedratico', controlador.crearCatedratico)

api.put('/actualizarCatedratico/:id', controlador.actualizarCatedratico)

api.delete('/EliminarCatedratico/:id', controlador.EliminarCatedratico)

api.get('/mostrarcatedratico/:id', controlador.mostrarcatedratico)
api.get('/mostrarcatedraticos', controlador.mostrarcatedraticos)

module.exports = api
