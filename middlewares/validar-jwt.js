
const jwt = require('jsonwebtoken');

// importacion del modelo de usuario
const Usuario = require('../models/usuario');

const validarJWT = async (req ,res ,next) => {
    // por lo general los jwt se mandar en los headers

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'Peticion sin el token'
        })
    }
    try {
        //payload = jwt.verify(token, process.env.JWT_SECRET);
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);

        // Se busca el usario por el id 
        const usuario = await Usuario.findById(uid);

        // verificar si el usuario existe
        if(!usuario){
            return res.status(404).json({
                msg: 'Token no valido - El usuario no existe'
            })
        }

        // se agrega al usuario como una nueva propiedad al objeto request
        req.usuario = usuario;

        // validar si el usuario esta activo
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Usuario desactivado'
            })
        }

        next();
        
        //const expira = new Date(payload.exp * 1000);
        //console.log(`Expira en : ${expira}`);
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    validarJWT
}