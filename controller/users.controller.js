
const {response,request} = require('express')

const usersGet = (req = request,res = response) => {
    // para leer los parametros opcionales
    const {q,nombre = 'No name',apikey,page,limit} = req.query;
    res.json({
        msg : 'Get API - controlador',
        q,nombre,apikey,page,limit
    })
}
const usersPost = (req,res = response) => {
    const {nombre,edad} = req.body;
    res.json({
        msg : 'Post API - controlador',
        nombre,edad
    })
}
const usersPut = (req , res = response) => {

    // para recolectar los parametros de la ruta
    const {id} = req.params;
    res.json({
        msg : 'Put API - controlador --',
        id
    })
}
const usersPatch = (req , res = response) => {
    res.json({
        msg : 'Patch API - controlador'
    })
}
const usersDelete = (req , res = response) => {
    res.json({
        msg : 'Delete API - controlador'
    })
}

module.exports = {
    usersGet,usersPost,usersPut,usersPatch,usersDelete
}