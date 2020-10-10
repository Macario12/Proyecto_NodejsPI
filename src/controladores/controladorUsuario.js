var usuario = require('../modelos/usuario');
var path = require('path');
var fs = require('fs');

function mostrarUsuario(req,res){
    var idUsuario = req.params.id;

    usuario.findById(idUsuario,(err,user)=>{
        if(err) return res.status(500).send();
        return res.status(200).send({user});
    })
}

function mostrarUsuarios(req, res){
    usuario.find((err,users)=>{
        if(err) return res.status(500).send();
        return res.status(200).send({users});
    })
}

function CrearUsuario(req, res){
    var user = new usuario();
    var params = req.body;

    if(params.carnet && params.nombre && params.apellidos && params.contraseña && params.correo){
        user.carnet = params.carnet;
        user.nombre = params.nombre;
        user.apellidos = params.apellidos;
        user.contraseña = params.contraseña;
        user.correo = params.correo;

        usuario.find({$or: [
            {correo: user.correo.toLowerCase()}
        ]}).exec((err,users)=>{
            if(err) return res.status(500).send({message: 'Error en la peticion'});
            
            user.save((err,userStored) =>{
                if(err) return res.status(500).send({message:'Error al guardar usuario'})

                if(userStored){
                    return res.status(200).send({user: userStored})
                }else{
                    res.status(404).send({message: 'Usuario no registrado'})
                }
            })
        })
        
    }else{
        res.status(500).send({message: 'Debe de completar todos los campos'})
    }
}

function actualizarUsuario(req,res){
    var idUsuario = req.params.id
    var actualizar = req.body

    usuario.find({ $or: [
        {id: actualizar.id}
    ]}).exec((err,users)=>{
        var userInsert = false

        users.forEach((user)=>{
            if(user && user._id != idUsuario) user_isset = true;
        })

        if(userInsert) return res.status(404).send({ message: 'Los datos ya estan en uso'})

        usuario.findByIdAndUpdate(idUsuario,actualizar,{new:true}, (err,usuarioActualizar)=>{
            if(err) return res.status(500).send({ message: 'Error en la peticion'})
            if(!usuarioActualizar) return res.status(404).send({message: 'No se puedo actulizar los datos'})

            return res.status(200).send({user: usuarioActualizar})
        })
    })
}

function EliminarUsuario(req, res){
    var id = req.params.id
    usuario.remove({_id:id}).exec().then(result =>{
        res.status(200).json({message: 'Usuario Eliminado'})
    }).catch(err =>{
        res.status(500).json({error:err})
    })
}

function Login(req,res){
    var params = req.body
    var carnet = params.carnet
    var contraseña = params.contraseña

    usuario.findOne({carnet: carnet,contraseña: contraseña}, (err, user)=>{
        if(err) return res.status(500).send({message: 'Error al logearse'});
        if(user){
            return res.status(200).send({user})
        }else{
            return res.status(500).send({message: 'Error al logearse'});
        }
    })

}

module.exports = {
    mostrarUsuario,
    mostrarUsuarios,
    CrearUsuario,
    actualizarUsuario,
    EliminarUsuario,
    Login
}