
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

// importacion del modelo
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');

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
const googleSignIn = async (req = request, res = response) => {
    const { id_token } = req.body;
    try{
        const {correo,nombre,img} = await googleVerify(id_token);
        
        // verificar si el correo existe
        let usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            // crear un nuevo usuario
            const data = {
                nombre,
                correo,
                img,
                password: ':',
                img,
                google: true
            }
            usuario = new Usuario(data);
            await usuario.save();
        }

        // si el usuario en la bd no esta activo
        if (!usuario.estado) {
            res.status(401).json({ // unauthorized
                msg: 'Hable con el administrador, Usuario bloqueado'
            })
        }
        // general el JWT
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,token
        })
    }catch(error){
        console.log(error);
        res.status(400).json({
            msg: 'Token de google invalido'
        })
    }
    
}

module.exports = {
    login,googleSignIn
}