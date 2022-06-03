
const { Router } = require('express');
const { check ,oneOf } = require('express-validator');
const {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
} = require('../controller/users.controller');
const { createValidationFor, checkValidationResult } = require('../middlewares/checkExpress');

const router = Router();

router.get('/', usersGet)

// para actualizar data
router.put('/:id',[createValidationFor('putUser'),checkValidationResult],usersPut);

// crear nuevos recursos
router.post('/',[createValidationFor('postUser'),checkValidationResult],usersPost);

// para borrar algo
router.delete('/:id',[createValidationFor('deleteUser'),checkValidationResult], usersDelete);

// para hacer actualizaciones parciales
router.patch('/', usersPatch);





module.exports = router;