var express = require('express')
var controlador = require('../controladores/controladorCursoAprobados')
let api = express.Router()

api.post('/crearCursoAprobado', controlador.crearCursoAProbado)

api.get('/mostrarCursoAprobado/:id', controlador.mostrarCursoAprobado)
api.get('/mostrarCursosAprobados/', controlador.mostrarCursosAprobados)

api.put('/actualizarCursoAprobado/:id', controlador.actualizarCursoAprobado)

api.delete('/eliminarCursoAprobado/:id', controlador.EliminarCursoAprobado)

module.exports=api