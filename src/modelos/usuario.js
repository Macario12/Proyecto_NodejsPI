var mongoose = require('mongoose');

var esquema = mongoose.Schema;

var usuarioesquema = esquema ({

    carnet: String,
    nombre: String,
    apellidos: String,
    contraseña: String,
    correo: String

});

module.exports = mongoose.model('usuario', usuarioesquema);