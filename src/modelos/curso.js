var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EsquemaCurso = Schema ({
    codigoCurso: Number,
    nombre: String
});

module.exports = mongoose.model('curso', EsquemaCurso);