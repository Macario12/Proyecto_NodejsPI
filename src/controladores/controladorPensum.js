var Pensum = require('../modelos/pensumSistemas')

function mostrarPensum(req,res){
    var idCurso = req.params.id
    Pensum.findById(idCurso,(err,curso)=>{
        if(err) return res.status(500).send()
        return res.status(200).send({curso})
    })
}
function mostrarPensums(req,res){
    Pensum.find((err,cursos)=>{
        if(err) return res.status(500).send()
        return res.status(200).send({cursos})
    })
}
function crearPensum(req,res){
    var pensum = new Pensum()
    var params = req.body

    if(params.idCursoPensum && params.creditos && params.semestre && params.codigoCurso){
        pensum.idCursoPensum = params.idCursoPensum
        pensum.creditos = params.creditos
        pensum.semestre = params.semestre
        pensum.codigoCurso = params.codigoCurso

        Pensum.find({$or: [{idCursoPensum: pensum.idCursoPensum}
        
        ]}).exec((err,course)=>{

            if(err) return res.status(500).send({message: 'error peticion '})

            pensum.save((err,cursoStored)=>{
                if(err) return res.status(500).send({message: 'error al alacenar'})
                if(cursoStored){
                    return res.status(200).send({pensum: cursoStored})
                }else{
                    return res.status(404).send({message: 'curso no almacenado'})
                }
            })
        })
    }else{
        res.status(500).send({message: 'Debe de completar todos los campos'})
    }

}
function actualizarPensum(req,res){
    var idCurso = req.params.id
    var actualizar = req.body

    Pensum.find({$or: [
        {idCursoPensum: actualizar.idCursoPensum}
    ]}).exec((err,cursos)=>{
        var cursoInsert = false

        cursos.forEach((curso)=>{
            if(curso && curso._id != idCurso) cursoInsert = true
        })

        if(cursoInsert) return res.status(404).send({message: 'Los datos estan ya en uso'})

        Pensum.findByIdAndUpdate(idCurso,actualizar,{new: true},(err, cursoActualizar)=>{
            if(err) return res.status(500).send({message:'error a la peticion'})

            if(!cursoActualizar) return res.status(404).send({message:'no se ha podido realizar los cambios'})

            return res.status(200).send({curso: cursoActualizar})
        })
    })
}

function EliminarPensum(req, res){
    var id = req.params.id
    Pensum.remove({_id:id}).exec().then(result =>{
        res.status(200).json({message: 'Usuario Eliminado'})
    }).catch(err =>{
        res.status(500).json({error:err})
    })
}
module.exports = {
    mostrarPensum,
    mostrarPensums,
    crearPensum,
    actualizarPensum,
    EliminarPensum
}