var Comentario = require('../modelos/comentario')

function mostrarComentario(req, res) {
    var idcomentario = req.params.id
    Comentario.findById(idcomentario, (err, comentario) => {
        if (err) return res.status(500).send()
        return res.status(200).send({ comentario })
    })
}

function mostrarComentarios(req, res) {
    Comentario.find((err, comentario) => {
        if (err) return res.status(500).send()
        return res.status(200).send({ comentario })
    })
}

function crearComentario(req, res) {
    var comentario = Comentario()
    var params = req.body

    if (params.idComentario && params.mensaje && params.idPublicacion && params.idUsuario) {
        comentario.idComentario = params.idComentario
        comentario.mensaje = params.mensaje
        comentario.idPublicacion = params.idPublicacion
        comentario.idUsuario = params.idUsuario

        Comentario.find({
            $or: [{ idComentario: comentario.idComentario }

            ]
        }).exec((err, course) => {

            if (err) return res.status(500).send({ message: 'error peticion ' })

            comentario.save((err, comentarioStored) => {
                if (err) return res.status(500).send({ message: 'error al almacenar' })
                if (comentarioStored) {
                    return res.status(200).send({ comentario: comentarioStored })
                } else {
                    return res.status(404).send({ message: 'curso no almacenado' })
                }
            })
        })
    } else {
        res.status(500).send({ message: 'Debe de completar todos los campos' })
    }
}

function actualizarComentario(req, res) {
    var idComentario = req.params.id
    var actualizar = req.body

    Comentario.find({
        $or: [
            { idComentario: actualizar.idComentario }
        ]
    }).exec((err, comentarios) => {
        var cursoInsert = false

        comentarios.forEach((comentario) => {
            if (comentario && comentario._id != idComentario) cursoInsert = true
        })

        if (cursoInsert) return res.status(404).send({ message: 'Los datos estan ya en uso' })

        Comentario.findByIdAndUpdate(idComentario, actualizar, { new: true }, (err, comentarioActualizar) => {
            if (err) return res.status(500).send({ message: 'error a la peticion' })

            if (!comentarioActualizar) return res.status(404).send({ message: 'no se ha podido realizar los cambios' })

            return res.status(200).send({ comentario: comentarioActualizar })
        })
    })
}

function EliminarComentario(req, res) {
    var id = req.params.id
    Comentario.remove({ _id: id }).exec().then(result => {
        res.status(200).json({ message: 'Usuario Eliminado' })
    }).catch(err => {
        res.status(500).json({ error: err })
    })
}

module.exports = {
    mostrarComentario,
    mostrarComentarios,
    crearComentario,
    actualizarComentario,
    EliminarComentario
}
