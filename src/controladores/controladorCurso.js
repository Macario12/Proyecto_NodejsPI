var Curso = require('../modelos/curso')

function mostrarcurso(req, res){
    var idCurso = req.params.id
    Curso.findById(idCurso,(err,curso)=>{
        if(err) return res.status(500).send()
        return res.status(200).send({curso})
    })
}

function mostrarcursos(req,res){
    Curso.find((err,cursos)=>{
        if(err) return res.status(500).send()
        return res.status(200).send({cursos})
    })
}

function crearCurso(req,res){
    var curso = Curso()
    var params = req.body

    if(params.codigoCurso && params.nombre){
        curso.codigoCurso = params.codigoCurso
        curso.nombre = params.nombre

        Curso.find({$or: [{nombre: curso.nombre.toLowerCase()}
        
        ]}).exec((err,course)=>{

            if(err) return res.status(500).send({message: 'error peticion '})

            curso.save((err,cursoStored)=>{
                if(err) return res.status(500).send({message: 'error al alacenar'})
                if(cursoStored){
                    return res.status(200).send({curso: cursoStored})
                }else{
                    return res.status(404).send({message: 'curso no almacenado'})
                }
            })
        })
    }else{
        res.status(500).send({message: 'Debe de completar todos los campos'})
    }
}

function actualizarCurso(req, res){
    var idCurso = req.params.id
    var actualizar = req.body

    Curso.find({$or: [
        {nombre: actualizar.nombre}
    ]}).exec((err,cursos)=>{
        var cursoInsert = false

        cursos.forEach((curso)=>{
            if(curso && curso._id != idCurso) cursoInsert = true
        })

        if(cursoInsert) return res.status(404).send({message: 'Los datos estan ya en uso'})

        Curso.findByIdAndUpdate(idCurso,actualizar,{new: true},(err, cursoActualizar)=>{
            if(err) return res.status(500).send({message:'error a la peticion'})

            if(!cursoActualizar) return res.status(404).send({message:'no se ha podido realizar los cambios'})

            return res.status(200).send({curso: cursoActualizar})
        })
    })
}

function EliminarCurso(req, res){
    var id = req.params.id
    Curso.remove({_id:id}).exec().then(result =>{
        res.status(200).json({message: 'Usuario Eliminado'})
    }).catch(err =>{
        res.status(500).json({error:err})
    })
}

module.exports = {
    mostrarcurso,
    mostrarcursos,
    crearCurso,
    EliminarCurso,
    actualizarCurso
}
