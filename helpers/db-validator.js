
const Role = require('../models/role');

const Usuario = require('../models/usuario');

const isRoleValido = async (rol = "") => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
        //return Promise.reject('El rol no existe');
    } 
}
// verificar si el correo existe
const emailExiste = async (correo = "") => {

    const emailExist = await Usuario.findOne({ correo });
    if (emailExist) {
        throw new Error(`El correo "${correo}" ya existe`);
        //return Promise.reject('El correo ya existe');
    }
}
// verificar si el correo existe
const existeUsuarioPorId = async (id = "") => {

    const emailUsuario = await Usuario.findById(id);
    if (!emailUsuario) {
        throw new Error(`El Id no existe "${id}"`);
        //return Promise.reject('El correo ya existe');
    }
}

module.exports = {
    isRoleValido,emailExiste,existeUsuarioPorId
}