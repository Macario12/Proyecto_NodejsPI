var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EsquemaPensum = Schema({

    idCursoPensum: Number,
    creditos: Number,
    semestre: Number,
    codigoCurso: { type: Schema.ObjectId, ref: "curso"}
})

module.exports = mongoose.model('pensumSistemas', EsquemaPensum)