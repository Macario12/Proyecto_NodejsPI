var Publicacion = require('../modelos/comentario')

function mostrarPublicacion(req, res) {
    var idpublicacion = req.params.id
    Publicacion.findById(idpublicacion, (err, publicacion) => {
        if (err) return res.status(500).send()
        return res.status(200).send({ publicacion })
    })
}

function mostrarPublicaciones(req, res) {
    Publicacion.find((err, publicacion) => {
        if (err) return res.status(500).send()
        return res.status(200).send({ publicacion })
    })
}

function crearPublicacion(req, res) {
    var publicacion = Publicacion()
    var params = req.body

    if (params.idPublicacion && params.mensaje && params.carnet && params.fecha && params.cursoCatedratico && params.codigoCurso && params.noCatedratico && params.tipo) {
        publicacion.idPublicacion = params.idPublicacion
        publicacion.mensaje = params.mensaje
        publicacion.carnet = params.carnet
        publicacion.fecha = params.fecha
        publicacion.cursoCatedratico = params.cursoCatedratico
        publicacion.codigoCurso = params.codigoCurso
        publicacion.noCatedratico = params.noCatedratico
        publicacion.tipo = params.tipo

        Publicacion.find({
            $or: [{ idPublicacion: publicacion.idPublicacion }

            ]
        }).exec((err, course) => {

            if (err) return res.status(500).send({ message: 'error peticion ' })

            publicacion.save((err, comentarioStored) => {
                if (err) return res.status(500).send({ message: 'error al almacenar' })
                if (comentarioStored) {
                    return res.status(200).send({ publicacion: comentarioStored })
                } else {
                    return res.status(404).send({ message: 'curso no almacenado' })
                }
            })
        })
    } else {
        res.status(500).send({ message: 'Debe de completar todos los campos' })
    }
}

function actualizarPublicacion(req, res) {
    var idPublicacion = req.params.id
    var actualizar = req.body

    Publicacion.find({
        $or: [
            { idPublicacion: actualizar.idPublicacion }
        ]
    }).exec((err, publicaciones) => {
        var cursoInsert = false

        publicaciones.forEach((comentario) => {
            if (comentario && comentario._id != idPublicacion) cursoInsert = true
        })

        if (cursoInsert) return res.status(404).send({ message: 'Los datos estan ya en uso' })

        Publicacion.findByIdAndUpdate(idPublicacion, actualizar, { new: true }, (err, comentarioActualizar) => {
            if (err) return res.status(500).send({ message: 'error a la peticion' })

            if (!comentarioActualizar) return res.status(404).send({ message: 'no se ha podido realizar los cambios' })

            return res.status(200).send({ publicacion: comentarioActualizar })
        })
    })
}

function EliminarPublicacion(req, res) {
    var id = req.params.id
    Publicacion.remove({ _id: id }).exec().then(result => {
        res.status(200).json({ message: 'Usuario Eliminado' })
    }).catch(err => {
        res.status(500).json({ error: err })
    })
}

module.exports = {
    mostrarPublicacion,
    mostrarPublicaciones,
    crearPublicacion,
    actualizarPublicacion,
    EliminarPublicacion
}
