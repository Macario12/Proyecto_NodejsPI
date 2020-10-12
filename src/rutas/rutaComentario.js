var express = require('express')
var controlador = require('../controladores/controladorComentario')
let api = express.Router()

api.post('/crearComentario', controlador.crearComentario)

api.put('/actualizarComentario/:id', controlador.actualizarComentario)

api.delete('/EliminarComentario/:id', controlador.EliminarComentario)

api.get('/mostrarComentario/:id', controlador.mostrarComentario)
api.get('/mostrarComentarios', controlador.mostrarComentarios)

module.exports = api
