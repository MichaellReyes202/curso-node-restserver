
// Todo este archivo donde se almacenan los middlewares personalizados

const checkExpress = require('../middlewares/checkExpress');
const validarJWT = require('../middlewares/validar-jwt');
const validarRoles = require('../middlewares/validar-roles');


module.exports = {
    ...checkExpress,
    ...validarJWT,
    ...validarRoles
}