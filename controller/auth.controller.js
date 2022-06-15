
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

// importacion del modelo
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;

    try {
        // verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuarios / Password incorrectos - correo'
            })
        }

        // verificar si el usuario esta activo en al bd
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuarios / Password incorrectos - estado : false'
            });
        }

        // verificar el password
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword) {
            return res.status(400).json({
                msg: 'Usuarios / Password incorrectos - password'
            });
        }

        // general el JWT 
        const token  = await generarJWT(usuario.id);

        // responder con el token
        res.json({
            usuario,token
        });
    } catch (error) {
        // TODO: 500 => internal
        return res.status(500).json({
            ok: false,
            err
        })
    }
}

module.exports = {
    login
}