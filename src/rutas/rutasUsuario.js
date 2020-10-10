var express = require('express')
var controlador = require('../controladores/controladorUsuario')
let api = express.Router()

api.post('/crearUsuario',controlador.CrearUsuario)
api.post('/login', controlador.Login)
api.get('/usuario/:id', controlador.mostrarUsuario)
api.get('/usuarios',controlador.mostrarUsuarios)

api.put('/actualizarUsuario/:id',controlador.actualizarUsuario)

api.delete('/eliminarUsuario/:id', controlador.EliminarUsuario)
module.exports = api;