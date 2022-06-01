
const { Router } = require('express');
const { 
    usersGet, 
    usersPut, 
    usersPost, 
    usersDelete,
    usersPatch 
} = require('../controller/users.controller');

const router = Router();

router.get('/', usersGet)

// para actualizar data
router.put('/:id', usersPut);

// crear nuevos recursos
router.post('/', usersPost);

// para borrar algo
router.delete('/', usersDelete);

// para hacer actualizaciones parciales
router.patch('/', usersPatch);


module.exports = router;