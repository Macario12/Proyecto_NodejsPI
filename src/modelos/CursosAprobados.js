var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var EsquemaCursoAprobado = Schema ({

    carnet: {type: Schema.ObjectId, ref:"usuario"},
    curso: {type: Schema.ObjectId, ref: "pensumSistemas"},
    notaAprobada: Number
})

module.exports = mongoose.model('cursosaprobados', EsquemaCursoAprobado)    