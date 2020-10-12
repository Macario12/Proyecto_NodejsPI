var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var Esquemapublicacion = Schema({
    idPublicacion: Number,
    mensaje: String,
    carnet: { type: Schema.ObjectId, ref: "usuario" },
    fecha: Date,
    cursoCatedratico: { type: Schema.ObjectId, ref: "cursoCatedratico" },
    codigoCurso: { type: Schema.ObjectId, ref: "curso" },
    noCatedratico: { type: Schema.ObjectId, ref: "catedratico" },
    tipo: Number
})

module.exports = mongoose.model('publicacion', Esquemapublicacion)
