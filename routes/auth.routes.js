
const { Router } = require('express');
const { login } = require('../controller/auth.controller');
const { 
    createValidationForAuth, 
    checkValidationResult 
} = require('../middlewares/checkExpress');
const router = Router();


//breakpoint
router.post('/login',[createValidationForAuth('login'),checkValidationResult],login);



module.exports = router;