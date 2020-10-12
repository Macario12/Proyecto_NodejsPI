var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var Esquemacomentario = Schema({
    idComentario: Number,
    mensaje: String,
    idPublicacion: { type: Schema.ObjectId, ref: "publicacion" },
    idUsuario: { type: Schema.ObjectId, ref: "usuario" }
})

module.exports = mongoose.model('comentario', Esquemacomentario)
