var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var Esquemacatedratico = Schema({
    idCatedratico: Number,
    nombres: String,
    apellidos: String
})

module.exports = mongoose.model('catedratico', Esquemacatedratico)
