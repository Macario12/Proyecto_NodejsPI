var mongoose = require('mongoose')

var Schema = mongoose.Schema;

var Esquemacursocatedratico = Schema({
    idCursoCatedratico: Number,
    idCurso: { type: Schema.ObjectId, ref: "curso" },
    idCatedratico: { type: Schema.ObjectId, ref: "catedratico" }
})

module.exports = mongoose.model('cursoCatedratico', Esquemacursocatedratico)
