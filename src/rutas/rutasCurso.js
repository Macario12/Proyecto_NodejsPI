var express = require('express')
var controlador = require('../controladores/controladorCurso')
let api = express.Router()

api.post('/crearCurso', controlador.crearCurso)

api.put('/actualizarCurso/:id',controlador.actualizarCurso)

api.delete('/eliminarCurso/:id', controlador.EliminarCurso)

api.get('/mostrarCurso/:id', controlador.mostrarcurso)
api.get('/mostrarCursos', controlador.mostrarcursos)

module.exports=api