const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

//RUTAS CONTROLADORES

var rutasUsuario = require('./rutas/rutasUsuario')
var rutasCurso = require('./rutas/rutasCurso')
var rutasCUrsoAprobado = require('./rutas/rutaCursoAprobado')
var rutasPensum = require('./rutas/rutasPensum')
var rutasCatedratico = require('./rutas/rutaCatedratico')

//MEDIOS

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(morgan('dev'))

//CABEZERAS

app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, OPTIONS ,POST, PUT, DELETE');

    next();

});

//RUTAS GENERAL

app.use('/api',rutasUsuario)
app.use('/api', rutasCurso)
app.use('/api', rutasCUrsoAprobado)
app.use('/api', rutasPensum)
app.use('/api', rutaCatedratico)

module.exports = app