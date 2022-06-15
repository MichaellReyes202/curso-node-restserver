const Usuario = require('../models/usuario');

const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const usersGet = async (req = request, res = response) => {
    // para leer los parametros opcionales
    //const { q, nombre = 'No name', apikey, page, limit } = req.query;

    const { limit = 5, desde = 0 } = req.query;
    const query = { 'estado': true };

    const [total, usuarios] = await Promise.all([
        // Se ejecutan ambas de manera concurrente
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limit))
    ]);

    res.json({
        msg: 'Get API - controlador',
        total, usuarios
    })

}
const usersPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // hashear el password
    const salt = bcryptjs.genSaltSync(10);  // "10"  respresenta el numero de vueltas para la incriptacion
    usuario.password = bcryptjs.hashSync(password, salt);


    await usuario.save((err) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        } else {
            res.json({
                usuario
            })
        }
    });
}

const usersPut = async (req, res = response) => {
    // para recolectar los parametros de la ruta
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO: validar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }
    // lo encuentra, lo actualiza y lo retorna
    const usuario = await Usuario.findByIdAndUpdate(id, { $set: resto });

    res.json({
        msg: 'Put API - controlador --',
        usuario
    })
}
const usersPatch = (req, res = response) => {
    console.log(req);
    res.json({
        msg: 'Patch API - controlador'
    })
}
const usersDelete = async (req, res = response) => {
    // Borrado de forma fisica   => const usuario = await Usuario.findByIdAndDelete(id);

    // El id del usuario a eliminar
    const { id } = req.params;

    // Borrado de forma logica
    const usuario = await Usuario.findByIdAndUpdate(id,{
        estado: false
    });

    // el usuario que elimino al otro usuario
    const usuarioAutenticado = req.usuario;

    res.json({
        usuario,usuarioAutenticado
    })
}

module.exports = {
    usersGet, usersPost, usersPut, usersPatch, usersDelete
}