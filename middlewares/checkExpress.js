
// Este archivo anteriomente se llamaba validar-compos
// la es agregar las validaciones a los campos que vienen en el body de la peticion

const { check, validationResult } = require('express-validator');
const { isRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validator');


createValidationForUser = (route) => {
    switch (route) {
        case 'postUser':
            return [
                check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                check('password', 'La contraseña debe tener minimo 6 caracteres').isLength({ min: 6 }),
                check('correo', 'El correo no es valido').isEmail(),
                check('correo').custom((corre) => emailExiste(corre)),
                check('rol').custom((rol) => isRoleValido(rol))

                //check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE'])
            ];
            break;
        case 'putUser':
            return [
                check('id', 'No es un ID valido').isMongoId(),
                check('id').custom((id) => existeUsuarioPorId(id)),
                check('rol').custom((rol) => isRoleValido(rol))
            ];
            break;
        case 'deleteUser':
            return [
                check('id', 'No es un ID valido').isMongoId(),
                check('id').custom((id) => existeUsuarioPorId(id)),
            ]
            break;
        default:
            return [];
    }
}
createValidationForAuth = (route) => {
    switch (route) {
        case 'login':
            return [
                check('correo', 'El correo no es valido').isEmail(),
                check('password', 'El password es obligatoria').not().isEmpty()
            ];
        default:
            return [];
    }
}

checkValidationResult = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }
    res.status(422).json({ errors: result.array() });
}
module.exports = {
    createValidationForAuth,
    createValidationForUser,
    checkValidationResult
}