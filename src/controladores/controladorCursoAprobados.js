var Cursosaprobados = require('../modelos/CursosAprobados')

function mostrarCursoAprobado(req,res){
    var idCurso = req.params.id
    Cursosaprobados.findById(idCurso,(err,curso)=>{
        if(err) return res.status(500).send()
        return res.status(200).send({curso})
    })
} 

function mostrarCursosAprobados(req,res){
    Cursosaprobados.find((err,cursos)=>{
        if(err) return res.status(500).send()
        return res.status(200).send({cursos})
    })
}

function crearCursoAProbado(req,res){
    var curso = Cursosaprobados()
    var params = req.body

    if(params.carnet && params.curso && params.notaAprobada){
        curso.carnet = params.carnet
        curso.curso = params.curso
        curso.notaAprobada = params.notaAprobada

        Cursosaprobados.find({$or: [{carnet: curso.carnet}
        
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

function actualizarCursoAprobado(req,res){
    var idCurso = req.params.id
    var actualizar = req.body

    Cursosaprobados.find({$or: [
        {notaAprobada: actualizar.notaAprobada}
    ]}).exec((err,cursos)=>{
        var cursoInsert = false

        cursos.forEach((curso)=>{
            if(curso && curso._id != idCurso) cursoInsert = true
        })

        if(cursoInsert) return res.status(404).send({message: 'Los datos estan ya en uso'})

        Cursosaprobados.findByIdAndUpdate(idCurso,actualizar,{new: true},(err, cursoActualizar)=>{
            if(err) return res.status(500).send({message:'error a la peticion'})

            if(!cursoActualizar) return res.status(404).send({message:'no se ha podido realizar los cambios'})

            return res.status(200).send({curso: cursoActualizar})
        })
    })
}

function EliminarCursoAprobado(req, res){
    var id = req.params.id
    Cursosaprobados.remove({_id:id}).exec().then(result =>{
        res.status(200).json({message: 'Usuario Eliminado'})
    }).catch(err =>{
        res.status(500).json({error:err})
    })
}

module.exports = {
    mostrarCursoAprobado,
    mostrarCursosAprobados,
    crearCursoAProbado,
    actualizarCursoAprobado,
    EliminarCursoAprobado

}