
const { Router } = require('express');
const { login, googleSignIn } = require('../controller/auth.controller');
const { 
    createValidationForAuth, 
    checkValidationResult 
} = require('../middlewares/checkExpress');
const router = Router();


//breakpoint
router.post('/login',[createValidationForAuth('login'),checkValidationResult],login);
router.post('/google',[createValidationForAuth('google'),checkValidationResult],googleSignIn)


module.exports = router;