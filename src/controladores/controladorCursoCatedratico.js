var CursoCatedratico = require('../modelos/cursoCatedratico')

function mostrarCursoCatedratico(req, res) {
    var idcursoCatedratico = req.params.id
    CursoCatedratico.findById(idcursoCatedratico, (err, cursocatedratico) => {
        if (err) return res.status(500).send()
        return res.status(200).send({ cursocatedratico })
    })
}

function mostrarCursoCatedraticos(req, res) {
    CursoCatedratico.find((err, cursocatedratico) => {
        if (err) return res.status(500).send()
        return res.status(200).send({ cursocatedratico })
    })
}

function crearCursoCatedratico(req, res) {
    var cursocatedratico = CursoCatedratico()
    var params = req.body

    if (params.idCursoCatedratico && params.idCurso && params.idCatedratico) {
        cursocatedratico.idCursoCatedratico = params.idCursoCatedratico
        cursocatedratico.idCurso = params.idCurso
        cursocatedratico.idCatedratico = params.idCatedratico

        CursoCatedratico.find({
            $or: [{ idCursoCatedratico: cursoCatedratico.idCursoCatedratico }

            ]
        }).exec((err, course) => {

            if (err) return res.status(500).send({ message: 'error peticion ' })

            cursocatedratico.save((err, cursocatedraticoStored) => {
                if (err) return res.status(500).send({ message: 'error al almacenar' })
                if (cursocatedraticoStored) {
                    return res.status(200).send({ cursocatedratico: cursocatedraticoStored })
                } else {
                    return res.status(404).send({ message: 'curso no almacenado' })
                }
            })
        })
    } else {
        res.status(500).send({ message: 'Debe de completar todos los campos' })
    }
}

function actualizarCursoCatedratico(req, res) {
    var idCursoCatedratico = req.params.id
    var actualizar = req.body

    CursoCatedratico.find({
        $or: [
            { idCursoCatedratico: actualizar.idCursoCatedratico }
        ]
    }).exec((err, cursoCatedraticos) => {
        var cursoInsert = false

        cursoCatedraticos.forEach((cursocatedratico) => {
            if (cursocatedratico && cursocatedratico._id != idCursoCatedratico) cursoInsert = true
        })

        if (cursoInsert) return res.status(404).send({ message: 'Los datos estan ya en uso' })

        CursoCatedratico.findByIdAndUpdate(idCursoCatedratico, actualizar, { new: true }, (err, catedraticoActualizar) => {
            if (err) return res.status(500).send({ message: 'error a la peticion' })

            if (!catedraticoActualizar) return res.status(404).send({ message: 'no se ha podido realizar los cambios' })

            return res.status(200).send({ cursoCatedratico: catedraticoActualizar })
        })
    })
}

function EliminarCursoCatedratico(req, res) {
    var id = req.params.id
    CursoCatedratico.remove({ _id: id }).exec().then(result => {
        res.status(200).json({ message: 'Usuario Eliminado' })
    }).catch(err => {
        res.status(500).json({ error: err })
    })
}

module.exports = {
    mostrarCursoCatedratico,
    mostrarCursoCatedraticos,
    crearCursoCatedratico,
    actualizarCursoCatedratico,
    EliminarCursoCatedratico
}
