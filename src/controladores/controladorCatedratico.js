var Catedratico = require('../modelos/catedratico')

function mostrarcatedratico(req, res) {
    var idCatedratico = req.params.id
    Catedratico.findById(idCatedratico, (err, catedratico) => {
        if (err) return res.status(500).send()
        return res.status(200).send({ catedratico })
    })
}

function mostrarcatedraticos(req, res) {
    Catedratico.find((err, catedratico) => {
        if (err) return res.status(500).send()
        return res.status(200).send({ catedratico })
    })
}

function crearCatedratico(req, res) {
    var catedratico = Catedratico()
    var params = req.body

    if (params.idCatedratico && params.nombres && params.apellidos) {
        catedratico.idCatedratico = params.idCatedratico
        catedratico.nombres = params.nombres
        catedratico.apellidos = params.apellidos

        Catedratico.find({
            $or: [{ idCatedratico: catedratico.idCatedratico }

            ]
        }).exec((err, course) => {

            if (err) return res.status(500).send({ message: 'error peticion ' })

            catedratico.save((err, catedraticoStored) => {
                if (err) return res.status(500).send({ message: 'error al almacenar' })
                if (catedraticoStored) {
                    return res.status(200).send({ catedratico: catedraticoStored })
                } else {
                    return res.status(404).send({ message: 'curso no almacenado' })
                }
            })
        })
    } else {
        res.status(500).send({ message: 'Debe de completar todos los campos' })
    }
}

function actualizarCatedratico(req, res) {
    var idCatedratico = req.params.id
    var actualizar = req.body

    Catedratico.find({
        $or: [
            { idCatedratico: actualizar.idCatedratico }
        ]
    }).exec((err, catedraticos) => {
        var cursoInsert = false

        catedraticos.forEach((catedratico) => {
            if (catedratico && catedratico._id != idCatedratico) cursoInsert = true
        })

        if (cursoInsert) return res.status(404).send({ message: 'Los datos estan ya en uso' })

        Catedratico.findByIdAndUpdate(idCatedratico, actualizar, { new: true }, (err, catedraticoActualizar) => {
            if (err) return res.status(500).send({ message: 'error a la peticion' })

            if (!catedraticoActualizar) return res.status(404).send({ message: 'no se ha podido realizar los cambios' })

            return res.status(200).send({ catedratico: catedraticoActualizar })
        })
    })
}

function EliminarCatedratico(req, res) {
    var id = req.params.id
    Catedratico.remove({ _id: id }).exec().then(result => {
        res.status(200).json({ message: 'Usuario Eliminado' })
    }).catch(err => {
        res.status(500).json({ error: err })
    })
}

module.exports = {
    mostrarcatedratico,
    mostrarcatedraticos,
    crearCatedratico,
    actualizarCatedratico,
    EliminarCatedratico
}
