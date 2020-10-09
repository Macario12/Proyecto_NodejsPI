var mongoose = require('mongoose');

var Schema = mongoose.schema;

var usuarioesquema = Schema ({

    carnet: Number,
    nombre: String,
    apellidos: Number,
    contraseña: String,
    correo: String

});

module.exports = mongoose.model('Usuario', usuarioesquema);