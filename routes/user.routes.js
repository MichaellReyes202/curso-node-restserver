
const { Router } = require('express');
const {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
} = require('../controller/users.controller');
const {
    createValidationForUser,
    checkValidationResult,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares/index');

const router = Router();

router.get('/', usersGet)

// para actualizar data
router.put('/:id',[createValidationForUser('putUser'),checkValidationResult],usersPut);

// crear nuevos recursos
router.post('/',[createValidationForUser('postUser'),checkValidationResult],usersPost);

// para borrar algo
router.delete('/:id',
    [
        validarJWT,
        //esAdminRole, // fuerza a que el usario sea admin
        tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
        createValidationForUser('deleteUser'),
        checkValidationResult
    ], usersDelete);

// para hacer actualizaciones parciales
router.patch('/', usersPatch);





module.exports = router;